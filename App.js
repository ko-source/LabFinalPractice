import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your other components here

import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import postCreation from './Screens/postCreation';
import userProfile from './Screens/userProfile';
import Favorites from './Screens/Favorites';
import viewPost from './Screens/viewPost';
import allPosts from './Screens/allPosts';
import allUsers from './Screens/allUsers';

// import { useMyContext } from './contextAPI';
import { ContextApi } from './contextAPI';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <ContextApi>
    <NavigationContainer>
     
      <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={Home}
      options={{
        headerShown:true
      }}
    />
     <Stack.Screen 
      name="allUsers" 
      component={allUsers}
      options={{
        headerShown:true
      }}
    />
     <Stack.Screen 
      name="viewPost" 
      component={viewPost}
      options={{
        headerShown:true
      }}
    />
    <Stack.Screen 
      name="allPosts" 
      component={allPosts}
      options={{
        headerShown:true
      }}
    />
      <Stack.Screen
      
          name="Login"
          component={Login}
          options={{
            headerShown: true
          }}
        />
      <Stack.Screen 
      name="postCreation" 
      component={postCreation}
      options={{
        headerShown:true
      }}
    />
     
      <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: true
          }}
        />
       

 <Stack.Screen 
      name="userProfile" 
      component={userProfile}
      options={{
        headerShown:true
      }}
    />
 <Stack.Screen 
      name="Favorites" 
      component={Favorites}
      options={{
        headerShown:true
      }}
    />
      </Stack.Navigator>
    </NavigationContainer>
    </ContextApi>
  );
}