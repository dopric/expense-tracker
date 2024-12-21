import { AddExpense } from "./AddExpense"


const ExpenseList = () => {


    return (
        <div className='p-4 border border-gray-200 shadow-md rounded-md my-5 '>
            <h1 className='text-2xl font-bold mb-5 '>Expense List</h1>


            <AddExpense />


            <ul className="p-4 border border-gray-200 shadow-md rounded-md my-5">
                <li className='flex justify-between'>
                    <span>Groceries </span>
                    <span>$100</span>
                </li>
                <li className='flex justify-between'>
                    <span>Transportation</span>
                    <span>$200</span>
                </li>
                <li className='flex justify-between'>
                    <span>Utilities</span>
                    <span>$300</span>
                </li>
                <li className='flex justify-between'>
                    <span>Entertainment</span>
                    <span>$400</span>
                </li>
                <li className='flex justify-between'>
                    <span>Health</span>
                    <span>$500</span>
                </li>
            </ul>
        </div>
    )
}

export default ExpenseList