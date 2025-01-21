import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [reviewData, setReviewData]  = useState(null);
    const [open, setOpen] = useState(false);
    const axiosPublic = useAxiosPublic();

    // googleSignIn
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // createUser
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // updateUserProfile
    const updateUserProfile = (user, fullname) => {
        setLoading(true);
        return updateProfile(user, {
            displayName: fullname
        });
    };

    // verifyEmail
    const verifyEmail = user => {
        setLoading(true);
        return sendEmailVerification(user);
    }

    // signInUser
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // forgotPassword
    const forgotPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    // logOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // deleteAccount
    const deleteAccount = user => {
        setLoading(true);
        return deleteUser(auth, user);
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            console.log("Current user:", currentUser)

            if(currentUser){
                const userInfo = { email: currentUser?.email };
                const dbUserInfo = {
                    userName: currentUser?.displayName,
                    userEmail: currentUser?.email,
                    userPhoto: currentUser?.photoURL
                }

                try{
                    const res = await axiosPublic.post('/create-token', userInfo);
                    const data = await res?.data;
                    // if(data){
                        

                        try{
                            const res = await axiosPublic.post('/users', dbUserInfo);
                            const data = await res?.data;
                            
                            if(data.insertedId){
                                toast.success('Account created successfully.');
                                setLoading(false);
                            }
                            if(data?.message){
                                toast.success('Signin your account successfully');
                                setLoading(false);
                            }
                        }catch(err){
                            console.error(err);
                        }
                    // }
                }catch(err){
                    console.error(err);
                }
            }else{
                try{
                    const res = await axiosPublic.post('/logout');
                    const data = await res?.data;
                    
                    if(data.success){
                        setLoading(false);
                    }
                }catch(err){
                    console.error(err);
                }
            }

            console.log("Current user:", currentUser);
        });
        
        return () => {
            return unsubscribe();
        }
    }, []);

    const userInfo = {
        user, loading,
        search, setSearch,
        reviewData, setReviewData,
        open, setOpen,
        googleSignIn,
        createUser,
        updateUserProfile,
        verifyEmail,
        signInUser,
        forgotPassword,
        logOut,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;