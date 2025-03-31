import React, { useState } from 'react';
import useProductStore from '../../stores/productStore';
import useUserStore from '../../stores/userstore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const createProducts = useProductStore(state => state.createProducts);
    const user = useUserStore(state => state.user);
    const token = useUserStore(state => state.token);

    const [file, setFile] = useState(null);
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate();

    const hdlChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const hdlCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { name, desc, price, quantity } = input;
            const body = new FormData();
            body.append('name', name);
            body.append('desc', desc);
            body.append('price', price);
            body.append('quantity', quantity);

            if (file) {
                body.append('image', file);
            }

            await createProducts(body, token);
            toast('Created Product Successfully');
            navigate("/allproduct");
        } catch (error) {
            const errMsg = error.response?.data?.error || error.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };
    const hdlClearInput = () => {

        setInput({
            name: user?.name || '',
            desc: user?.desc || '',
            price: user?.price || '',
            quantity: '',
            confirmPassword: '',
        })

    }

    return (
        <div className='container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg'>
            <h2 className='text-center text-4xl font-bold mb-6'>Create Product</h2>
            <form onSubmit={hdlCreateProduct} className='space-y-4'>
                <div>
                    <label className='block text-lg font-medium'>Name</label>
                    <input name='name' className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' value={input.name} onChange={hdlChange} />
                </div>
                <div>
                    <label className='block text-lg font-medium'>Description</label>
                    <textarea name='desc' rows='4' className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' value={input.desc} onChange={hdlChange}></textarea>
                </div>
                <div>
                    <label className='block text-lg font-medium'>Price</label>
                    <input type='number' name='price' className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' step='0.01' min='1' value={input.price} onChange={hdlChange} />
                </div>
                <div>
                    <label className='block text-lg font-medium'>Quantity</label>
                    <input type='number' name='quantity' className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' step='1' min='1' value={input.quantity} onChange={hdlChange} />
                </div>
                <div>
                    <label className='block text-lg font-medium'>Image</label>
                    <input type='file' name='image' className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={hdlFileChange} />
                    {preview && <img src={preview} alt='Preview' className='mt-3 w-40 h-40 object-cover rounded-lg shadow-md' />}
                </div>
                <div className='flex justify-between'>
                    <button type='submit' className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50' disabled={loading}>{loading ? 'Creating...' : 'Submit'}</button>
                    <button type='button' className='px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition' onClick={hdlClearInput}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;
