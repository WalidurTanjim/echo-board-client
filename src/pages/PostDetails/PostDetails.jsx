import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from '@heroicons/react/24/outline';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from "react-hook-form";
import moment from 'moment';
import toast from 'react-hot-toast';

const PostDetails = () => {
    const [errMsg, setErrMsg] = useState('');
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    // get post details based on _id
    const { data: post_details = {}, isPending, isError, error, refetch } = useQuery({
        queryKey: ['post_details', axiosPublic, id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts/${id}`);
            const data = await res?.data;
            if (data) {
                return data;
            }
        }
    })

    // handleIncreaseUpVote
    const handleIncreaseUpVote = async (id) => {
        if (!user) {
            return navigate('/sign-in', { state: { from: location } }, { replace: true });
        }
        try {
            const res = await axiosSecure.patch(`/increase-upvote/${id}`);
            const data = res?.data;

            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    }

    // handleIncreaseDownVote
    const handleIncreaseDownVote = async (id) => {
        if (!user) {
            return navigate('/sign-in', { state: { from: location } }, { replace: true });
        }
        try {
            const res = await axiosSecure.patch(`/increase-downvote/${id}`);
            const data = res?.data;

            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    }

    // onSubmit handler
    const onSubmit = async(data) => {
        setErrMsg('');

        const reviewData = {
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            addReviewDate: moment().format("YYYY-MM-DD"),
            review: data?.review,
            postId: id
        }
        
        try{
            const res = await axiosSecure.post('/reviews', reviewData);
            const data = await res.data;
            console.log('Add review response:', data);
            if(data.insertedId){
                reset();
                toast.success('Review added successfully.');
            }
        }catch(err){
            console.error(err);
            toast.error(err?.message);
        }
    }

    return (
        <section className='post-details container mx-auto px-6 py-14'>
            {/* author-info div starts */}
            <div className='author-info flex justify-between mb-5'>
                <div className='flex gap-2'>
                    <img src={post_details?.author?.image} alt="" className='w-[65px] h-[40px] rounded-md' />
                    <div>
                        <h2 className='font-medium text-slate-800'>{post_details?.author?.name}</h2>
                        <p className='text-xs text-gray-500'>{post_details?.author?.email}</p>
                    </div>
                </div>

                <div className='time_tags'>
                    <h3 className='text-xs text-gray-500 font-medium px-3'>{post_details?.post?.postTime.split('T')[0]}</h3>
                    <p className='text-xs inline-block px-3 py-[2px] mt-[2px] border border-teal-100 bg-teal-50 text-teal-500 rounded-full'>{post_details?.post?.tags}</p>
                </div>
            </div>

            {/* post-info div starts */}
            <div className="post-info">
                <h1 className="text-xl font-medium text-slate-700">{post_details?.post?.title}</h1>
                <p className='text-sm text-gray-600 mt-3'>{post_details?.post?.description}</p>

                {/* up_down_vote, comment, share icons div starts */}
                <div className="flex gap-3 items-center mt-3">
                    {/* vote count */}
                    <div className='flex gap-1 items-center'>
                        {/* upVote count */}
                        <div className='flex items-center cursor-default'>
                            <ChevronDoubleUpIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" onClick={() => handleIncreaseUpVote(post_details?._id)} />
                            <span className='text-xs text-gray-500'>{post_details?.post?.upVoteIcon}</span>
                        </div>

                        {/* downVote count */}
                        <div className='flex items-center cursor-default'>
                            <ChevronDoubleDownIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" onClick={() => handleIncreaseDownVote(post_details?._id)} />
                            <span className='text-xs text-gray-500'>{post_details?.post?.downVoteIcon}</span>
                        </div>
                    </div>

                    {/* comment count */}
                    <div className='flex items-center cursor-default'>
                        <ChatBubbleOvalLeftEllipsisIcon className="size-4 text-gray-400" />
                        <span className='text-xs text-gray-500'>{post_details?.post?.upVoteIcon}</span>
                    </div>

                    {/* share count */}
                    <div className='flex items-center cursor-default'>
                        <ShareIcon className="size-4 text-gray-400" />
                        <span className='text-xs text-gray-500'>{post_details?.post?.upVoteIcon}</span>
                    </div>
                </div>
            </div>

            {/* add review div starts */}
            <div className="add-reviews mt-10">
                <h1 className='text-lg font-medium text-slate-800'>Add a review</h1>

                <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                    <textarea name="" rows="3" className='block w-full py-3 text-sm text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' placeholder='Add a review' {...register("review", { required: true })} />

                    <button type='submit' className="w-full px-6 py-2.5 mt-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Add Review</button>
                </form>
            </div>
        </section>
    );
};

export default PostDetails;