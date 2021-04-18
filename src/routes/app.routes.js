import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { primary, whites, blacks } from '../styles/colors.json';
import { Home } from '../pages/Home';
import { New } from '../pages/New';
import { Profile } from '../pages/Profile';
import { CustomDrawer } from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

export const AppRoutes = () =>
  <AppDrawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props}/>}
  drawerStyle={{
    backgroundColor: blacks[2]
  }}
  drawerContentOptions={{
    labelStyle: {
      fontWeight: 'bold',
    },
    activeTintColor: whites[0],
    activeBackgroundColor:primary,
    inactiveBackgroundColor: blacks[0],
    inactiveTintColor: whites[1],
    itemStyle: {
      marginVertical: 5,
    }
  }}>
    <AppDrawer.Screen name='Home' component={ Home }/>
    <AppDrawer.Screen name='Registrar' component={ New }/>
    <AppDrawer.Screen name='Perfil' component={ Profile }/>
  </AppDrawer.Navigator>
