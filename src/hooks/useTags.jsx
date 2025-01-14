import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useTags = () => {
    const { } = useQuery({
        queryKey: ['tags'],
        queryFn: async() => {
            
        }
    })

    return (
        <div>
            
        </div>
    );
};

export default useTags;