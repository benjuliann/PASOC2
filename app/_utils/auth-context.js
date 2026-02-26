"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const facebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const emailSignUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const emailSignIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const firebaseSignOut = async () => {
        await signOut(auth);
        redirect('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            googleSignIn,
            facebookSignIn,
            emailSignUp,
            emailSignIn,
            firebaseSignOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(AuthContext);
}