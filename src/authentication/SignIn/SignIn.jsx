import Lottie from 'lottie-react';
import React, { useState } from 'react';
import register_lottie from '../../assets/lottie/register.json';
import { Link } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import { useForm } from "react-hook-form"

const SignIn = () => {
    const [errMsg, setErrMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        setErrMsg('');
        
        console.log(data);
    }

    return (
        <section className="sign-in w-full mx-auto bg-white dark:bg-gray-800 ">
            <div className="container mx-auto px-6 grid gap-5 gap-y-10 md:gap-y-0 grid-cols-1 md:grid-cols-2 py-14">
                {/* form-container div starts */}
                <div className='form-container'>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white">Sign In</h1>

                        {/* email field */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" {...register("email", { required: true })} />
                        </div>

                        {/* password field  */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
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
                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign in</button>

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

                {/* lottie-container div starts */}
                <div className="lottie-container">
                    <Lottie animationData={register_lottie} loop={true} className='h-[300px] md:h-[450px]' />
                </div>
            </div>
        </section>
    );
};

export default SignIn;