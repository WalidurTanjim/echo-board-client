import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import Posts from '../Posts/Posts';
import Announcements from '../Announcements/Announcements';

const Home = () => {
    return (
        <section className='home'>
            <div className='py-10 bg-gradient-to-r from-[#fafcff] to-[#edf2fc]'>
                <Banner />
            </div>
            <Tags />
            <Posts />
            <Announcements />
        </section>
    );
};

export default Home;