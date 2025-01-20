import React from 'react';
import useAnnouncement from '../../hooks/useAnnouncement';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Spinner from '../../components/Spinner/Spinner';
import AnnouncementRow from '../../components/AnnouncementRow/AnnouncementRow';

const AllAnnouncements = () => {
    const [announcements, isPending, isError, error, refetch] = useAnnouncement();

    return (
        <section className='all-announcements container mx-auto px-6 py-8'>
            <SectionTitle title="All Announcements" sub_title="Stay Updated with the Latest Announcements" />

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
                            announcements?.map(announcement => <AnnouncementRow key={announcement?._id} announcement={announcement} refetch={refetch} />)
                        }
                    </div>
                )
            }
        </section>
    );
};

export default AllAnnouncements;