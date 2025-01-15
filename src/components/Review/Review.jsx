import React from 'react';
import useAuth from '../../hooks/useAuth';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const Review = ({ review }) => {
    const { user } = useAuth();

    return (
        <div className='review border p-3 rounded-md mb-5'>
            {/* user info & review settings div starts */}
            <div className='userInfo flex justify-between'>
                {/* user info div starts */}
                <div className='flex items-center'>
                    <img src={review?.userPhoto} alt="" className='w-[30px] h-[30px] rounded-full border me-2' />

                    <div>
                        <h2 className='text-xs font-medium text-slate-700'>{review?.userName}</h2>
                        <h3 className='text-xs text-gray-500'>{review?.addReviewDate}</h3>
                    </div>
                </div>

                {
                    user?.email === review?.userEmail ?
                    <p className='border border-gray-300 w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-transparent'><EllipsisVerticalIcon className="size-4 text-slate-900" /></p> :
                    undefined
                }
            </div>

            {/* review */}
            <div className="mt-3">
                <h1 className='text-sm text-slate-700'>{review?.review}</h1>
            </div>
        </div>
    );
};

export default Review;