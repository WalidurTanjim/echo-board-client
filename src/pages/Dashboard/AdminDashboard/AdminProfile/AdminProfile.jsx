import React, { useState } from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { DocumentTextIcon, ChatBubbleOvalLeftEllipsisIcon, UserGroupIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useMultipleData from '../../../../hooks/useMultipleData';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { ResponsiveContainer, Pie, PieChart } from 'recharts';
import Spinner from '../../../../components/Spinner/Spinner';

const AdminProfile = () => {
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [postsCount, setPostsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { comments, posts, users, isCommentsLoading, isPostsLoading, isUsersLoading, isError, error, refetchComments, refetchPosts, refetchUsers } = useMultipleData();
    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm();

    // Check if data is loading
    const isLoading = isCommentsLoading || isPostsLoading || isUsersLoading;

    // Prepare data for the chart
    const data = [
        { name: 'Posts', value: posts?.count || 0 },
        { name: 'Comments', value: comments?.count || 0 },
        { name: 'Users', value: users?.count || 0 }
    ];

    // Render loading, error, or the chart
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error: {error?.message}</div>;
    }

    // const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm();

    // get signed in user by query email
    const { data: loaded_user = {} } = useQuery({
        queryKey: ['loaded_user', axiosSecure, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            const data = await res?.data;
            if (data) return data;
        }
    })

    // author image upload to cloudinary
    // previewFile
    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    // handleChange
    const handleChange = e => {
        const logoFile = e.target.files[0];
        setFile(logoFile);
        previewFile(logoFile);
    }

    const onSubmit = async (data) => {
        setErrMsg('');

        const newData = data;

        try {
            // upload tag icon to cloudinary & get live link
            const res = await axiosPublic.post('/', {
                company_logo: image
            });

            // console.log('tag icon live link from cloudinary:', res.data);
            if (res?.data) {
                const image_live_link = res?.data?.secure_url;
                data.tag_icon = image_live_link;
            }

            // upload new post to db
            const uploadData = async () => {
                try {
                    const res = await axiosSecure.post('/tags', newData);
                    const data = await res.data;

                    if (data?.insertedId) {
                        Swal.fire({
                            title: "Good job!",
                            text: "New tag added successfully!",
                            icon: "success"
                        });
                        reset();
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            uploadData();
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <section className='admin-profile'>
            <DashboardRoutes />

            <div className='container mx-auto px-6 py-14'>
                <SectionTitle title="Admin Profile" sub_title="Admin Profile: Your Command Center for Efficient Management and Seamless Control" />


                {/* user profile related info */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2 mb-10'>
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
                        <h1 className='text-gray-600 mb-2 capitalize'>{loaded_user?.badge}</h1>
                    </div>
                </div>


                {/* card */}
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
                    {/* total posts */}
                    <div className='post px-5 py-7 rounded-md border border-blue-200 bg-blue-50 flex justify-between'>
                        <DocumentTextIcon className='w-10 h-10 text-blue-500' />

                        <div>
                            <h3 className='text-sm font-medium text-slate-700'>Total Posts:</h3>
                            <h1 className='text-right text-2xl md:text-3xl font-medium text-blue-600'>{posts.count > 0 ? posts.count : 0}</h1>
                        </div>
                    </div>

                    {/* total comments */}
                    <div className='post px-5 py-7 rounded-md border border-blue-200 bg-blue-50 flex justify-between'>
                        <ChatBubbleOvalLeftEllipsisIcon className='w-10 h-10 text-blue-500' />

                        <div>
                            <h3 className='text-sm font-medium text-slate-700'>Total Posts:</h3>
                            <h1 className='text-right text-2xl md:text-3xl font-medium text-blue-600'>{comments.count > 0 ? comments.count : 0}</h1>
                        </div>
                    </div>

                    {/* total users */}
                    <div className='post px-5 py-7 rounded-md border border-blue-200 bg-blue-50 flex justify-between'>
                        <UserGroupIcon className='w-10 h-10 text-blue-500' />

                        <div>
                            <h3 className='text-sm font-medium text-slate-700'>Total Posts:</h3>
                            <h1 className='text-right text-2xl md:text-3xl font-medium text-blue-600'>{users.count > 0 ? users.count : 0}</h1>
                        </div>
                    </div>
                </div>


                {/* pie chart to show the number of posts, comments & users */}
                <ResponsiveContainer  width="100%" height={300}>
                    <PieChart>
                        <Pie data={data}  dataKey="value"  nameKey="name"  cx="50%"  cy="50%"  innerRadius={60}  outerRadius={80}  fill="#82ca9d"  label />
                    </PieChart>
                </ResponsiveContainer>


                {/* add tag */}
                <div>
                    <h2 className='text-xl font-medium text-slate-700 mb-8'>Add New Tag</h2>

                    <form className='mx-auto w-full md:w-[550px]' onSubmit={handleSubmit(onSubmit)}>
                        {/* tag_icon field */}
                        <div className="relative flex items-center mt-8">
                            <label htmlFor="file-input" className="sr-only">Choose file</label>

                            <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {...register("tag_icon", { required: true })} accept='image/png, image/jpg, image/jpeg' onChange={e => handleChange(e)} />
                        </div>

                        {/* tag_name field */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type="text" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Tag Name" {...register("tag_name", { required: true })} />
                        </div>

                        <button className="w-full mt-4 px-6 py-2 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Add New Tag</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AdminProfile;