import Lottie from 'lottie-react';
import React, { useState } from 'react';
import sign_in_lottie from '../../assets/lottie/sign_in.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import { useForm } from "react-hook-form";
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import useAuth from '../../hooks/useAuth';
import ButtonSpinner from '../../ButtonSpinner/ButtonSpinner';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const triggeredLocation = location.state?.from?.pathname;
    // console.log(location, triggeredLocation);

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        setLoading(true);
        setErrMsg('');

        // signInUser
        signInUser(data.email, data.password)
        .then(result => {
            setLoading(false);
            const user = result.user;
            navigate(triggeredLocation || '/');
            reset();
            console.log("Sign in user:", user);
        })
        .catch(err => {
            console.error(err);
            setErrMsg(err?.message);
        })
    }

    return (
        <section className="sign-in w-full mx-auto bg-white dark:bg-gray-800 ">
            <div className="container mx-auto px-6 grid gap-5 gap-y-10 md:gap-y-0 grid-cols-1 md:grid-cols-2 py-14">
                {/* lottie-container div starts */}
                <div className="lottie-container">
                    <Lottie animationData={sign_in_lottie} loop={true} className='h-[300px] md:h-[450px]' />
                </div>

                {/* form-container div starts */}
                <div className='form-container'>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white">Sign In</h1>

                        {/* email field */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <EnvelopeIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" {...register("email", { required: true })} />
                        </div>

                        {/* password field  */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <LockClosedIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type={showPassword ? 'text' : 'password'} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" {...register("password", { required: true })} />
                        </div>

                        {/* error message */}
                        {errMsg ? <p className='text-sm text-red-600 ps-1 mt-3'>{errMsg}</p> : undefined}

                        {/* show & forget password div starts */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm">
                                <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                                <span className='ps-1'>Show Password</span>
                            </div>

                            <h1 className='text-sm cursor-default hover:underline text-blue-500 hover:text-blue-600 active:text-blue-500 active:no-underline'>Forget password?</h1>
                        </div>

                        {/* buttons */}
                        <div className="mt-4">
                            <button className="w-full px-6 py-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">{ loading ? <ButtonSpinner /> : "Sing In" }</button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign in with</p>

                            {/* sign in with google button */}
                            <GoogleSignIn title="Sign in" />

                            {/* redirect sign-up page link */}
                            <div className="mt-6 text-center ">
                                <Link to="/sign-up" className="text-sm text-blue-500 hover:underline dark:text-blue-400">Don't have an account? Sign up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignIn;