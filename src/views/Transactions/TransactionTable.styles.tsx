import styled from "@emotion/styled";
import {
  TableWrapper,
  HeadRow,
  Body,
  Row,
  Cell,
} from "components/Table/Table.styles";

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const StyledTableWrapper = styled(TableWrapper)`
  background-color: inherit;
`;

export const StyledHeadRow = styled(HeadRow)`
  background-color: #000000;
`;

export const StyledBody = styled(Body)``;

export const StyledRow = styled(Row)`
  background: rgba(255, 255, 255, 0.08);
  /* Don't do zebra */
  &:first-of-type {
    margin-bottom: 2px;
  }
  &:not(:first-of-type) {
    margin: 2px 0;
  }
  &:nth-of-type(2n) {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const StyledCell = styled(Cell)``;