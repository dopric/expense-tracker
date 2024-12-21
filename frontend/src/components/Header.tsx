import {
    NavLink

} from "react-router-dom"
const Header = () => {

    return (
        <div className='flex justify-between items-center bg-blue-400 h-16 text-white'>
            <h1 className='text-2xl font-bold pl-4'>Daily Expense Tracker</h1>
            <div className='pr-4'>
                <ul className='flex space-x-6'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/transactions">Transactions</NavLink>
                    <NavLink to="/categories">Categories</NavLink>
                    <NavLink to="/expenses">Expenses</NavLink>
                </ul>
            </div>
            <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4'>Log Out
            </button>
        </div>
    )
}

export default Header