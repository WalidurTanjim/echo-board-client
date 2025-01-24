import React from 'react';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const { _id, author, post: userPost, reviewCount } = post;

    return (
        <Link to={`/post/${_id}`}>
            <div className='post border rounded-lg p-2 mb-5 group hover:border-blue-200 hover:shadow-sm'>
                {/* post title */}
                <h1 className='text-lg font-semibold text-slate-700 group-hover:text-blue-500'>{userPost?.title}</h1>

                {/* author info & tags div starts */}
                <div className='author_info flex justify-between my-3'>
                    {/* author info */}
                    <div className='flex gap-2'>
                        <img src={author?.image} alt="" className='w-[40px] h-[35px] rounded-md' />
                        <div>
                            <h3 className='text-sm text-slate-800 font-medium'>{author?.name}</h3>
                            <p className='flex gap-x-1 items-center text-xs text-gray-600'>{userPost?.postTime.split("T")[0]}</p>
                        </div>
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
                            <ChevronDoubleUpIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                            <span className='text-xs text-gray-500'>{userPost?.upVoteIcon}</span>
                        </div>

                        {/* downVote count */}
                        <div className='flex items-center cursor-default'>
                            <ChevronDoubleDownIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                            <span className='text-xs text-gray-500'>{userPost?.downVoteIcon}</span>
                        </div>
                    </div>

                    {/* comment count */}
                    <div className='flex items-center cursor-default'>
                        <ChatBubbleOvalLeftEllipsisIcon className="size-4 text-gray-400" />
                        <span className='text-xs text-gray-500'>{reviewCount ? reviewCount : 0}</span>
                    </div>

                    {/* share count */}
                    <div className='flex items-center cursor-default'>
                        <ShareIcon className="size-4 text-gray-400" />
                        <span className='text-xs text-gray-500'>0</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Post;