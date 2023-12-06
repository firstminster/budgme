/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "₦ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const IncomeExpenses = ({ income, expense }) => {
  //  retrieve the transaction data from the global store
  // const {
  //   transaction: { transactionHistoryData },
  // } = useSelector((state) => state);

  // console.log(transactionHistoryData);

  // const { income, expense } = transactionHistoryData;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">
          {/* {transactionHistoryData?.income} */}
          {moneyFormatter(Number(income) || 0)}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          {/* {transactionHistoryData?.expense} */}
          {moneyFormatter(Number(expense) || 0)}
        </p>
      </div>
    </div>
  );
};
