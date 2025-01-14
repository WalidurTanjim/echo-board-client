import React from 'react';

const SectionTitle = ({ title, sub_title }) => {
    return (
        <div className='sectionTitle pb-10 w-full text-center'>
            <h1 className='text-2xl md:text-3xl font-medium mb-3'>{title}</h1>
            <p className='text-gray-500 text-sm'>{sub_title && sub_title}</p>
        </div>
    );
};

export default SectionTitle;