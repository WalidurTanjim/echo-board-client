import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import usePosts from '../../hooks/usePosts';
import Post from '../../components/Post/Post';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/Spinner/Spinner';

const AllPosts = () => {
    const { search, setSearch } = useAuth();
    const [posts, isPending, isError, error, refetch] = usePosts();

    // handleSearchChange
    const handleSearchChange = e => {
        setSearch(e.target.value);
    }

    return (
        <section className='all-posts container mx-auto px-6 py-8'>
            <SectionTitle title="All Posts" sub_title="Explore All Posts and Discover New Insights" />

            {/* search posts div starts */}
            <form className='search-posts'>
                <input type="text" className="py-3 px-4 mb-3 shadow-sm block w-full border border-gray-200 outline-none rounded-lg text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search post by tag" onChange={handleSearchChange} />
            </form>

            <div className='mt-10'>
                {
                    isPending ? (
                        <Spinner />
                    ) : isError ? (
                        <div>
                            <h1 className='text-2xl font-medium text-red-600 text-center'>{error?.message}</h1>
                        </div>
                    ) : (
                        <div>
                            {
                                posts?.map(post => <Post key={post?._id} post={post} refetch={refetch} />)
                            }
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default AllPosts;