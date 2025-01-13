import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto bg-gray-900 w-full dark:bg-neutral-950">
            <div className="container mx-auto mt-auto w-full py-10 px-6 lg:pt-20">
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div className="col-span-full lg:col-span-1">
                        <Link
                            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
                            to="/"
                            aria-label="Brand"
                        >
                            EchoBoard
                        </Link>
                    </div>
                    {/* End Col */}

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Product</h4>
                        <div className="mt-3 grid space-y-3">
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/pricing"
                                >
                                    Pricing
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/changelog"
                                >
                                    Changelog
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/docs"
                                >
                                    Docs
                                </Link>
                            </p>
                        </div>
                    </div>
                    {/* End Col */}

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Company</h4>
                        <div className="mt-3 grid space-y-3">
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/about"
                                >
                                    About us
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/blog"
                                >
                                    Blog
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/careers"
                                >
                                    Careers
                                </Link>
                                <span className="inline-block ms-1 text-xs bg-blue-700 text-white py-1 px-2 rounded-lg">
                                    We're hiring
                                </span>
                            </p>
                            <p>
                                <Link
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    to="/customers"
                                >
                                    Customers
                                </Link>
                            </p>
                        </div>
                    </div>
                    {/* End Col */}

                    <div className="col-span-2">
                        <h4 className="font-semibold text-gray-100">Stay up to date</h4>
                        <form>
                            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900">
                                <div className="w-full">
                                    <label htmlFor="hero-input" className="sr-only">
                                        Subscribe
                                    </label>
                                    <input
                                        type="text"
                                        id="hero-input"
                                        name="hero-input"
                                        className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <Link
                                    className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    to="/subscribe"
                                >
                                    Subscribe
                                </Link>
                            </div>
                            <p className="mt-3 text-sm text-gray-400">
                                New UI kits or big discounts. Never spam.
                            </p>
                        </form>
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}

                <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400 dark:text-neutral-400">
                            © 2025 Preline Labs.
                        </p>
                    </div>
                    {/* End Col */}

                    {/* Social Brands */}
                    <div>
                        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="#" target='_blank'>
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="#" target='_blank'>
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="#" target='_blank'>
                            <ion-icon name="logo-twitter"></ion-icon>
                        </a>
                        <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="#" target='_blank'>
                            <ion-icon name="logo-youtube"></ion-icon>
                        </a>
                    </div>
                    {/* End Social Brands */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;