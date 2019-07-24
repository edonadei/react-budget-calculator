import React, { useState} from "react";
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
  }
];

function App() {
  // 1: The json with expenses 2: The function
  const [expenses, setExpenses] = useState(initialExpenses);
  console.log(expenses);
  console.log(setExpenses);

  return (
    <React.Fragment>
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending : <span className="total">
          € {expenses.reduce((accumulator,current) => {
            return (accumulator += current.amount);
          },0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
