import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin } = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            const data = await res?.data;
            if(data){
                return data?.isAdmin;
            }
        }
    });

    return [ isAdmin ];
};

export default useAdmin;