import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../Checkout/Checkout';


const striptPromise = loadStripe(import.meta.env.VITE_strp_pk);

const Membership = () => {
    return (
        <section className="membership container mx-auto px-6 py-14">
            <SectionTitle title="Membership" sub_title="Unlock Exclusive Benefits with Our Membership Plans" />

            <div>
                <Elements stripe={striptPromise}>
                    <Checkout />
                </Elements>
            </div>
        </section>
    );
};

export default Membership;