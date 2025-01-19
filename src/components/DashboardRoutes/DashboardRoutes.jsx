import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const DashboardRoutes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [ isAdmin ] = useAdmin();

    // const isAdmin = true;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative border">
            {/* Toggle Button */}
            <div className="text-center">
                <div type="button" className="absolute top-5 right-5 py-2 px-2 border bg-transparent text-white text-sm font-medium rounded-full hover:bg-gray-100 active:bg-transparent focus:outline-none focus:ring-2 focus:ring-transparent" onClick={toggleSidebar}>
                    {
                        isSidebarOpen ?
                        <XMarkIcon className="size-5 text-slate-900" /> : 
                        <Bars3BottomRightIcon className="size-5 text-slate-900" />
                    }
                </div>
            </div>
            {/* End Toggle Button */}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-100 text-gray-600 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-4">
                    {/* website name */}
                    <Link to='/'><h2 className="text-xl font-semibold">EchoBoard</h2></Link>

                    {/* navLinks nav starts */}
                    <nav className="mt-4">
                        <ul className="space-y-2">
                            {
                                isAdmin ?
                                <>
                                    <Link to='/dashboard/admin-profile'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">Admin Profile</li>
                                    </Link>
                                    <Link to='/dashboard/manage-users'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">Manage Users</li>
                                    </Link>
                                    <Link to='/dashboard/reported-comments'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">Reported Comments</li>
                                    </Link>
                                    <Link to='/dashboard/make-announcement'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">Make Announcement</li>
                                    </Link>
                                </>
                                : 
                                <>
                                    <Link to='/dashboard/my-profile'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">My Profile</li>
                                    </Link>

                                    <Link to='/dashboard/add-post'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">Add Post</li>
                                    </Link>

                                    <Link to='/dashboard/my-posts'>
                                        <li className="block text-sm py-2 px-2 mb-1 rounded hover:bg-gray-200">My Posts</li>
                                    </Link>
                                </>
                            }

                            <hr className="mt-7" />

                            <Link to='/'>
                                <li className="block text-sm py-2 px-2 mt-2 mb-1 rounded hover:bg-gray-200">Home</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* End Sidebar */}
        </div>
    );
};

export default DashboardRoutes;