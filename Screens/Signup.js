import React, { useState,navigation } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { doc, setDoc ,getFirestore, collection } from "firebase/firestore"; 

import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {

    const authDB = getAuth(app);
    const firestoreDB = getFirestore(app);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = ()=>{

    }
    const signupHandle = ()=>{
        createUserWithEmailAndPassword(authDB, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
const collectionRef = collection(firestoreDB, "users");
console.log(collectionRef);
   setDoc(doc(collectionRef, user.uid), {
        name: username,
        email: email,
        password:password
      });
   navigation.navigate('Login')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.text}>Signup</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signupHandle}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
              </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginText: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
});
