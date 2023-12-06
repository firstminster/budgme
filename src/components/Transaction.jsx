/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { transactionDelete } from "../features/transactionSlice";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    " ₦" +
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

const Transaction = (props) => {
  const dispatch = useDispatch();

  const {
    transaction: { id, amount, description },
  } = props;

  const sign = amount < 0 ? "-" : "+";

  const handleDeleteTransaction = (id) => {
    dispatch(transactionDelete(id));
  };

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {description}{" "}
      <span>
        {sign}
        {/* {amount} */}
        {moneyFormatter(Number(amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
