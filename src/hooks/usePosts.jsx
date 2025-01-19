import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const usePosts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: posts = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['posts'], 
        queryFn: async() => {
            const res = await axiosPublic.get('/all-posts');
            const data = await res?.data;
            return data;
        }
    })

    return [ posts, isPending, isError, error, refetch ];
};

export default usePosts;