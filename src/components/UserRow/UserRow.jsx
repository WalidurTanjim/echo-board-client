import React from 'react';
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon, ChatBubbleOvalLeftEllipsisIcon, ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UserRow = ({ user, refetch }) => {
    const { _id, userName, userPhoto, userEmail, role, badge } = user;
    const axiosSecure = useAxiosSecure();
    
    // handleMakeAdmin
    const handleMakeAdmin = async(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you wanna make this user admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try{
                    const res = await axiosSecure.patch(`/make-admin/${id}`);
                    const data = await res?.data;
                    
                    if(data.modifiedCount > 0){
                        Swal.fire({
                            title: "Success!",
                            text: "This user being admin successfully",
                            icon: "success"
                        });
                        refetch();
                    }
                }catch(err){
                    console.error(err);
                }
            }
        });
    }


    // handleDeleteUser
    const handleDeleteUser = async id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't able to revert this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try{
                    const res = await axiosSecure.delete(`/users/${id}`);
                    const data = await res?.data;
                    
                    if(data.deletedCount > 0){
                        Swal.fire({
                            title: "Success!",
                            text: "User has been deleted successfully",
                            icon: "success"
                        });
                        refetch();
                    }
                }catch(err){
                    console.error(err);
                }
            }
        });
    }

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                            <img className="object-cover w-10 h-10 rounded-full" src={userPhoto} alt="" />
                                <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">{userName || "Anonymous"}</h2>
                                </div>
                        </div>
                </div>
            </td>

            <td className="px-4 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">
                {
                    role === 'admin' ? 
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 border border-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                        <h2 className="text-xs font-normal text-emerald-500">{role ? role : 'None'}</h2>
                    </div> : 
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-50 dark:bg-gray-800 border border-slate-300">
                        <h2 className="text-xs font-normal text-slate-600">{role ? role : 'None'}</h2>
                    </div>
                }
            </td>

            <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 capitalize whitespace-nowrap">{ badge ? badge : 'None'}</td>
            <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">{userEmail}</td>

            {/* buttons td */}
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <button className={`text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none ${role === 'admin' ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={role === 'admin' ? true : false} onClick={() => handleMakeAdmin(_id)}>
                        <ShieldCheckIcon className='w-5 h-5' />
                    </button>

                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => handleDeleteUser(_id)}>
                        <TrashIcon className='w-5 h-5' />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;