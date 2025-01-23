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
                </section>
            </div>

            { open ? <ReviewModal /> : undefined}
        </section>
    );
};

export default PostReviews;