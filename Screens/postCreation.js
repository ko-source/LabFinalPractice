import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import app from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set } from "firebase/database";

const PostCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const database = getDatabase(app);

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const asyncUser = await AsyncStorage.getItem("user");
    const user = JSON.parse(asyncUser);
    setUser(user);
  };

  const handlePostCreation = () => {
    set(ref(database, 'post/' + generateUniqueId()), {
      userId: user.uid,
      title: title,
      description: description,
      imageURL: 'https://via.placeholder.com/150' // Replace with actual image upload logic
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={handlePostCreation}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={goToHome}>
        <Text style={styles.secondaryButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea', // Soft background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textarea: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50', // Attractive green color
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#007bff', // Warm secondary color
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Circular image
    marginBottom: 20,
  },
});

export default PostCreation;
