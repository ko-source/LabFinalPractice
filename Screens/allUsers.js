import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from '../firebase';

export default function allUsers() {
    const [users, setUsers] = useState([]);
    const firestoreDB = getFirestore(app);

    const fetchAllUsers = async () => {
        const usersCollectionRef = collection(firestoreDB, "users");
        
        try {
            const querySnapshot = await getDocs(usersCollectionRef);
            const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const renderUser = ({ item }) => (
        <View style={styles.userContainer}>
            <Image
                source={{ uri: item.avatar || 'https://via.placeholder.com/150' }} // Replace with your default avatar if no avatar in data
                style={styles.avatar}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>Name: {item.name}</Text>
                <Text style={styles.userDetail}>Email: {item.email}</Text>
                {/* Add more user details as needed */}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Light grey background
    },
    userContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, // Circular avatar
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Dark text for better readability
    },
    userDetail: {
        fontSize: 14,
        color: '#666', // Slightly lighter text for details
        marginTop: 5,
    },
    // Add styles for additional details as required
});
