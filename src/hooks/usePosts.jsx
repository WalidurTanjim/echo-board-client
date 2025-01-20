import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const usePosts = () => {
    const { search } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: posts = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['posts', search], 
        queryFn: async() => {
            const res = await axiosPublic.get(`/all-posts?search=${search}`);
            const data = await res?.data;
            return data;
        }
    })

    return [ posts, isPending, isError, error, refetch ];
};

export default usePosts;