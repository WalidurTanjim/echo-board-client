import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending } = useQuery({
        queryKey: ['isAdmin'],
        queryFn: async() => {
            if(user){
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                const data = await res?.data;
                if(data){
                    return data?.isAdmin;
                }
            }
        }
    });

    return [ isAdmin, isPending ];
};

export default useAdmin;