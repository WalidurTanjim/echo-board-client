import React, { useState } from 'react';
import register_lottie from '../../assets/lottie/register.json';
import { useForm } from "react-hook-form"
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import { PencilSquareIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const SignUp = () => {
    const [errMsg, setErrMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrMsg, setPasswordErrMsg] = useState('');

    const { register, handleSubmit, watch, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        setErrMsg('');

        console.log(data);
    }

    return (
        <section className="sign-in w-full mx-auto bg-white dark:bg-gray-800 ">
            <div className="container mx-auto px-6 grid gap-5 gap-y-10 md:gap-y-0 grid-cols-1 md:grid-cols-2 py-14">
                {/* lottie-container div starts */}
                <div className="lottie-container">
                    <Lottie animationData={register_lottie} loop={true} className='h-[300px] md:h-[450px]' />
                </div>
                
                {/* form-container div starts */}
                <div className='form-container'>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white">Sign Up</h1>

                        {/* fullname field */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Full Name" {...register("fullname", { required: true })} />
                        </div>

                        {/* email field */}
                        <div className="relative flex items-center mt-4">
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
                        <div className="flex items-center text-sm mt-4">
                            <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                            <span className='ps-1'>Show Password</span>
                        </div>

                        {/* buttons */}
                        <div className="mt-4">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign up</button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign up with</p>

                            {/* sign up with google button */}
                            <GoogleSignIn title="Sign up" />

                            {/* redirect sign-up page link */}
                            <div className="mt-6 text-center ">
                                <Link to="/sign-in" className="text-sm text-blue-500 hover:underline dark:text-blue-400">Already have an account? Sign in</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;