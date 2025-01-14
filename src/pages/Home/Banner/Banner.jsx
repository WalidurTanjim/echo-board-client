import React from 'react';
import banner_men from '../../../assets/banner/banner_men.webp'
import spread from '../../../assets/banner/spread.png'
import suitcase from '../../../assets/banner/suitcase.png'
import upload from '../../../assets/banner/upload.png'
import './Banner.css';

const Banner = () => {
    return (
        <section className='banner container mx-auto px-6 grid grid-cols-5'>
            <div className='contextDiv col-span-5 lg:col-span-3 flex items-center'>
                <div className='w-full'>
                    <h1 className='text-xl md:text-3xl font-medium text-[#000000] pb-3'>Your Community Hub: <span className='text-[#1967D2] font-medium'>Discuss, Discover, and Connect!</span></h1>
                    <p className='text-gray-500 text-sm'>Where ideas meet, questions are answered, and connections are made.</p>

                    {/* find jobs form */}
                    <form className='w-full my-7'>
                        {/* job title field */}
                        <div className="w-full space-y-3">
                            <input type="text" className="py-3 px-4 mb-3 shadow-sm block w-full border border-gray-200 outline-none rounded-lg text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search post by tag" />
                        </div>

                        {/* city or country field */}
                        {/* <div className="w-full space-y-3">
                            <input type="text" className="py-3 px-4 mb-3 shadow-sm block w-full border border-gray-200 outline-none rounded-lg text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="City or country" />
                        </div> */}

                        {/* find jobs button */}
                        <button type="submit" className="py-2 px-4 w-full inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Find Post</button>
                    </form>

                    <p className='text-gray-500 text-xs'>
                        <span className='font-medium text-gray-600'>Popular Searches : </span>
                        Movies, Music, Travel, Career Advice, Sports
                    </p>
                </div>
            </div>

            <div className='imageDiv relative hidden lg:grid lg:col-span-2'>
                {/* banner image */}
                <img src={banner_men} alt="" className='w-full h-[400px]' />

                {/* envelope */}
                <div className='absolute left-0 top-0 flex items-center gap-2 ps-2 pe-4 py-2 rounded-md bg-white animate-left-right'>
                    <div className='p-2 rounded-md bg-blue-100'><img src={spread} alt="" className='w-[22px]' /></div>
                    <p className='font-medium text-xs text-center'>Spread Your Creativity</p>
                </div>

                {/* candidates */}
                <div className='absolute right-6 top-36 ps-2 pe-4 py-2 rounded-md bg-white animate-up-down'>
                    <p className='font-medium text-xs text-center mb-2'>10k+ Active Users</p>

                    <div className="flex w-full items-center justify-center">
                        <div className="flex -space-x-2">
                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white" >
                                <img src="https://i.pravatar.cc/40?img=31" alt="user name" title="user name" width="40" height="40" className="max-w-full rounded-full border-2 border-white" />
                            </a>

                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">JL</a>

                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                                <img src="https://i.pravatar.cc/40?img=33" alt="user name" title="user name" width="40" height="40" className="max-w-full rounded-full border-2 border-white" />
                            </a>

                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-labelledby="title-01 desc-01" role="graphics-symbol">
                                    <title id="title-01">User Icon</title>
                                    <desc id="desc-01">User icon associated with a particular user account</desc>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </a>

                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                                <img src="https://i.pravatar.cc/40?img=34" alt="user name" title="user name" width="40" height="40" className="max-w-full rounded-full border-2 border-white" />
                            </a>

                            <a href="#" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm text-slate-500">+</a>
                        </div>
                    </div>
                </div>

                {/* suitcase */}
                <div className='absolute right-0 top-72 flex items-center gap-2 ps-2 pe-4 py-2 rounded-md bg-white animate-left-right-again'>
                    <div className='p-2 rounded-md bg-red-300'><img src={suitcase} alt="" className='w-[22px]' /></div>
                    <p className='font-medium text-xs'>Creative Agency</p>
                </div>

                {/* upload */}
                <div className='absolute left-0 bottom-9 flex items-center gap-2 ps-2 pe-4 py-2 rounded-md bg-white animate-up-down-again'>
                    <div className='p-2 rounded-md bg-orange-200'><img src={upload} alt="" className='w-[22px]' /></div>
                    <p className='font-medium text-xs'>Upload Your Idea</p>
                </div>
            </div>
        </section>
    );
};

export default Banner;