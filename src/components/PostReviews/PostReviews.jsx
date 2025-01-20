import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import CommentRow from '../CommentRow/CommentRow';
import DashboardRoutes from '../DashboardRoutes/DashboardRoutes';
import ReviewModal from '../ReviewModal/ReviewModal';

const PostReviews = () => {
    const { id } = useParams();
    const { user, open } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: post_reviews = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['post_reviews', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            const data = await res?.data;
            return data;
        }
    })

    // handleUpVote
    const handleUpVote = async(id) => {
        try {
            const res = await axiosSecure.patch(`/increase-reviewUpVote/${id}`);
            const data = res?.data;

            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    }

    // handleDownVote
    const handleDownVote = async(id) => {
        try {
            const res = await axiosSecure.patch(`/increase-reviewDownVote/${id}`);
            const data = res?.data;

            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className='post_reviews'>
            <DashboardRoutes />
            
            <div className='container mx-auto px-6 py-14'>
                <SectionTitle title="Post Reviews" sub_title="Show Your Thoughts and Help Us Improve!" />

                <section className="container px-4 mx-auto">
                    {/* total comments of this post div starts */}
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Total comments</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{post_reviews.length > 0 ? post_reviews.length : 0} comments</span>
                    </div>

                    {/* all comments container table div starts */}
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        {/* thead starts */}
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Name</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Status</span>
                                                    </button>
                                                </th>

                                                {/* comment */}
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Comment</th>

                                                {/* feedback */}
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Feedback</th>

                                                {/* report */}
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Report</span>
                                                    </button>
                                                </th>

                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        {/* tbody starts */}
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {
                                                isPending ? (
                                                    <Spinner />
                                                ) : isError ? (
                                                    <div className='w-full border rounded-md'>
                                                        <h1 className='text-xl font-medium text-red-600'>{error?.message}</h1>
                                                    </div>
                                                ) : 
                                                post_reviews?.map(comment => <CommentRow key={comment._id} comment={comment} refetch={refetch} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span>
                                previous
                            </span>
                        </a>

                        <div className="items-center hidden lg:flex gap-x-3">
                            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                        </div>

                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                Next
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </section>
            </div>

            { open ? <ReviewModal /> : undefined}
        </section>
    );
};

export default PostReviews;