import axios from 'axios';

const axiosPublic = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://echo-board-server.vercel.app',
    withCredentials: true
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;