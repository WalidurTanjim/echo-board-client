import React from 'react';

const AnnouncementRow = ({ announcement }) => {
    const { _id, announcementDescription, authorName, authorImage, postTime, title } = announcement;

    return (
        <div className='announcement p-2 mb-5 rounded-md border hover:border-blue-200 hover:shadow-md group'>
            {/* author info div starts */}
            <div className="flex gap-2">
                <img src={authorImage} alt="" className='w-[40px] h-[37px] rounded-md' />

                <div>
                    <h3 className='text-sm text-slate-800 font-medium'>{authorName}</h3>
                    <p className='text-xs text-gray-500'>{postTime}</p>
                </div>
            </div>

            <div className="my-2">
                <hr />
            </div>

            {/* announcement */}
            <div className="">
                <h1 className='text-lg font-semibold text-slate-700 group-hover:text-blue-500 group-hover:text-hover-500'>{title}</h1>

                <p className='text-sm text-gray-500 mt-1'>{announcementDescription}</p>
            </div>
        </div>
    );
};

export default AnnouncementRow;