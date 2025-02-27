import React, { useEffect, useState } from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import useAuth from '../../../../hooks/useAuth';
import { PencilSquareIcon, EnvelopeIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import ButtonSpinner from '../../../../ButtonSpinner/ButtonSpinner';



const AddPost = () => {
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pendingPost, setPendingPost] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm();


    // get user by email
    const { data: user_by_email = {}, isPending: userIsPending, isError: userIsError, error: userError, refetch: userRefetch } = useQuery({
        queryKey: ['user_by_email', axiosSecure, user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            const data = await res?.data;
            return data;
        }
    })

    // get user-post-count
    const { data: user_post_count = {}, isPending, isError, error, refetch} = useQuery({
        queryKey: ['user_post_count', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/user-post-count?email=${user?.email}`);
            const data = await res?.data;
            return data;
        }
        
    })

    // set value on the field
    useEffect(() => {
        if (user && user.email) {
            setValue("author.name", user.displayName); // Set name field
            setValue("author.email", user.email);      // Set email field
        }
    }, [user, setValue]);

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

    const onSubmit = async(data) => {
        setErrMsg('');
        setPendingPost(true);

        if(user && user?.email){
            data.author.name = user?.displayName,
            data.author.email = user?.email
        }

        data.post.postTime = moment().format('YYYY-MM-DD');
        data.post.commentButton = true;
        data.post.upVoteIcon = 0;
        data.post.downVoteIcon = 0;
        data.post.shareButton = true;

        const newData = data;

        try{
            // upload image to cloudinary & get live link
            const res = await axiosPublic.post('/', {
                company_logo: image
            });

            // console.log('Author image live link from cloudinary:', res.data);
            if(res?.data){
                const image_live_link = res?.data?.secure_url;
                data.author.image = image_live_link;
            }

            // upload new post to db
            const uploadData = async() => {
                try{
                    const res = await axiosSecure.post('/posts', newData);
                    const data = await res.data;
                    
                    if(data?.insertedId){
                        setPendingPost(false);
                        Swal.fire({
                            title: "Good job!",
                            text: "Post added successfully!",
                            icon: "success"
                        });
                        refetch();
                        reset();
                        navigate('/dashboard/my-posts')
                    }
                }catch(err){
                    console.error(err);
                }
            };
            uploadData();
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <section className='add-post'>
            <DashboardRoutes />
            
            {
                user_by_email?.badge === 'gold' ?
                <div className="container mx-auto px-6 py-14">
                    <SectionTitle title="Add New Post" sub_title="Create a New Discussion and Connect with the Community" />

                    <div className='w-full md:w-[650px] mx-auto'>
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            {/* author.image field */}
                            <div className="relative flex items-center mt-8">
                                <label htmlFor="file-input" className="sr-only">Choose file</label>

                                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {...register("author.image", { required: true })} accept='image/png, image/jpg, image/jpeg' onChange={e => handleChange(e)} />
                            </div>

                            {/* author.name field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="text" className="block w-full py-2 text-gray-700 bg-blue-50 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-not-allowed" disabled={true} placeholder="Author Name" {...register("author.name", { required: true })} />
                            </div>

                            {/* author.email field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <EnvelopeIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="email" className="block w-full py-2 text-gray-700 bg-blue-50 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-not-allowed" disabled={true} placeholder="Author Email" {...register("author.email", { required: true })} />
                            </div>

                            {/* post.title field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <PencilIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="text" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Post Title" {...register("post.title", { required: true })} />
                            </div>

                            {/* post.tag field */}
                            <div className="relative flex items-center mt-4">
                                <select className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" {...register("post.tags", { required: true })}>
                                    <option value="General Discussion">General Discussion</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Health & Fitness">Health & Fitness</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Career Advice">Career Advice</option>
                                    <option value="Movies">Movies</option>
                                    <option value="DIY & Crafts">DIY & Crafts</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Music">Music</option>
                                    <option value="Bug Reports">Bug Reports</option>
                                    <option value="Parenting">Parenting</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Feature Requests">Feature Requests</option>
                                </select>
                            </div>

                            {/* post.description field */}
                            <div className="relative flex items-center mt-4">
                                <textarea type="text" rows="3" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Write your post description here" {...register("post.description", { required: true })}></textarea>
                            </div>

                            {/* add post button */}
                            <button className="w-full mt-4 px-6 py-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">{ pendingPost ? <ButtonSpinner /> : "Add Post" }</button>
                        </form>
                    </div>
                </div> :
                user_by_email?.badge === 'bronze' && user_post_count?.count < 5 ?
                <div className="container mx-auto px-6 py-14">
                    <SectionTitle title="Add New Post" sub_title="Create a New Discussion and Connect with the Community" />

                    {/* membership alert */}
                    <div className='mb-10 w-full flex items-center justify-center'>
                        <h1 className='w-full md:w-[650px] py-2 border border-red-300 rounded-md bg-red-50 text-sm text-red-500 text-center font-medium'>You can't add more then 5 posts. Until you become a <span className='font-semibold text-red-600'>"GOLD"</span> badge user.</h1>
                    </div>

                    {/* remaining posts */}
                    <div className='mb-5 w-full md:w-[650px] mx-auto flex items-center'>
                        <h1 className='text-lg font-medium text-slate-700'>Remaining posts: <span className='text-blue-500 font-medium'>{user_post_count ? 5 - user_post_count?.count : 0}</span></h1>
                    </div>

                    <div className='w-full md:w-[650px] mx-auto'>
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            {/* author.image field */}
                            <div className="relative flex items-center mt-8">
                                <label htmlFor="file-input" className="sr-only">Choose file</label>

                                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {...register("author.image", { required: true })} accept='image/png, image/jpg, image/jpeg' onChange={e => handleChange(e)} />
                            </div>

                            {/* author.name field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="text" className="block w-full py-2 text-gray-700 bg-blue-50 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-not-allowed" disabled={true} placeholder="Author Name" {...register("author.name", { required: true })} />
                            </div>

                            {/* author.email field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <EnvelopeIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="email" className="block w-full py-2 text-gray-700 bg-blue-50 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-not-allowed" disabled={true} placeholder="Author Email" {...register("author.email", { required: true })} />
                            </div>

                            {/* post.title field */}
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <PencilIcon className="mx-3 size-5 text-gray-400" />
                                </span>

                                <input type="text" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Post Title" {...register("post.title", { required: true })} />
                            </div>

                            {/* post.tag field */}
                            <div className="relative flex items-center mt-4">
                                <select className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" {...register("post.tags", { required: true })}>
                                    <option value="General Discussion">General Discussion</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Health & Fitness">Health & Fitness</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Career Advice">Career Advice</option>
                                    <option value="Movies">Movies</option>
                                    <option value="DIY & Crafts">DIY & Crafts</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Music">Music</option>
                                    <option value="Bug Reports">Bug Reports</option>
                                    <option value="Parenting">Parenting</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Feature Requests">Feature Requests</option>
                                </select>
                            </div>

                            {/* post.description field */}
                            <div className="relative flex items-center mt-4">
                                <textarea type="text" rows="3" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Write your post description here" {...register("post.description", { required: true })}></textarea>
                            </div>

                            {/* add post button */}
                            <button className="w-full mt-4 px-6 py-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">{ pendingPost ? <ButtonSpinner /> : "Add Post" }</button>
                        </form>
                    </div>
                </div> : 
                <div className='container mx-auto px-6 w-full h-screen flex items-center justify-center'>
                    <div className='text-center'>
                        <h1 className="text-xl font-medium text-red-600 mb-3">You've reached the limit of 5 posts. Become a member to create more posts.</h1>
                        <Link to="/membership">
                            <button type="submit" className="py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Become A Member</button>
                        </Link>
                    </div>
                </div>
            }
        </section>
    );
};

export default AddPost;