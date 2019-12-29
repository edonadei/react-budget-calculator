import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

const initialExpenses = [
  {
    id: uuid(),
    charge: "rent",
    amount: 1600
  },
  {
    id: uuid(),
    charge: "car payment",
    amount: 200
  },
  {
    id: uuid(),
    charge: "credit cart bill",
    amount: 1200
  },
  {
    id: uuid(),
    charge: "something crazy",
    amount: 1600
  }
];

function App() {
  // ******* state values *******
  // 1: The json with expenses 2: The function for adding expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");

  // alert
  const [alert, setAlert] = useState({ show: false });

  // ******* functionnality *******
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    let amount = e.target.value;
    if (amount === "") {
      setAmount(amount);
    } else {
      setAmount(parseInt(amount));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: "success", text: "item added" });
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: "Charge or amount is not well defined"
      });
    }
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const clearItems = e => {
    e.preventDefault();
    setExpenses([]);
    handleAlert({ type: "success", text: "deleted everything" });
  };

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} clearItems={clearItems} />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          €{" "}
          {expenses.reduce((accumulator, current) => {
            return (accumulator += current.amount);
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
