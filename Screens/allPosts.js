import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMyContext } from '../contextAPI';

export default function allPosts({ route }) {
    const userId = route.params;
    const { userPosts, fetchUserPosts } = useMyContext();

    useEffect(() => {
        if (userId) {
            fetchUserPosts(userId);
        }
    }, [userId]);

    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            {/* Add more post details if needed */}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userPosts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postContent: {
        fontSize: 14,
    },
    // You can add more styles for other post details
});
