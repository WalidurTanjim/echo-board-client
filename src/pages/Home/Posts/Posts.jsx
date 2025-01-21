import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import usePosts from '../../../hooks/usePosts';
import Spinner from '../../../components/Spinner/Spinner';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
import { CalendarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const Posts = () => {
    const [sortBy, setSortBy] = useState('newest');
    const [posts, result, isPending, isError, error, refetch] = usePosts();

    return (
        <section className='posts container mx-auto px-6 py-14'>
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

                <div className="flex justify-center pt-5">
                    <Link to="/all-posts">
                        <button type="submit" className="py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Show More</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Posts;