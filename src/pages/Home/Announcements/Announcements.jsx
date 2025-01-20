import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAnnouncement from '../../../hooks/useAnnouncement';
import Spinner from '../../../components/Spinner/Spinner';
import AnnouncementRow from '../../../components/AnnouncementRow/AnnouncementRow';

const Announcements = () => {
    const [ announcements, isPending, isError, error, refetch ] = useAnnouncement();

    return (
        <section className='announcement container mx-auto px-6 py-14'>
            <SectionTitle title="Announcement" sub_title="Latest Announcements and Updates" />

            {
                isPending ? (
                    <Spinner />
                ) : isError ? (
                    <div className='flex items-center justify-center py-14 border rounded-md'>
                        <h1 className='text-xl font-medium text-red-500'>{error?.message}</h1>
                    </div>
                ) : 
                <div>
                    {
                        announcements.length > 3 ?
                        announcements.slice(0, 3)?.map(announcement => <AnnouncementRow key={announcement?._id} announcement={announcement} />) :
                        announcements?.map(announcement => <AnnouncementRow key={announcement?._id} announcement={announcement} />)
                    }
                </div>
            }

            <div className='mt-7 flex items-center justify-center'>
                <button type="submit" className="py-2 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Show More</button>
            </div>
        </section>
    );
};

export default Announcements;