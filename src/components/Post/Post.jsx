import React from 'react';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from '@heroicons/react/24/outline';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Post = ({ post, refetch }) => {
    const { _id, author, post: userPost } = post;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    // console.log(post);

    // handleIncreaseUpVote
    const handleIncreaseUpVote = async (id) => {
        if(!user){
            return navigate('/sign-in', {state: { from: location }}, {replace: true});
        }
        try{
            const res = await axiosSecure.patch(`/increase-upvote/${id}`);
            const data = res?.data;

            if(data.modifiedCount > 0){
                refetch();
            }
        }catch(err){
            console.error(err);
        }
    }

    // handleIncreaseDownVote
    const handleIncreaseDownVote = async (id) => {
        if(!user){
            return navigate('/sign-in', {state: { from: location }}, {replace: true});
        }
        try{
            const res = await axiosSecure.patch(`/increase-downvote/${id}`);
            const data = res?.data;

            if(data.modifiedCount > 0){
                refetch();
            }
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className='post border rounded-lg p-2 mb-5'>
            {/* post title */}
            <h1 className='text-lg font-semibold text-slate-700'>{userPost?.title}</h1>

            {/* author info & tags div starts */}
            <div className='author_info flex justify-between my-3'>
                {/* author info */}
                <div className='flex gap-2'>
                    <img src={author?.image} alt="" className='w-[37px] h-[30px] rounded-md' />
                    <h3 className='text-sm text-slate-800 font-medium'>{author?.name}</h3>
                </div>

                <h3 className='text-xs px-3 rounded-full border border-teal-200 bg-teal-50 text-teal-500 h-[23px] flex items-center'>{userPost?.tags}</h3>
            </div>

            {/* description */}
            <p className="text-sm text-gray-600">{userPost?.description}</p>

            {/* icons */}
            <div className="flex gap-3 items-center mt-3">
                {/* vote count */}
                <div className='flex gap-1 items-center'>
                    {/* upVote count */}
                    <div className='flex items-center cursor-default'>
                        <ChevronDoubleUpIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" onClick={() => handleIncreaseUpVote(_id)} />
                        <span className='text-xs text-gray-500'>{userPost?.upVoteIcon}</span>
                    </div>

                    {/* downVote count */}
                    <div className='flex items-center cursor-default'>
                        <ChevronDoubleDownIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" onClick={() => handleIncreaseDownVote(_id)} />
                        <span className='text-xs text-gray-500'>{userPost?.downVoteIcon}</span>
                    </div>
                </div>

                {/* comment count */}
                <div className='flex items-center cursor-default'>
                    <ChatBubbleOvalLeftEllipsisIcon className="size-4 text-gray-400" />
                    <span className='text-xs text-gray-500'>{userPost?.upVoteIcon}</span>
                </div>

                {/* share count */}
                <div className='flex items-center cursor-default'>
                    <ShareIcon className="size-4 text-gray-400" />
                    <span className='text-xs text-gray-500'>{userPost?.upVoteIcon}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;