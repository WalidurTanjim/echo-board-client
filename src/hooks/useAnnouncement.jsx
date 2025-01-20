import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useAnnouncement = () => {
    const axiosPublic = useAxiosPublic();

    const { data: announcements = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async() => {
            const res = await axiosPublic.get('/announcements');
            const data = await res?.data;
            if(data) return data;
        }
    })

    return [ announcements, isPending, isError, error, refetch ];
};

export default useAnnouncement;