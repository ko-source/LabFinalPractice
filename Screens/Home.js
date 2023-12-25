import React, { useState, useEffect,useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, onValue, getDatabase } from 'firebase/database';
import app from '../firebase'; // Ensure this path is correct
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const database = getDatabase(app);
    const navigation = useNavigation();


    const viewPost = (item) => {
        navigation.navigate('viewPost', item);
    };

    const createPost = () => {
        navigation.navigate('postCreation');
    };

    const viewAllUsers = () => {
        navigation.navigate('allUsers');
    };

    useEffect(() => {
        const postsRef = ref(database, 'post');
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const postsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPosts(postsArray);
            }
        }, {
            // onlyOnce: true
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.postCard} onPress={() => viewPost(item)}>
            <Image source={{ uri: item.imageURL }} style={styles.postImage} />
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createPostButton} onPress={createPost} ref={hamza}>
                <Text style={styles.buttonText}>Create Your Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewAllUsersButton} onPress={viewAllUsers}>
                <Text style={styles.buttonText}>All Users</Text>
            </TouchableOpacity>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    postCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    postContent: {
        padding: 15,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    postDescription: {
        fontSize: 16,
        color: 'gray',
    },
    createPostButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    viewAllUsersButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Additional styles as needed
});

export default Home;
