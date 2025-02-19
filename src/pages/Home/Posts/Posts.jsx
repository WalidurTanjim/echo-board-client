import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import usePosts from '../../../hooks/usePosts';
import Spinner from '../../../components/Spinner/Spinner';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
import { CalendarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import useMultipleData from '../../../hooks/useMultipleData';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Posts = () => {
    const { comments, posts: totalPosts, users, isCommentsLoading, isPostsLoading, isUsersLoading, isError: isAnyError, error: anyError, refetchComments, refetchPosts, refetchUsers } = useMultipleData();

    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPostsCount = totalPosts?.count || 0;
    const numberOfPages = Math.ceil(totalPostsCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(totalPosts, currentPage)

    // get all posts
    const [posts, result, isPending, isError, error, refetch] = usePosts(currentPage, itemsPerPage, sortBy);


    return (
        <section className='posts container mx-auto px-6 py-14' id="posts">
            <SectionTitle title="Latest Discussions" sub_title="Explore trending topics and join the conversation!" />

            {/* sort buttons div starts */}
            <div className="sort_buttons flex gap-2 items-center justify-end">
                <button type="button" className={`py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${ sortBy === 'newest' ?
                'bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20' :
                'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-100 focus:bg-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:hover:bg-gray-700/20 dark:focus:bg-gray-700/20' } focus:outline-none disabled:opacity-50 disabled:pointer-events-none`} onClick={() => setSortBy('newest')}><CalendarIcon className='text-blue-800 w-4 h-4' />Sort by Newest</button>

                <button type="button" className={`py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${ sortBy === 'popularity' ? 
                'bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20' :
                'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-100 focus:bg-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:hover:bg-gray-700/20 dark:focus:bg-gray-700/20' } focus:outline-none disabled:opacity-50 disabled:pointer-events-none`} onClick={() => setSortBy('popularity')}><AdjustmentsHorizontalIcon className='text-blue-800 w-4 h-4' />Sort by Popularity</button>
            </div>

            <div className='mt-8'>
                {
                    isPending ? (
                        <Spinner />
                    ) : isError ? (
                        <div>
                            <h1 className='text-2xl font-medium text-red-600 text-center'>{error?.message}</h1>
                        </div>
                    ) : (
                        <div>
                            {
                                sortBy === 'newest' ?
                                posts?.map(post => <Post key={post?._id} post={post} refetch={refetch} />) :
                                sortBy === 'popularity' ?
                                result?.map(post => <Post key={post?._id} post={post} refetch={refetch} />) :
                                <h1 className="text-center text-2xl text-slate-700 py-14">No Data Found</h1>
                            }
                        </div>
                    )
                }

                <div className="flex flex-wrap items-center justify-center pt-5">
                    <button className='flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md' onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}><ArrowLeftIcon className='w-6 h-4 me-1' />Prev</button>
                    {
                        pages?.map((page, idx) => <button key={idx} className={`flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md ${currentPage === page ? 'bg-blue-200 border-blue-300' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>)
                    }
                    <button className='flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md' onClick={() => setCurrentPage(currentPage < pages?.length - 1 ? currentPage + 1 : currentPage)}>Next<ArrowRightIcon className='w-6 h-4 ms-1' /></button>
                </div>
            </div>
        </section>
    );
};

export default Posts;