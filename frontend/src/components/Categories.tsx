
import { useContext, useState } from 'react'
import { Store } from '../store/Store'
import { useEffect } from 'react'
import { loadCategories, updateCategory } from '../store/actions/categories'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal, Box, Typography, Button, DialogContent, TextField, FormLabel } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';


const Categories = () => {
    const { state, dispatch } = useContext(Store)
    useEffect(() => {
        loadCategories(dispatch)
    }, [])

    const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: '', budget: 0 })
    const [show, setShow] = useState(false)


    const { categories } = state

    const deleteCategory = (category: any) => {
        setShow(true);
        setSelectedCategory(category)
        console.log("set show to " + show.toString())
    }

    const handleClose = () => {
        setShow(false);
    }

    const deleteConfirmed = () => {
        setShow(false)
        alert("deleting " + selectedCategory.name)
    }

    const formSubmitted = (event: any) => {
        event.preventDefault()
        updateCategory(dispatch, selectedCategory)
        setSelectedCategory({ id: 0, name: '', budget: 0 })
        toast.success('Category updated successfully');
    }
    return (
        <div>
            <ToastContainer></ToastContainer>

            <Typography variant="subtitle1" component="div">
                Selected:
            </Typography>
            <br />

            <Dialog

                open={show}
                onClose={handleClose}
            >
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <FormLabel>Are you sure you want to delete {selectedCategory.name}?</FormLabel>
                    <Button onClick={deleteConfirmed}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogContent>
            </Dialog>

            <h1 className='text-3xl py-5'>Categories</h1>
            {categories.loading && <p>Loading...</p>}
            {categories.data.length === 0 && !categories.loading && <p>No categories available</p>}
            {!categories.loading && categories.data.length > 0 &&
                <div className='flex'>
                    <div className='w-2/4 border border-gray-200'>
                        <table className='table-auto  table-striped '>
                            <thead className='table-header-group bg-slate-600 text-white px-5'>
                                <tr>
                                    <th className='w-25 px-5 py-1'>Category ID</th>
                                    <th className='min-w-64'>Description</th>
                                    <th className='w-32'>Amount</th>
                                    <th className=''>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((category: any) => (
                                    <tr key={category.id}>
                                        <td className='py-2'>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.budget}</td>
                                        <td>
                                            <div className='flex justify-center content-center gap-2 '>
                                                <Button variant='contained' className='bg-blue-400 hover:bg-blue-500 rounded py-1 px-3 w-28 font-semibold'
                                                    onClick={() => setSelectedCategory(category)}>Edit</Button>
                                                <Button variant='outlined' color="error" className='bg-red-400 hover:bg-red-500 hover:text-white rounded py-1 px-3 w-28 font-semibold'
                                                    onClick={() => { deleteCategory(category) }}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-3/4 pl-10'>

                        {selectedCategory.id > 0 &&
                            <div className='flex w-fit-content ml-10'>
                                <form className='border border-gray-200 shadow-md rounded-md p-5 needs-validation' noValidate
                                    onSubmit={formSubmitted}>
                                    <h2 className='text-2xl py-4 mb-5'>Edit Category</h2>
                                    <div className='flex items-center gap-4'>
                                        <label className='text-base w-56'>Category Name</label>
                                        <div className='flex flex-col w-full'>
                                            <input id="name" name="name" type='text' className='input'
                                                value={selectedCategory.name}
                                                onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                                required />
                                            <span className="text-xs error-message font-semibold">Please a Category name</span>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3 mt-2'>
                                        <label className='text-base w-56'>Category Budget</label>
                                        <div className='flex flex-col w-full'>
                                            <input id="budget" name="budget" type='number' className='input'
                                                value={selectedCategory.budget} required
                                                onChange={(e) => setSelectedCategory({ ...selectedCategory, budget: parseInt(e.target.value) })}
                                                min="0" max="10000" />
                                            <span className="text-xs error-message font-semibold">Please enter a valid amount</span>
                                        </div>
                                    </div>

                                    <div className='flex justify-end gap-3 pt-5'>
                                        <button type="submit" className='btn btn-primary mx-5'>Save Changes</button>
                                        <button className='btn btn-warning'
                                            type='reset'
                                            onClick={() => { setSelectedCategory({ id: 0, name: '', budget: 0 }) }}>Discard Changes</button>

                                    </div>
                                </form>

                            </div>}
                    </div>
                </div>
            }
        </div>
    )
}

export default Categories