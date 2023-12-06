/* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { transactionHistory } from "../features/transactionSlice";
import Transaction from "./Transaction";

export const TransactionList = ({ history }) => {
  // const dispatch = useDispatch();
  // //  retrieve the transaction data from the global store
  // const {
  //   transaction: { transactionHistoryData },
  // } = useSelector((state) => state);

  // useEffect(() => {
  //   // const controller = new AbortController();
  //   // const signal = controller.signal;
  //   dispatch(transactionHistory());

  //   // return () => {
  //   //   controller.abort();
  //   // };
  // }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {history?.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
