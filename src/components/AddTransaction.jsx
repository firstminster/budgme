import { useDispatch } from "react-redux";
import {
  transactionCreate,
  // transactionHistory,
} from "../features/transactionSlice";
import { useForm } from "react-hook-form";

const AddTransaction = () => {
  const dispatch = useDispatch();

  //  retrieve the transaction data from the global store
  // const { transaction } = useSelector((state) => state);

  // react-hook-form
  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handler
  const onSubmit = (data) => {
    dispatch(transactionCreate(data));
    reset();
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter description..."
            {...register("description", {
              required: "Please enter a valid description",
            })}
            className={`input-field ${
              errors.description ? "errorInputField" : null
            }`}
          />
          {errors.description && (
            <p className="errorMsg">{errors.description.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount..."
            {...register("amount", {
              required: "Please enter a valid amount",
            })}
            className={`input-field ${
              errors.amount ? "errorInputField" : null
            }`}
          />
          {errors.amount && <p className="errorMsg">{errors.amount.message}</p>}
        </div>
        <button type="submit" className="btn">
          Add transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
