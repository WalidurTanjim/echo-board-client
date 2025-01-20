import React from 'react';
import { CalendarDateRangeIcon, TrashIcon } from '@heroicons/react/24/outline'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ReportedComment = ({ review, refetch }) => {
    const { _id, userName, userEmail, userPhoto, feedback, reported, review: comment, addReviewDate } = review;
    // console.log(review);
    const axiosSecure = useAxiosSecure();

    // deleteReportedReview
    const deleteReportedReview = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/delete-review/${id}`);
                    const data = await res?.data;
        
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your comment has been deleted.",
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

    // handleRemoveReport
    const handleRemoveReport = async id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to publish this comment again?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, publish it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/remove-report/${id}`);
                    const data = await res?.data;
                    // console.log('remove report:', data);
                    
                    if(data.modifiedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Report removed from this comment.",
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
        <div className='review p-2 border rounded-md mb-5 hover:shadow-md'>
            {/* commenter info & added date */}
            <div className='commenter_info flex justify-between'>
                {/* commenter info */}
                <div className="flex items-center gap-x-2">
                    <img className="object-cover w-9 h-9 rounded-full" src={userPhoto} alt="" />

                    <div>
                        <h2 className="font-medium text-gray-800 dark:text-white ">{userName}</h2>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{userEmail}</p>
                    </div>
                </div>

                {/* comment added date */}
                <p className='text-xs text-gray-600 text-right flex'>
                    <CalendarDateRangeIcon className="w-4 h-4 text-gray-600 me-1" />
                    {addReviewDate}
                </p>
            </div>

            <div className='my-3'>
                <hr />
            </div>

            {/* review & feedback */}
            <div>
                <p className='inline-block text-xs px-3 rounded-full bg-red-50 border border-red-200 text-red-600'>{feedback ? feedback : 'None'}</p>
                <p className='text-gray-600 mt-1 text-sm'>{comment}</p>

                {/* buttons */}
                <div className="buttons mt-3 flex gap-2 justify-end">
                    <button type="button" className="px-2 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-red-100 text-red-800 hover:bg-red-200 active:bg-red-100 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-400 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20" onClick={() => deleteReportedReview(_id)}><TrashIcon className='w-5 h-4' /></button>

                    <button type="button" className="py-1 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-green-100 text-green-800 hover:bg-green-200 active:bg-green-100 focus:outline-none focus:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:text-green-400 dark:bg-green-800/30 dark:hover:bg-green-800/20 dark:focus:bg-green-800/20" onClick={() => handleRemoveReport(_id)}>Remove Report</button>
                </div>
            </div>
        </div>
    );
};

export default ReportedComment;