import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Features = () => {
    return (
        <section className='features container mx-auto px-6 py-14'>
            <SectionTitle title="Our Features" sub_title="Explore the Key Features that Make Our Forum Your Go-To Community Hub" />

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center rounded bg-blue-400 p-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            aria-label="Dashboard icon"
                            role="graphics-symbol"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
                        <h3 className="mb-2 py-2 text-lg leading-6 text-slate-700">Secure Account Access</h3>

                        <p className="text-slate-500 text-sm">Community Moderation Tools help admins manage content, enforce rules, and ensure a safe environment. Features include user management, reporting, and automated moderation.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center rounded bg-blue-400 p-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            aria-label="Dashboard icon"
                            role="graphics-symbol"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
                        <h3 className="mb-2 py-2 text-lg leading-6 text-slate-700">Interactive Post Engagement</h3>

                        <p className="text-slate-500 text-sm">Community Moderation Tools help admins manage content, enforce rules, and ensure a safe environment. Features include user management, reporting, and automated moderation.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center rounded bg-blue-400 p-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            aria-label="Dashboard icon"
                            role="graphics-symbol"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
                        <h3 className="mb-2 py-2 text-lg leading-6 text-slate-700">Community Moderation Tools</h3>

                        <p className="text-slate-500 text-sm">Community Moderation Tools help admins manage content, enforce rules, and ensure a safe environment. Features include user management, reporting, and automated moderation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;