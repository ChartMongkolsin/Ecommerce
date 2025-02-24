import React from 'react'
import { FacebookTitle } from '../icons'

function Homepage() {
    return (
        <>
            <div className="h-[700px] pt-20 pb-28 bg-[#f2f4f7]">
                <div className="p-5 mx-auto max-w-screen-lg min-h-[540px] flex justify-between  ">
                    <div className="flex flex-col gap-4 mt-20 basis-3/5">
                        <div className="text-4xl">
                            <FacebookTitle className="-ms-3" />
                            <h2 className='text-[30px] leading-8 mt-3 w-[514px] '>
                                Fakebook helps you connect and share with the people.
                            </h2>
                            <p className="text-sm text-red-500">
                                *** This is not real Facebook site ***
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-1">
                        <div className="card bg-base-100 w-full h-[350px] shadow-xl mt-8">
                            <form>
                                <div className="card-body gap-3 p-4">
                                    <input
                                        type="text"
                                        className='input input-bordered w-full'
                                        placeholder='E-mail or Phone number'
                                    />
                                    <input
                                        type="password"
                                        className='input input-bordered w-full'
                                        placeholder='password'
                                    />
                                    <button className='btn btn-primary text-xl'>Login</button>
                                    <p className="text-center cursor-pointer opacity-70">
                                        Forgotten password?
                                    </p>
                                    <div className="divider my-0"></div>
                                    <button className='btn btn-secondary text-lg text-white mx-auto'
                                        type='button'
                                    >
                                        Create new account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        

        </>
    )
}


export default Homepage