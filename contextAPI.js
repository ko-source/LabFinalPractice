import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import app from './firebase'; // Adjust this import according to your file structure

const MyContext = createContext();

function ContextApi({ children }) {
    const [userPosts, setUserPosts] = useState([]);
    const database = getDatabase(app);

    const fetchUserPosts = (userId) => {
        // Adjust the path according to your database structure
        const postsRef = query(ref(database, 'post'), orderByChild('userId'), equalTo(userId));
        
        onValue(postsRef, (snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setUserPosts(posts);
        }, {
            onlyOnce: true
        });
    };

    const value = { userPosts, fetchUserPosts };

    return (
        <MyContext.Provider value={value}>{children}</MyContext.Provider>
    );
}

const useMyContext = () => {
    return useContext(MyContext);
};

export { useMyContext, ContextApi };
