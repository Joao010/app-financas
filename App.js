import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';

export const App = () =>
<AuthProvider>
  <NavigationContainer>
    <StatusBar backgroundColor="#131313" barStyle="light-content"/>
    <Routes/>
  </NavigationContainer>
</AuthProvider>
