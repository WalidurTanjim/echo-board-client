import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);

            if(currentUser && currentUser?.email){
                const userInfo = { email: currentUser?.email };

                try{
                    const res = await axiosPublic.post('/create-token', userInfo);
                    const data = await res?.data;
                    console.log("Create token response:", data);
                    if(data.success){
                        setLoading(false);
                    }
                }catch(err){
                    console.error(err);
                }
            }else{
                try{
                    const res = await axiosPublic.post('/logout');
                    const data = await res?.data;
                    console.log('Logout response:', data);
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