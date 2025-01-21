import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Checkout = () => {
    const [errMsg, setErrMsg] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // useEffect
    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosSecure.post(`/create-payment-intent`);
                const data = await res?.data?.clientSecret;
                setClientSecret(data);
            }catch(err){
                console.error(err);
            }
        };
        fetchData();
    }, [axiosSecure]);

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrMsg('');

        if(!stripe || !elements) return

        const card = elements.getElement(CardElement);

        if(card == null) return

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if(error){
            setErrMsg(error?.message);
            console.error("[Error]", error);
        }else{
            console.log("[Payment method]", paymentMethod);
        }
        

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            { errMsg ? <p className='mt-3 text-sm text-red-600 ms-1'>** {errMsg}</p> : undefined }
            <button type="submit" disabled={!stripe || !clientSecret} className="py-2 px-6 mt-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">
                Pay
            </button>
        </form>
    );
};

export default Checkout;