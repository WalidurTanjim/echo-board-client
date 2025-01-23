import React, { useEffect, useState } from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useUsers from '../../../../hooks/useUsers';
import Spinner from '../../../../components/Spinner/Spinner';
import UserRow from '../../../../components/UserRow/UserRow';
import useMultipleData from '../../../../hooks/useMultipleData';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ManageUsers = () => {
    const [search, setSearch] = useState('');
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const numberOfPages = totalUsersCount > 0 ? Math.ceil(totalUsersCount / itemsPerPage) : 0;
    const pages = [...Array(numberOfPages).keys()];
    // console.log(totalUsersCount, numberOfPages, pages);

    const [ users, isPending, isError, error, refetch ] = useUsers(search, currentPage, itemsPerPage);
    const { comments, posts, users: allUsers, isCommentsLoading, isPostsLoading, isUsersLoading, isError: isErrorAll, error: errorAll, refetchComments, refetchPosts, refetchUsers } = useMultipleData();
    
    useEffect(() => {
        setTotalUsersCount(allUsers?.count);
    }, [allUsers?.count]);


    // handleSearchChange
    const handleSearchChange = e => {
        setSearch(e.target.value);
    }

    return (
        <section className='manage-users'>
            <DashboardRoutes />

            <div className="container mx-auto px-6 py-14">
                <SectionTitle title="Manage Users" sub_title="You can manage all users from here" />

                <section className="container px-4 mx-auto">
                    {/* heading */}
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Manage Users</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{users.length > 0 ? users.length : 0} users</span>
                    </div>

                    {/* find jobs form */}
                    <form className='w-full my-7'>
                        {/* job title field */}
                        <div className="w-full space-y-3">
                            <input type="text" className="py-3 px-4 mb-3 shadow-sm block w-full border border-gray-200 outline-none rounded-lg text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search user by name" onChange={handleSearchChange} />
                        </div>
                    </form>

                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>User</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Role</span>
                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Membership Status</span>
                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                            </tr>
                                        </thead>

                                        {
                                            isPending ? (
                                                <Spinner />
                                            ) : isError ? (
                                                <div className='w-full py-14 flex items-center justify-center'>
                                                    <h1 className="text-center text-xl font-medium text-red-600">{error?.message}</h1>
                                                </div>
                                            ) : 
                                            Array.isArray(users) ? 
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {
                                                    users?.map(user => <UserRow key={user?._id} user={user} refetch={refetch} />)
                                                }
                                            </tbody> : (
                                                <div className='py-14 flex items-center justify-center'>
                                                    <h1 className='text-xl md:text-2xl font-medium text-slate-700'>No User Found</h1>
                                                </div>
                                            )
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* pagination div starts */}
                    <div className="flex flex-wrap items-center justify-center pt-5">
                        <button className='flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md' onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}><ArrowLeftIcon className='w-6 h-4 me-1' />Prev</button>
                        {
                            pages?.map((page, idx) => <button key={idx} className={`flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md ${currentPage === page ? 'bg-blue-200 border-blue-300' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>)
                        }
                        <button className='flex items-center py-1 px-3 mx-1 text-slate-700 hover:bg-gray-100 active:bg-transparent border rounded-md' onClick={() => setCurrentPage(currentPage < pages?.length - 1 ? currentPage + 1 : currentPage)}>Next<ArrowRightIcon className='w-6 h-4 ms-1' /></button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default ManageUsers;