import React from 'react'

function Contact() {
    return (
        <div className="max-w-container mx-auto px-4 flex justify-center mt-20">
            {/* {successMsg ? (
                <p className="pb-20 w-96 font-medium text-green-500">asdasd</p>
            ) : ( */}
                <form className="pb-20">
                    <h1 className="font-semibold text-3xl">
                        Contact Us
                    </h1>
                    <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
                        <div>
                            <p className="text-base font-semibold px-2">
                                Name
                            </p>
                            <input
                                // onChange={handleName}
                                // value={clientName}
                                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none "
                                type="text"
                                placeholder="Enter your name here"
                            />
                            {/* {errClientName && (
                                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                    <span className="text-sm italic font-bold">!</span>
                                    {errClientName}
                                </p>
                            )} */}
                        </div>
                        <div>
                            <p className="text-base font-semibold px-2">
                                Email
                            </p>
                            <input
                                // onChange={handleEmail}
                                // value={email}
                                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none"
                                type="email"
                                placeholder="Enter your name here"
                            />
                            {/* {errEmail && (
                                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                    <span className="text-sm italic font-bold">!</span>
                                    {errEmail}
                                </p>
                            )} */}
                        </div>
                        <div>
                            <p className="text-base font-semibold px-2">
                                Messages
                            </p>
                            <textarea
                                // onChange={handleMessages}
                                // value={messages}
                                cols="30"
                                rows="3"
                                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none resize-none"
                                type="text"
                                placeholder="Enter your name here"
                            ></textarea>
                            {/* {errMessages && (
                                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                    <span className="text-sm italic font-bold">!</span>
                                    {errMessages}
                                </p>
                            )} */}
                        </div>
                        <button
                            // onClick={handlePost}
                            className="w-44 btn btn-primary text-gray-200 h-10 text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            {/* )} */}
        </div>
    );
};

export default Contact