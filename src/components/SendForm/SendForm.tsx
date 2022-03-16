import React from "react";
import {
  Layout,
  ChainSelection,
  CoinSelection,
  AddressSelection,
  SendAction,
} from "components";
import { SendFormProvider } from "hooks";
import type { Deposit } from "views/Confirmation";

type Props = {
<<<<<<< HEAD
  onDepositConfirmed: (deposit: Deposit) => void;
};
const SendForm: React.FC<Props> = ({ onDepositConfirmed }) => {
=======
  onDeposit: (deposit: Deposit) => void;
};
const SendForm: React.FC<Props> = ({ onDeposit }) => {
>>>>>>> 2fd3351 (fix(across-v2): refactor confirmation screen)
  return (
    <SendFormProvider>
      <Layout>
        <ChainSelection />
        <CoinSelection />
        <AddressSelection />
<<<<<<< HEAD
        <SendAction onDeposit={onDepositConfirmed} />
=======
        <SendAction onDeposit={onDeposit} />
>>>>>>> 2fd3351 (fix(across-v2): refactor confirmation screen)
      </Layout>
    </SendFormProvider>
  );
};

export default SendForm;
