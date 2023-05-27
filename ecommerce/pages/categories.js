import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null); 
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, [])
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const data = {name, parentCategory}
        if(editedCategory)
        {
            data._id = editedCategory._id;
            await axios.put('/api/categories', {...data, _id:editedCategory._id});
            setEditedCategory(null);
        }
        else
        {
            await axios.post('/api/categories', data);
        }
       
        setName('');
        fetchCategories();
    }
    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parentCategory?._id);
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Are you sure?',
            text: `Don you want do delete the category "${category.name}"?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, DELETE!',
            confirmButtonColor: '#FF0000',
            reverseButtons: true,
            didOpen: () => {
                // run when swal is opened...
                
            },
            didClose: () => {
                // run when swal is closed...
            }
        }).then(async result => {
            // when confirmed and promise resolved...
            if(result.isConfirmed)
            {
                const {_id} = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        }).catch(error => {
            // when promise rejected...
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit category "${editedCategory.name}"` : `Create new category`}</label>
            <form onSubmit = {saveCategory} >
                <div class="flex gap-2">
                    <input  type="text" placeholder={'Category name'}  onChange = {event => {
                        setName(event.target.value);
                    }} value = {name}/>
                    <select value = {parentCategory} onChange = {event => setParentCategory(event.target.value)}>
                        <option value = "">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option value = {category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button type="button" className="button-default text-sm" onClick = {}>Add new property</button>
                </div>
                
                <button type ="submit" className="button-primary-version py-1">Save</button>
            </form>
            <table className="basic-table-products mt-5">
                <thead>
                    <tr>
                        <td>
                          Category Name  
                        </td>
                        <td>
                            Parent Category
                        </td>
                        <td>
                            Parent Category
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category?.parentCategory?.name}</td>
                            <td>
                                <div className = "flex gap-2 mr-0">
                                    <button onClick = {() => {
                                        editCategory(category)
                                    }}
                                    className="button-primary-version">Edit</button>
                                    <button 
                                    onClick = {() => deleteCategory(category)}
                                    className="button-primary-version">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal = {swal}/>
))