import { useQueries } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMultipleData = () => {
    const axiosSecure = useAxiosSecure();

    const results = useQueries({
        queries: [
            {
                queryKey: ['comments', axiosSecure],
                queryFn: async () => {
                    const res = await axiosSecure.get('/comments-count');
                    return res?.data;
                }
            },
            {
                queryKey: ['posts', axiosSecure],
                queryFn: async () => {
                    const res = await axiosSecure.get('/posts-count');
                    return res?.data;
                }
            },
            {
                queryKey: ['users', axiosSecure],
                queryFn: async () => {
                    const res = await axiosSecure.get('/users-count');
                    return res?.data;
                }
            }
        ]
    });

    // Destructure the results array to access each query's data and status
    const [commentsResult, postsResult, usersResult] = results;

    return {
        comments: commentsResult.data || [],
        posts: postsResult.data || [],
        users: usersResult.data || [],
        isCommentsLoading: commentsResult.isLoading,
        isPostsLoading: postsResult.isLoading,
        isUsersLoading: usersResult.isLoading,
        isError: commentsResult.isError || postsResult.isError || usersResult.isError,
        error: commentsResult.error || postsResult.error || usersResult.error,
        refetchComments: commentsResult.refetch,
        refetchPosts: postsResult.refetch,
        refetchUsers: usersResult.refetch
    };
};

export default useMultipleData;
