import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const usePosts = () => {
    const { search } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data, isPending, isError, error, refetch } = useQuery({
        
        queryKey: ['posts', search], 
        queryFn: async() => {
            const res = await axiosPublic.get(`/all-posts?search=${search}`);
            const data = await res?.data;
            
            // sort posts by newest to oldest
            const sortedPosts = data?.posts.sort((a, b) => {
                const dateA = new Date(a.post.postTime);
                const dateB = new Date(b.post.postTime);
                return dateB - dateA; // Newest to oldest
            });

            return { sortedPosts, data };
        }
    })

    // Extract sortedPosts and result from the fetched data
    const posts = data?.sortedPosts || [];
    const result = data?.data?.result || [];

    return [ posts, result, isPending, isError, error, refetch ];
};

export default usePosts;