import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUsers = (search) => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['users', axiosSecure, search],
        queryFn: async() => {
            const res = await axiosSecure.get(`/all-users?search=${search}`);
            const data = await res?.data;
            return data;
        }
    })

    return [ users, isPending, isError, error, refetch];
};

export default useUsers;