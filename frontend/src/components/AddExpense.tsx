import flatpickr from "flatpickr";
import "preline/preline";
import { useContext, useEffect, useState } from "react";
import { addExpense } from "../store/actions/expenses";
import { Store } from "../store/Store";
import { useNavigate } from "react-router-dom";
import { loadCategories } from "../store/actions/categories";

export const AddExpense = () => {

    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')

    const { state, dispatch } = useContext(Store)
    const { categories } = state
    const navigate = useNavigate()

    useEffect(() => {
        loadCategories(dispatch);
        // Initialize flatpickr
        flatpickr('#jsPickr', {
            allowInput: true,
            monthSelectorType: 'static'
        })
        // Fetch all the forms we want to apply custom validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission if invalid

        Array.from(forms).forEach(form => {

            form.addEventListener(
                'submit',
                event => {
                    if (!(form as HTMLFormElement).checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                        // Find the first invalid input field and set focus to it
                        const firstInvalidElement = form.querySelector(':invalid')
                        if (firstInvalidElement) {
                            (firstInvalidElement as HTMLElement).focus()
                        }
                    } form.classList.add('validate')
                },
                false
            )
        })
    }, [])



    const formSubmitted = (event: any) => {
        event.preventDefault()

        const newExpense = { categoryId: category, amount, description: description }
        addExpense(dispatch, newExpense)
        navigate('/');

        (document.querySelector('[data-overlay="#basic-modal"]') as HTMLElement)?.click();

    }
    return (
        <>
            {categories.loading && <p>Loading categories...</p>}
            {categories.data.length === 0 && !categories.loading && <p>No categories available</p>}

            <button type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="basic-modal" data-overlay="#basic-modal" > Open modal </button>

            <div id="basic-modal" className="overlay modal overlay-open:opacity-100 hidden" role="dialog" aria-modal="true" aria-labelledby="basic-modal" aria-hidden="true">
                <form className="needs-validation" noValidate onSubmit={formSubmitted}>
                    <div className="modal-dialog overlay-open:opacity-100">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Add Expense</h3>
                                <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#basic-modal" >
                                    <span className="icon-[tabler--x] size-4"></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <select className="select max-w-sm appearance-none" aria-label="select"
                                    onChange={(e) => setCategory(e.target.value)} required>
                                    <option disabled selected>--- select category ---</option>
                                    {categories.data.map((category: any) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}


                                </select>
                                <div className="flex items-center gap-3">
                                    <label className="label text-base">Amount</label>
                                    <input type="number" id="amount" placeholder="Amount" className="input max-w-sm mt-2" min="0" max="100000"
                                        onChange={(e) => setAmount(parseInt(e.target.value))}
                                        required />
                                </div>
                                <span className="text-xs error-message">Please enter a valid amount</span>
                                <div className="flex items-center gap-3">
                                    <label className="label text-base">Description</label>
                                    <input type="text" id="description" placeholder="Description" className="input max-w-sm mt-2"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required />
                                </div>
                                <span className="text-xs error-message">Please enter a valid amount</span>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-soft btn-secondary" data-overlay="#basic-modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* <button type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-400 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                Add Expense
            </button>

            <div id="hs-basic-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-basic-modal-label">
                <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 dark:text-white">
                                Modal title
                            </h3>
                            <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-basic-modal">
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <p className="mt-1 text-gray-800 dark:text-neutral-400">
                                This is a wider card with supporting text below as a natural lead-in to additional content.
                            </p>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-basic-modal">
                                Close
                            </button>
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
