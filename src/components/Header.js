import React, { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase'; // Make sure this import is correct
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful"); // Check if this log appears
      })
      .catch((error) => {
        // Handle errors here.
        console.error("Sign out error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Clean up function
    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  return (
    <div className='absolute px-8 py-2 from-black to-transparent z-10 flex justify-between items-center w-full'>
      <img className='w-56 h-auto' src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg" alt="Netflix logo" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))' }} />
      {
        user && (
          <div className="flex items-center">
            <img className='w-12 h-12 rounded-full border-2 border-white' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User avatar" />
            <button onClick={handleSignOut} className="ml-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300">Sign Out</button>
          </div>
        )
      }
    </div>
  );
};

export default Header;
