/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "₦ " +
    (p[0].split("")[0] === "-" ? "-" : "") +
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

export const Balance = ({ balance }) => {
  return (
    <>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(Number(balance) || 0)}</h1>
    </>
  );
};
