import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, clearItems }) => {
  return (
    <React.Fragment>
      <ul className="list">
        {expenses.map(expense => {
          return <ExpenseItem key={expense.id} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 &&
        <button onClick={clearItems} className="btn">
          clear expenses
          <MdDelete className="btn-icon" />
        </button>}
    </React.Fragment>
  );
};

export default ExpenseList;
