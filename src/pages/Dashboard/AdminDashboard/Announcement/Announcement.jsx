import React, { useEffect, useState } from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { PencilSquareIcon, EnvelopeIcon, PencilIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Swal from 'sweetalert2';
import ButtonSpinner from '../../../../ButtonSpinner/ButtonSpinner';

const Announcement = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm();

    useEffect(() => {
        if (user && user.email) {
            setValue("authorName", user.displayName);
        }
    }, [user, setValue]);

    // author image upload to cloudinary
    // previewFile
    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    // handleChange
    const handleChange = e => {
        const logoFile = e.target.files[0];
        setFile(logoFile);
        previewFile(logoFile);
    }

    const onSubmit = async(data) => {
        setErrMsg('');
        setLoading(true);
        data.postTime = moment().format('YYYY-MM-DD');
        const newData = data;

        try{
            // upload image to cloudinary & get live link
            const res = await axiosPublic.post('/', {
                company_logo: image
            });

            // console.log('Author image live link from cloudinary:', res.data);
            if(res?.data){
                const image_live_link = res?.data?.secure_url;
                data.authorImage = image_live_link;
            }

            const uploadData = async() => {
                try{
                    const res = await axiosSecure.post('/announcements', newData);
                    const data = await res.data;
                    
                    if(data?.insertedId){
                        setLoading(false);
                        Swal.fire({
                            title: "Good job!",
                            text: "Announcement added successfully!",
                            icon: "success"
                        });
                        reset();
                    }
                }catch(err){
                    console.error(err);
                }
            };
            uploadData();
        }catch(err){
            console.error(err);
        }
    }

    return (
        <section className='announcement'>
            <DashboardRoutes />

            <div className="container mx-auto px-6 py-14">
                <SectionTitle title="Make Announcement" sub_title="Announce news you want to know people" />

                <div className='w-full md:w-[650px] mx-auto'>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    {/* authorImage field */}
                    <div className="relative flex items-center mt-8">
                            <label htmlFor="file-input" className="sr-only">Choose file</label>

                            <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {...register("authorImage", { required: true })} accept='image/png, image/jpg, image/jpeg' onChange={e => handleChange(e)} />
                        </div>

                        {/* authorName field */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type="text" className="block w-full py-2 text-gray-700 bg-blue-50 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-not-allowed" disabled={true} placeholder="Author Name" {...register("authorName", { required: true })} />
                        </div>

                        {/* title field */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <PencilSquareIcon className="mx-3 size-5 text-gray-400" />
                            </span>

                            <input type="text" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Announcement Title" {...register("title", { required: true })} />
                        </div>

                        {/* announcement description field */}
                        <div className="relative flex items-center mt-4">
                            <textarea type="text" rows="3" className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Write your announcement description here" {...register("announcementDescription", { required: true })}></textarea>
                        </div>

                        {/* make announcement button */}
                        <button className="w-full mt-4 px-6 py-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20" disabled={loading}>{ loading ? <ButtonSpinner /> : 'Make Announcement' }</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Announcement;