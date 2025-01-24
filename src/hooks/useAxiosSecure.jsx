import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://echo-board-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;