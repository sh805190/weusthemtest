import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from "./ContactScreen";
import ContactEditScreen from './ContactEditcreen';

const Stack = createNativeStackNavigator();


const App = () => (


  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        component={ContactEditScreen}
        name="ContactEditScreen"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>


);


export default App;
