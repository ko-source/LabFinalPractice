import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import app from '../firebase';
import { useNavigation } from "@react-navigation/native";
const ViewPost = ({ route }) => {
    const [user, setUser] = useState({});
    const post = route.params;
    const firestoreDB = getFirestore(app);

    const getUser = async () => {
        const usersCollection = collection(firestoreDB, "users");
        const postUserDoc = doc(usersCollection, post.userId);

        try {
            const docSnap = await getDoc(postUserDoc);
            
            if (docSnap.exists()) {
                setUser(docSnap.data()); // Store the entire user data
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    const navigation = useNavigation();
const allPosts = (userId)=>{
navigation.navigate('allPosts',userId)
    
}


    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: post.imageURL }} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
                {/* Display only the user's name */}
                <TouchableOpacity  onPress={() => allPosts(post.userId)}>
                        <Text style={styles.userName}>Posted by: {user.name}</Text>
                </TouchableOpacity>

              
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'gray',
    },
});

export default ViewPost;
