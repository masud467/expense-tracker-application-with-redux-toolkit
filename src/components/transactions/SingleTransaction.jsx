import EditIcon from "../../assets/images/edit.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../features/transactions/TransactionSlice";
import numberWithCommas from "../../utils/thousandsSeparators";
const SingleTransaction = ({ transaction }) => {
  const { name, type, amount, id } = transaction || {};
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link" onClick={handleEdit}>
          <img alt="EditIcon" className="icon" src={EditIcon} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="DeleteIcon" className="icon" src={DeleteIcon} />
        </button>
      </div>
    </li>
  );
};

export default SingleTransaction;
