import { useDispatch, useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../features/transactions/transactionSlice";

const Transactions = () => {
  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError)
    content = <p className="error">There is an error occurred!</p>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <SingleTransaction key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions.length === 0)
    content = <p>There is no transactions found! </p>;

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
