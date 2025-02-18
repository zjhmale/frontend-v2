import { ethers } from "ethers";
import { useQueryParams } from "./useQueryParams";
import { FormStatus, useSendForm } from "./useSendForm";
import { useBalance } from "./useBalance";
import { useBridgeFees } from "./useBridgeFees";
import { useAllowance } from "./useAllowance";
import { useConnection } from "state/hooks";
import { useBlock } from "./useBlock";
import {
  getSpokePool,
  TOKENS_LIST,
  FEE_ESTIMATION,
  InsufficientBalanceError,
  FeeTooHighError,
  InsufficientLiquidityError,
  MAX_APPROVAL_AMOUNT,
  WrongNetworkError,
  ChainId,
  CHAINS,
  sendAcrossDeposit,
  sendAcrossApproval,
  getHubPool,
} from "utils";

enum SendStatus {
  IDLE = "idle",
  VALIDATING = "validating",
  READY = "ready",
  ERROR = "error",
}
type SendError =
  | InsufficientBalanceError
  | FeeTooHighError
  | InsufficientLiquidityError
  | WrongNetworkError;

export function useBridge() {
  const { referrer } = useQueryParams();
  const { chainId, account, signer } = useConnection();
  const {
    amount,
    fromChain,
    toChain,
    token,
    toAddress,
    status: formStatus,
  } = useSendForm();

  const { block } = useBlock(fromChain);
  const { balance } = useBalance(token, fromChain, account);
  const spokePool = getSpokePool(fromChain);
  const { allowance } = useAllowance(
    token,
    chainId,
    account,
    spokePool.address,
    block?.number
  );
  const tokenSymbol = TOKENS_LIST[fromChain].find(
    (t) => t.address === token
  )?.symbol;
  const { fees } = useBridgeFees(amount, toChain, tokenSymbol);
  const hasToSwitchChain = chainId !== fromChain;
  let { status, error } = computeStatus({
    token,
    amount,
    formStatus,
    hasToSwitchChain,
    balance,
    fees,
    fromChain,
  });

  const hasToApprove = !!allowance && amount.gt(allowance);
  const hubPool = getHubPool(fromChain);

  const send = async () => {
    // NOTE: the `toAddress` check is redundant, as status won't be "ready" if `toAddress` is not set, but it's here to make TS happy. The same applies for `block` and `fees`.
    if (!signer || status !== "ready" || !toAddress || !block || !fees) {
      return;
    }
    try {
      return sendAcrossDeposit(signer, {
        toAddress,
        amount,
        token,
        fromChain,
        toChain,
        relayerFeePct: fees.relayerFee.pct,
        timestamp: await hubPool.getCurrentTime(),
        referrer,
      });
    } catch (e) {
      console.error(e);
      console.error("Something went wrong when depositing.");
    }
  };

  const approve = async () => {
    // NOTE: Since status will only be "ready" if `hasToSwitchChain` is false, we don't need to check that the `signer` has the same `chainId` as `fromChain`.
    if (!signer || status !== "ready") {
      return;
    }
    return sendAcrossApproval(signer, {
      token,
      amount: MAX_APPROVAL_AMOUNT,
      chainId: fromChain,
    });
  };

  return {
    fromChain,
    toChain,
    toAddress,
    amount,
    token,
    error,
    hasToApprove,
    hasToSwitchChain,
    fees,
    status,
    send,
    approve,
  };
}

type Fees = {
  isLiquidityInsufficient: boolean;
  isAmountTooLow: boolean;
};
type ComputeStatusArgs = {
  token: string;
  amount: ethers.BigNumber;
  formStatus: FormStatus;
  hasToSwitchChain: boolean;
  balance: ethers.BigNumber | undefined;
  fromChain: ChainId;
  fees: Fees | undefined;
};
/**
 * Computes the current send tab status.
 * @param computeStatusArgs {@link ComputeStatusArgs arguments} object to compute the status from.
 * @returns The current send tab status, and an error if any.
 */

function computeStatus({
  formStatus,
  hasToSwitchChain,
  amount,
  balance,
  fees,
  token,
  fromChain,
}: ComputeStatusArgs): { status: SendStatus; error?: SendError } {
  if (formStatus !== FormStatus.VALID) {
    return { status: SendStatus.IDLE };
  }
  if (hasToSwitchChain) {
    return {
      status: SendStatus.ERROR,
      error: new WrongNetworkError(fromChain),
    };
  }
  if (balance) {
    const adjustedBalance =
      token === CHAINS[fromChain].nativeCurrencyAddress
        ? balance.sub(ethers.utils.parseEther(FEE_ESTIMATION))
        : balance;
    if (adjustedBalance.lt(amount)) {
      return {
        status: SendStatus.ERROR,
        error: new InsufficientBalanceError(),
      };
    }
  }
  if (fees) {
    if (fees.isLiquidityInsufficient) {
      return {
        status: SendStatus.ERROR,
        error: new InsufficientLiquidityError(token),
      };
    }
    if (fees.isAmountTooLow) {
      return { status: SendStatus.ERROR, error: new FeeTooHighError() };
    }
  }
  if (!balance || !fees) {
    return { status: SendStatus.VALIDATING };
  }
  return { status: SendStatus.READY };
}
