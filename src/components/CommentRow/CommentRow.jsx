import React, { useState } from 'react';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CommentRow = ({ comment, refetch }) => {
    const [feedback, setFeedback] = useState('');
    const [isReported, setIsReported] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { _id, userName, userEmail, userPhoto, review, reported } = comment;
    // console.log(comment);

    // handleChangeFeedback
    const handleChangeFeedback = e => {
        setFeedback(e.target.value);
    }

    // handleReportClick
    const handleReportClick = async (id) => {
        if(feedback){
            setIsReported(true);

            try{
                const res = await axiosSecure.patch(`/report-review/${id}`);
                const data = await res?.data;
                // console.log('Report review response from server:', data);

                if(data?.modifiedCount > 0){
                    toast.success('Thank you for your feedback! The comment has been successfully reported.');
                    if(refetch) refetch();
                }
            }catch(err){
                console.error(err);
            }

        }
    }

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    {/* commenter info div starts */}
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={userPhoto} alt="" />

                        <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">{userName}</h2>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{userEmail}</p>
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                    <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                </div>
            </td>

            {/* comment */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{review.length > 20 ? review.slice(0, 20)+'...' : review}
            {review.length > 20 ? <Link className='text-xs text-blue-500 hover:text-blue-600'>Read more</Link> : undefined}</td>

            {/* feedback */}
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-2">
                    <select className="block w-full py-1 text-xs text-gray-700 bg-white border rounded-md px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" value={feedback} onChange={handleChangeFeedback}>
                            <option value="" disabled>Select Feedback</option>
                            <option value="Helpful">Helpful</option>
                            <option value="Irrelevant">Irrelevant</option>
                            <option value="Inappropriate">Inappropriate</option>
                        </select>
                </div>
            </td>

            {/* report */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <button type="button" className={`py-1 px-4 w-full inline-flex items-center justify-center gap-x-2 text-xs font-medium rounded-md border border-transparent bg-red-100 text-red-800 hover:bg-red-200 active:bg-red-100 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-400 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20`} onClick={() => handleReportClick(_id)} disabled={!feedback || isReported || reported}>{isReported || reported ? 'Reported' : 'Report'}</button>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                        <TrashIcon className='w-5 h-5' />
                    </button>

                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CommentRow;