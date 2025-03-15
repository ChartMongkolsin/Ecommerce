import React from 'react'
import useUserStore from '../stores/userstore'

function MyProfile() {
    const user = useUserStore(state => state.user)

    return (
        <div className="max-w-container mx-auto px-4 flex justify-center items-center mt-20">
            <form className="pb-20 ">
                <h1 className="font-semibold text-3xl uppercase">
                    Your Profile
                </h1>
                <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
                    <div>
                        <p className="text-base font-semibold px-2">
                            Firstname
                        </p>
                        <input
                            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none "
                            type="text"
                            placeholder={user.firstName}
                            disabled
                        />
                    </div>
                    <div>
                        <p className="text-base font-semibold px-2">
                            Lastname
                        </p>
                        <input
                            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none"
                            type="email"
                            placeholder={user.lastName}
                            disabled
                        />

                    </div>
                    <div>
                        <p className="text-base font-semibold px-2">
                            Email
                        </p>
                        <input
                            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none"
                            type="email"
                            placeholder={user.email}
                            disabled
                        />

                    </div>
                    <div>
                        <p className="text-base font-semibold px-2">
                            Role
                        </p>
                        <input
                            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none"
                            type="email"
                            placeholder={user.role}
                            disabled
                        />

                    </div>
                </div>
            </form>
        </div>
    );
};



export default MyProfile