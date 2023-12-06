import AddTransaction from "../components/AddTransaction";
import { Balance } from "../components/Balance";
import { Header } from "../components/Header";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { TransactionList } from "../components/TransactionList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { transactionHistory } from "../features/transactionSlice";

// import Header from "../components/Header";
// import IncomeExpenses from "../components/IncomeExpenses";
// import TransactionList from "../components/TransactionList";

const Budget = () => {
  const dispatch = useDispatch();

  //  retrieve the transaction data from the global store
  const {
    authUser: { userInfo },
    transaction: { transactionHistoryData },
    isLoading,
  } = useSelector((state) => state);

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    dispatch(transactionHistory());

    // return () => {
    //   controller.abort();
    // };
  }, [transactionHistory]);

  console.log(transactionHistoryData);

  return (
    <div className="budget">
      <Header username={userInfo?.response.user?.username} />
      <div className="container">
        <Balance
          balance={transactionHistoryData?.balance}
          isLoading={isLoading}
        />
        <IncomeExpenses
          income={transactionHistoryData?.income}
          expense={transactionHistoryData?.expense}
          isLoading={isLoading}
        />
        <AddTransaction />
        <TransactionList
          history={transactionHistoryData.history}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Budget;
