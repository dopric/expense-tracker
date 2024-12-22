import flatpickr from "flatpickr";
import "preline/preline";
import { useContext, useEffect, useState } from "react";
import { addExpense } from "../store/actions/expenses";
import { Store } from "../store/Store";
import { useNavigate } from "react-router-dom";
import { loadCategories } from "../store/actions/categories";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export const AddExpense = () => {

    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)

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
        setShow(false)
        const newExpense = { categoryId: category, amount, description: description }
        addExpense(dispatch, newExpense)
        navigate('/');


    }
    return (
        <>
            {categories.loading && <p>Loading categories...</p>}
            {categories.data.length === 0 && !categories.loading && <p>No categories available</p>}


            <Button variant="contained" color="primary" onClick={() => { setShow(true) }}>Add Expense</Button>
            <Dialog
                open={show}
                onClose={() => setShow(false)}>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent>
                    <form className="needs-validation" noValidate onSubmit={formSubmitted}>
                        <div className="flex items-center gap-3">
                            <label className="label text-base">Category</label>
                            <select className="select max-w-sm appearance-none" aria-label="select"
                                onChange={(e) => setCategory(e.target.value)} required>
                                <option disabled selected>--- select category ---</option>
                                {categories.data.map((category: any) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
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
                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="contained" color="secondary" onClick={() => setShow(false)}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
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
        </>
    )
}
