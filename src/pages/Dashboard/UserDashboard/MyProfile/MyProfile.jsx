import React from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../../components/Spinner/Spinner';
import Post from '../../../../components/Post/Post';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // get signed in user by query email
    const { data: loaded_user = {} } = useQuery({
        queryKey: ['loaded_user', axiosSecure, user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            const data = await res?.data;
            if(data) return data;
        }
    })

    // get post based on signed in user email
    const { data: author_post = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['author_post', axiosSecure, user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            const data = await res?.data;
            
            if(data) return data;
        }
    })

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
                        <h1 className='text-gray-600 mb-2'>{loaded_user?.badge}</h1>
                    </div>

                    {/* author post */}
                    <div className="author_post mt-5">
                        <h1 className='text-xl font-medium text-slate-700'>My posts:</h1>

                        <div className='mt-3'>
                            {
                                isPending ? (
                                    <Spinner />
                                ) : isError ? (
                                    <div className='py-12 flex items-center justify-center'>
                                        <h1 className='text-xl font-medium text-red-600'>{error?.message}</h1>
                                    </div>
                                ) : (
                                    author_post?.map(post => <Post key={post?._id} post={post} />)
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;