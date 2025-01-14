import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useTags = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tags = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['tags'],
        queryFn: async() => {
            const res = await axiosPublic.get('/tags');
            const data = await res?.data;
            return data;
        }
    })

    return [ tags, isPending, isError, error, refetch ];
};

export default useTags;