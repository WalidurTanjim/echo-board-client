import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['users', axiosSecure],
        queryFn: async() => {
            const res = await axiosSecure.get('/users');
            const data = await res?.data;
            if(data) return data;
        }
    })
    
    return [ users, isPending, isError, error, refetch];
};

export default useUsers;