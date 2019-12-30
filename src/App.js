import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

// We are going to use local storage API, here is examples
//localStorage.getItem("item name");
//localStorage.setItem("item name");

// if expenses does not exist, we return an empty array
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

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
  // edit
  const [edit, setEdit] = useState(false);
  // edititem
  const [id, setId] = useState(0);

  // ******* use effect *******
  // first parameter, called each time
  // second parameter, explains when activating use effect
  // if no second parameters, when state or props update, we're calling useEffectf
  // here we are rendering when we're editing [expenses]
  useEffect(
    () => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
    [expenses]
  );

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
      if (edit) {
        let tempExpenses = expenses.map(item => {
          // Spread operator {...item, charge: charge, amount: amount}, we don't
          // have to rewrite everything because we are using ES6
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setAmount("");
      setCharge("");
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

  const handleDelete = id => {
    // return all items that don't match the id
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: `item deleted` });
  };

  const handleEdit = id => {
    // we get the expense corresponding to the id
    let expense = expenses.find(item => item.id === id);
    // destructuring
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
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
          edit={edit}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
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
