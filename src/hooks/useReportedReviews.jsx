import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useReportedReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reported_reviews = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['reported_reviews'],
        queryFn: async() => {
            const res = await axiosSecure.get('/reported-reviews');
            const data = await res?.data;
            if(data){
                return data;
            }
        }
    })

    return [ reported_reviews, isPending, isError, error, refetch ];
};

export default useReportedReviews;