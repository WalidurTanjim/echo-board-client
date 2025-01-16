import React from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import useAuth from '../../../../hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <section className='my-profile'>
            <DashboardRoutes />
            
            <div className="container mx-auto px-6 py-14">
                {/* user profile related info */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {/* user profile picture */}
                    <div className='mb-5 md:mb-0'>
                        {/* user profile picture div starts */}
                        <div className='flex justify-center mb-3'>
                            {
                                user?.photoURL ? 
                                <img src={user?.photoURL} alt="" className='w-[150px] h-[150px] rounded-full border-2' /> :
                                <div className='w-[150px] h-[150px] rounded-full border-2 bg-purple-400 flex items-center justify-center'>
                                    <h1 className='uppercase text-2xl font-medium'>{user?.displayName.charAt(0)}</h1>
                                </div>
                            }
                        </div>

                        {/* upload image form */}
                        <form className="w-full max-w-sm mx-auto">
                            <label htmlFor="file-input" className="sr-only">Choose file</label>
                            <input type="file" name="file-input" id="file-input" className="block w-full mb-2 border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" />

                            <button className="w-full px-6 py-2 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Upload Image</button>
                        </form>
                    </div>

                    {/* user profile data */}
                    <div>
                        <h1 className='border p-2 rounded-md cursor-not-allowed text-xs text-gray-500 bg-purple-50 mb-2 inline-block' disabled={true}>{user?.uid}</h1>

                        <p className='text-slate-800 text-sm font-medium'>Username:</p>
                        <h1 className='text-gray-600 mb-2'>{user?.displayName}</h1>

                        <p className='text-slate-800 text-sm font-medium'>Email Address:</p>
                        <h1 className='text-gray-600 mb-2'>{user?.email}</h1>

                        <p className='text-slate-800 text-sm font-medium'>Badges:</p>
                        <h1 className='text-gray-600 mb-2'>Bronze or Gold</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;