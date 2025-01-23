import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Spinner from '../../../../components/Spinner/Spinner';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const MyPosts = () => {
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const numberOfPages = Math.ceil(totalPostsCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];


    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: my_posts = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['my_posts', axiosSecure, user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}&page=${currentPage}&limit=${itemsPerPage}`);
            const data = await res?.data;
            return data;
        }
    })

    // get user-post-count
    const { data: user_post_count = {}, isPending: isPendingUserPostCount, isError: isErrorUserPostCount, error: errorUserPostCount, refetch: refetchUserPostCount } = useQuery({
        queryKey: ['user_post_count', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user-post-count?email=${user?.email}`);
            const data = await res?.data;
            setTotalPostsCount(data?.count);
            return data;
        }

    })

    // handleDelete
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/posts/${id}`);
                    const data = res?.data;

                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    return (
        <section className='my-posts'>
            <DashboardRoutes />

            <div className="container mx-auto px-6 py-14">
                <SectionTitle title="My All Posts" sub_title="Browse through our collection of insightful posts" />

                <section className="container px-4 mx-auto">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">My posts</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{my_posts.length > 0 ? my_posts.length : 0} posts</span>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Post Title</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Votes</span>
                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                            </tr>
                                        </thead>

                                        {
                                            isPending ? (
                                                <Spinner />
                                            ) : isError ? (
                                                <div className='w-full py-14 flex items-center justify-center'>
                                                    <h1>{error?.message}</h1>
                                                </div>
                                            ) :
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                    {
                                                        my_posts?.map(my_post => {
                                                            const { _id, author, post, reviewCount } = my_post;

                                                            return (
                                                                <tr key={my_post?._id}>
                                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                        <div className="inline-flex items-center gap-x-3">
                                                                            <div className="flex items-center gap-x-2">
                                                                                <img className="object-cover w-10 h-10 rounded-full" src={author?.image} alt="" />
                                                                                <div>
                                                                                    <h2 className="font-medium text-gray-800 dark:text-white ">{author?.name}</h2>
                                                                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{author?.email}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                                            <div className='flex gap-1 items-center'>
                                                                                {/* upVote count */}
                                                                                <div className='flex items-center cursor-default'>
                                                                                    <ChevronDoubleUpIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                                                                                    <span className='text-xs text-gray-500'>{post?.upVoteIcon}</span>
                                                                                </div>

                                                                                {/* downVote count */}
                                                                                <div className='flex items-center cursor-default'>
                                                                                    <ChevronDoubleDownIcon className="size-4 text-gray-400 hover:text-gray-600 active:text-gray-400" />
                                                                                    <span className='text-xs text-gray-500'>{post?.downVoteIcon}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* action buttons (comment, delete) */}
                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                        <div className="flex items-center gap-x-6">
                                                                            {/* comment button */}
                                                                            <Link to={`/dashboard/comments/${_id}`} className='flex items-center gap-1 text-gray-1'>
                                                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                                    <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' />
                                                                                </button>
                                                                                <span className='text-gray-500'>{reviewCount ? reviewCount : 0}</span>
                                                                            </Link>

                                                                            {/* delete button */}
                                                                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => handleDelete(_id)}>
                                                                                <TrashIcon className='w-5 h-5' />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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

export default MyPosts;