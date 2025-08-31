import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../features/transactions/TransactionSlice";
import { toast } from "react-toastify";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction);

  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      toast.warn("Amount must be greater than 0!");
      return;
    }
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction({
        id: editing?.id,
        data: {
          name: name,
          amount: amount,
          type: type,
        },
      })
    );
    setEditMode(false);
    resetForm();
  };

  const cancelEditMode = () => {
    resetForm();
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleAdd}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter title"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              required
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="enter amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode
            ? "Update Transaction"
            : isLoading
            ? "Adding..."
            : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className="error">There occurred an error!</p>
        )}
      </form>
      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
