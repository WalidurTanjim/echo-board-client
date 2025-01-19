import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon } from '@heroicons/react/24/outline';

const PostReviews = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: post_reviews = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['post_reviews', axiosSecure],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            const data = await res?.data;
            console.log(data);
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
        <section className='post_reviews container mx-auto px-6 py-14'>
            <SectionTitle title="Post Reviews" sub_title="Show Your Thoughts and Help Us Improve!" />

            <div className='reviews'>
                {
                    isPending ? (
                        <Spinner />
                    ) : isError ? (
                        <div className='w-full border rounded-md'>
                            <h1 className='text-xl font-medium text-red-600'>{error?.message}</h1>
                        </div>
                    ) :
                        post_reviews?.map(review => {
                            return (
                                <div key={review?._id} className='p-2 rounded-md border hover:shadow-md mb-5'>
                                    {/* user info & tags div starts */}
                                    <div className='user_info flex justify-between'>
                                        {/* user info */}
                                        <div className='flex gap-2'>
                                            <img src={review?.image} alt="" className='w-[40px] h-[35px] rounded-md' />
                                            <div>
                                                <h3 className='text-sm text-slate-800 font-medium'>{review?.userName}</h3>
                                                <p className='text-xs text-gray-500'>{review?.userEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='text-slate-700 text-sm my-3'>{review?.review}</p>

                                    <div className='flex gap-1 items-center'>
                                        {/* upVote count */}
                                        <div className='flex items-center cursor-default' onClick={() => handleUpVote(review?._id)}>
                                            <ChevronDoubleUpIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                                            <span className='text-xs text-gray-500'>{review?.reviewUpVote ? review?.reviewUpVote : 0}</span>
                                        </div>

                                        {/* downVote count */}
                                        <div className='flex items-center cursor-default' onClick={() => handleDownVote(review?._id)}>
                                            <ChevronDoubleDownIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                                            <span className='text-xs text-gray-500'>{review?.reviewDownVote ? review?.reviewDownVote : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </section>
    );
};

export default PostReviews;