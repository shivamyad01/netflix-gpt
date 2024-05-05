import React, { useRef, useState } from "react";
import Header from "./Header";
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate()
    const dispatch =useDispatch()

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;
        const nameValue=name.current?.value
   
     

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if email is valid
        if (!emailRegex.test(emailValue)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Check if password is at least 6 characters long
        if (passwordValue.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        // Signup
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: nameValue
                      }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                       
                        // Profile updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        // ...
                        console.log(error);
                      });
                    console.log(user);
                    // Additional logic after successful signup
                    toast.success("Sign-up successful!"); // Display success message
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage); // Display error to the user
                    console.error(errorCode, errorMessage);
                    // Additional error handling
                });

          
        } else {
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    // Additional logic after successful sign-in
                    toast.success("Sign-in successful!"); // Display success message
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage); // Display error to the user
                    console.error(errorCode, errorMessage);
                    // Additional error handling
                });
          
        }


        // Reset input fields
        if (email.current) email.current.value = "";
        if (password.current) password.current.value = "";
        if (!isSignInForm && name.current) name.current.value = "";
    }







    return (
        <div>
            <Header />
            <img
                className="absolute"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt=""



                
            />
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 p-8 rounded-lg shadow-lg"
            >
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-3xl py-4 text-white">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 my-2 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:bg-gray-900"
                        />
                    )}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email Address"
                        className="w-full p-3 my-2 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:bg-gray-900"
                    />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 my-2 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:bg-gray-900"
                    />
                    <button
                        onClick={handleButtonClick}
                        className="p-4 my-4 w-full bg-red-600 rounded-lg hover:bg-red-700 text-white font-semibold focus:outline-none"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p
                        onClick={toggleSignInForm}
                        className="cursor-pointer text-sm text-white"
                    >
                        {isSignInForm ? "Don't have an account?" : "Already a Account"}{" "}
                        <button
                            className="text-red-500"
                            style={{ background: "none", border: "none" }}
                            onClick={toggleSignInForm}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
