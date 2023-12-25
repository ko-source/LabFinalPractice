import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const loginBtnPressed = async() => {

    console.log(email);
    console.log(password);

    const authDB = getAuth(app);
    signInWithEmailAndPassword(authDB, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
AsyncStorage.setItem("user", JSON.stringify(user))


        navigation.navigate('Home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

      
    
   

  }
  return (
    <View style={{flex:1, justifyContent:'center'}}>
        <StatusBar style="auto" />
   
      <View style={{flex:0.30,
      justifyContent:'center', alignItems:'center'}} >

      <Text style= {{fontSize:40, fontWeight:'bold'}}>Login</Text>

      </View>
      <View style={{flex:0.40,
       justifyContent:"center", alignItems:"center"}}>
         
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
      <TouchableOpacity style={styles.button } onPress={loginBtnPressed} >
        <Text style={{textAlign:'center'}}>Login</Text>
      </TouchableOpacity>
        </View>
        {/* <View style={{flex:0.30,
        backgroundColor:"blue"}}>


        
        </View>
     */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:"#0d6efd",
    marginTop:"10%",
    width:"70%",
    padding: 10,
    borderRadius:20
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
});
