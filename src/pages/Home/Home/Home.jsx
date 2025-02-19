import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import Posts from '../Posts/Posts';
import Announcements from '../Announcements/Announcements';
import useAnnouncement from '../../../hooks/useAnnouncement';
import JoinUs from '../JoinUs/JoinUs';
import Accordian from '../Accordian/Accordian';

const Home = () => {
    const [ announcements, isPending, isError, error, refetch ] = useAnnouncement();

    return (
        <section className='home'>
            <div className='py-10 bg-gradient-to-r from-[#fafcff] to-[#edf2fc]'>
                <Banner />
            </div>
            <Tags />
            { announcements.length > 0 ? <Announcements /> : undefined }
            <Posts />
            <JoinUs />
            <Accordian />
        </section>
    );
};

export default Home;