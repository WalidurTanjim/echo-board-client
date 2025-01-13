import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
    const updateUserProfile = (user, fullname, image) => {
        setLoading(true);
        return updateProfile(user, {
            displayName: fullname,
            photoURL: image
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
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current user:", currentUser);
            setLoading(false);
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