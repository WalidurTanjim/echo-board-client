import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import usePosts from '../../../hooks/usePosts';
import Spinner from '../../../components/Spinner/Spinner';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const Posts = () => {
    const [posts, isPending, isError, error, refetch] = usePosts();

    return (
        <section className='posts container mx-auto px-6 py-14'>
            <SectionTitle title="Latest Discussions" sub_title="Explore trending topics and join the conversation!" />

            <div className="flex items-center justify-end">
                <button type="button" className="py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20"><AdjustmentsHorizontalIcon className='text-blue-800 w-4 h-4' /> Sort By Popularity</button>
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
                                posts?.slice(0, 5)?.map(post => <Post key={post?._id} post={post} refetch={refetch} />)
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