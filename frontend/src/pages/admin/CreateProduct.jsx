import React from 'react'

function CreateProduct() {
    return (
        <div className=' container my-4'>
            <div className='row'>
                <div className='col-md-8 mx-auto rounded border p-4'>
                    <h2 className='text-center mb-5'>Create Product</h2>

                    <form>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className='col-sm-8'>
                                <input name="name" className='form-control bg-red-300' />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className='col-sm-8'>
                                <textarea type="text" name="description" rows="4" className='bg-red-300 form-control' />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Price</label>
                            <div className='col-sm-8'>
                                <input type="number" name="price" className='bg-red-300 form-control' step="0.01" min="1" />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Image</label>
                            <div className='col-sm-8'>
                                <input type="file" name="image" className='bg-red-300 form-control' />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <a className='btn btn-primary mt-4' href='' role="button" >Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct