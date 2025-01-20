import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useTags from '../../../hooks/useTags';
import Spinner from '../../../components/Spinner/Spinner';
import useAuth from '../../../hooks/useAuth';

const Tags = () => {
    const { search, setSearch } = useAuth();
    const [tags, isPending, isError, error] = useTags();

    // handleSearchByTag
    const handleSearchByTag = tagName => {
        setSearch(tagName)
    }

    return (
        <section className='tags container mx-auto px-6 py-14'>
            <SectionTitle title="Popular Tags" sub_title="Explore Topics of Interest and Join the Conversation" />

            <div className="">
                {
                    isPending ? (
                        <Spinner />
                    ) : isError ? (
                        <div>
                            <h1 className='text-2xl font-medium text-red-600 text-center'>{error?.message}</h1>
                        </div>
                    ) : (
                        <div className='grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                            {
                                tags?.map(tag => {
                                    const { _id, tag_name, tag_icon } = tag;
                                    return (
                                        <div onClick={() => handleSearchByTag(tag_name)} key={_id} className='p-2 border rounded-md flex gap-2 cursor-pointer group hover:border-blue-300 hover:shadow-lg hover:text-blue-600'>
                                            <img src={tag_icon} alt="" className='w-[21px] h-[21px]' />
                                            <h1 className='text-sm'>{tag_name}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default Tags;