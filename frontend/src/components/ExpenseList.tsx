
import { useContext, useEffect } from "react";
import { loadExpenses } from "../store/actions/expenses";
import { Store } from "../store/Store";
import { AddExpense } from "./AddExpense"


const ExpenseList = () => {
    const { state, dispatch } = useContext(Store);
    const { expenses } = state;

    useEffect(() => {
        loadExpenses(dispatch);
    }, []);

    return (
        <div className='p-4 border border-gray-200 shadow-md rounded-md my-5 '>
            <h1 className='text-2xl font-bold mb-5 '>Expense List</h1>


            <AddExpense />

            {expenses.loading && <p>Loading...</p>}
            {expenses.data.length === 0 && !expenses.loading && <p>No expenses available</p>}
            {expenses.data.length > 0 && (
                <ul className='p-4 border border-gray-200 shadow-md rounded-md my-5'>
                    {expenses.data.map((expense: any) => (
                        <li key={expense.id} className='flex justify-between'>
                            <span>{expense.description}</span>
                            <span>${expense.amount}</span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default ExpenseList