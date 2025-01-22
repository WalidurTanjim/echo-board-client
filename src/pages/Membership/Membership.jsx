import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../Checkout/Checkout';


const striptPromise = loadStripe(import.meta.env.VITE_strp_pk);

const Membership = () => {
    const totalPayment = 50;

    return (
        <section className="membership container mx-auto px-6 py-14">
            <SectionTitle title="Membership" sub_title="Unlock Exclusive Benefits with Our Membership Plans" />

            {/* money quantity */}
            <div className="mb-10">
                <h1 className='text-xl font-medium text-slate-700'>Total payment: $<span className='text-blue-500 font-medium'>{totalPayment}</span></h1>
            </div>

            <div>
                <Elements stripe={striptPromise}>
                    <Checkout totalPayment={totalPayment} />
                </Elements>
            </div>
        </section>
    );
};

export default Membership;