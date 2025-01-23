import React from 'react';

const ButtonSpinner = () => {
    return (
        <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500 text-center" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default ButtonSpinner;