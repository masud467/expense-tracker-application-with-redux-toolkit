const SingleTransaction = () => {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
        <button className="link">
          <img className="icon" src="./images/edit.svg" />
        </button>
        <button className="link">
          <img className="icon" src="./images/delete.svg" />
        </button>
      </div>
    </li>
  );
};

export default SingleTransaction;
