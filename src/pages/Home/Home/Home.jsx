import React from 'react';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <section className='home'>
            <div className='py-10 bg-gradient-to-r from-[#fafcff] to-[#edf2fc]'>
                <Banner />
            </div>
        </section>
    );
};

export default Home;