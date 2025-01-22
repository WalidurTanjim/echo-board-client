import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/logo.png'
import useAdmin from '../../../hooks/useAdmin';
import { BellIcon } from '@heroicons/react/24/outline';
import useAnnouncement from '../../../hooks/useAnnouncement';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [toggleLinks, setToggleLinks] = useState(false);
    const [isAdmin] = useAdmin();
    const [ announcements, isPending, isError, error, refetch ] = useAnnouncement();

    const { user, logOut } = useAuth();

    // handleToggle
    const handleToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    // logOutHandler
    const logOutHandler = () => {
        logOut()
        .then(() => {
            console.log('Logout user successfully');
            setToggleLinks(false);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800 container mx-auto px-6 sticky top-0 z-50">
            <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
                <Link className="sm:order-1 flex items-center text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80" to="/">
                <img src={logo} alt="" className='w-[22px] h-[22px] me-1' />
                EchoBoard</Link>

                <div className="sm:order-3 flex items-center gap-x-2">
                    <Link to='/announcement'>
                        <div className='relative p-1 rounded-full border hover:bg-gray-50 active:bg-transparent'>
                            <BellIcon className='w-5 h-5 text-gray-600' />
                            <span className='absolute -top-2 -right-2 text-xs font-medium px-2 rounded-full bg-orange-300'>{announcements.length > 0 ? announcements.length : 0}</span>
                        </div>
                    </Link>

                    <button
                        type="button"
                        className="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-expanded={isNavOpen}
                        aria-controls="hs-navbar-alignment"
                        onClick={handleToggle}
                    >
                        <svg
                            className={`${isNavOpen ? "hidden" : "block"} shrink-0 size-4`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" x2="21" y1="6" y2="6" />
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>
                        <svg
                            className={`${isNavOpen ? "block" : "hidden"} shrink-0 size-4`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        <span className="sr-only">Toggle</span>
                    </button>

                    {
                        user?.photoURL ? 
                        <div className='relative'>
                            <img src={user?.photoURL} alt="" className='w-[30px] h-[30px] rounded-full border-2' onClick={() => setToggleLinks(!toggleLinks)} />
                            {
                                toggleLinks ? 
                                <div className="absolute top-10 right-0 p-2 rounded-lg w-52 border bg-white z-50">
                                    <p className="text-xs text-gray-600 p-2 border rounded-md bg-blue-100 cursor-not-allowed mb-1">{user?.displayName}</p>
                                    {
                                        isAdmin ?
                                        <Link to='/dashboard/admin-profile'>
                                            <p className="text-xs text-gray-600 p-2 rounded-md hover:bg-gray-100 mb-1">Dashboard</p>
                                        </Link> :
                                        <Link to='/dashboard/my-profile'>
                                            <p className="text-xs text-gray-600 p-2 rounded-md hover:bg-gray-100 mb-1">Dashboard</p>
                                        </Link>
                                    }
                                    <p className="text-xs text-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-100 mb-1" onClick={logOutHandler}>Sign Out</p>
                                </div> : ''
                            }
                        </div> :
                        user?.displayName ? 
                        <div className='relative'>
                            <p className='uppercase font-medium w-[30px] h-[30px] rounded-full bg-purple-300 hover:bg-purple-400 active:bg-purple-300 border cursor-pointer flex items-center justify-center' onClick={() => setToggleLinks(!toggleLinks)}>{user?.displayName?.charAt(0)}</p>

                            {
                                toggleLinks ? 
                                <div className="absolute top-10 right-0 p-2 rounded-lg w-52 border bg-white z-50">
                                    <p className="text-xs text-gray-600 p-2 border rounded-md bg-blue-100 cursor-not-allowed mb-1">{user?.displayName}</p>
                                    {
                                        isAdmin ?
                                        <Link to='/dashboard/admin-profile'>
                                            <p className="text-xs text-gray-600 p-2 rounded-md hover:bg-gray-100 mb-1">Dashboard</p>
                                        </Link> :
                                        <Link to='/dashboard/my-profile'>
                                            <p className="text-xs text-gray-600 p-2 rounded-md hover:bg-gray-100 mb-1">Dashboard</p>
                                        </Link>
                                    }
                                    <p className="text-xs text-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-100 mb-1" onClick={logOutHandler}>Sign Out</p>
                                </div> : ''
                            }
                        </div> :
                        <Link to='/sign-in'>
                            <button type="button" className="py-1.5 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Join US</button>
                        </Link>
                    }
                </div>

                <div
                    id="hs-navbar-alignment"
                    className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2 ${isNavOpen ? "block" : "hidden"
                        }`}
                >
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? "font-medium text-blue-500 focus:outline-none"
                                : "font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        } to="/">Home</NavLink>
                        {
                            user ?
                            <NavLink className={({ isActive }) =>
                            isActive
                                ? "font-medium text-blue-500 focus:outline-none"
                                : "font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                            } to="/membership">Membership</NavLink> : undefined
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;