import React from 'react';

const Spinner = () => {
    return (
        <div className='py-14 flex items-center justify-center'>
            <h1 className="text-2xl text-slate-600">Loading </h1>
            <div className="ms-1 animate-spin inline-block size-5 border-[2px] border-current border-t-transparent text-slate-600 rounded-full dark:text-gray-500" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;