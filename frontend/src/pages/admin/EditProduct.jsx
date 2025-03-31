import React, { useState, useEffect } from 'react';
import useProductStore from '../../stores/productStore';
import useUserStore from '../../stores/userstore';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function EditProduct() {
    const updateProducts = useProductStore(state => state.updateProducts);
    const product = useProductStore(state => state.product);
    const productId = product?.id;
    const token = useUserStore(state => state.token);
    
    const [file, setFile] = useState(null);
    const [input, setInput] = useState({ name: '', desc: '', price: '', numReview: '', countInStock: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setInput({
                name: product.name || '',
                desc: product.desc || '',
                price: product.price || '',
                numReview: product.numReview || '',
                countInStock: product.countInStock || ''
            });
        }
    }, [product]);

    const hdlChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlCancel = () => {
        setInput({ name: '', desc: '', price: '', numReview: '', countInStock: '' });
        setFile(null);
    };

    const hdlUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const body = new FormData();
            Object.keys(input).forEach(key => body.append(key, input[key]));
            if (file) body.append('image', file);

            await updateProducts(productId, token, body);
            toast.success('Updated Product Successfully');
            navigate('/allproduct');
        } catch (error) {
            const errMsg = error.response?.data?.error || error.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-md-8 mx-auto rounded border p-4 bg-white shadow-lg'>
                    <h2 className='text-center mb-5 text-4xl font-bold'>Update Product</h2>
                    <form onSubmit={hdlUpdateProduct} className='space-y-4'>
                        {['name', 'desc', 'price', 'numReview', 'countInStock'].map((field, idx) => (
                            <div key={idx} className='mb-3'>
                                <label className='block text-lg font-semibold capitalize'>{field}</label>
                                <input 
                                    type={field === 'desc' ? 'text' : 'number'}
                                    name={field}
                                    value={input[field]}
                                    onChange={hdlChange}
                                    className='w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200'
                                    step='0.01' min='1'
                                />
                            </div>
                        ))}
                        <div className='mb-3'>
                            <label className='block text-lg font-semibold'>Image</label>
                            <input type='file' onChange={e => setFile(e.target.files[0])} className='w-full px-4 py-2 border rounded-lg' />
                        </div>
                        <div className='flex justify-between'>
                            <button type='submit' className='px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700' disabled={loading}>
                                {loading ? 'Updating...' : 'Submit'}
                            </button>
                            <button type='button' onClick={hdlCancel} className='px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;