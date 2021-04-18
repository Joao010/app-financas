import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';

import { tertiary, whites } from '../../styles/colors.json';
import { AuthContext } from '../../contexts/auth';

export const CustomDrawer = (props) => {
  const { user, signOut } = useContext(AuthContext);

  return <DrawerContentScrollView {...props}>
    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
      <Image
      source={require('../../assets/Logo.png')}
      style={{width: 85, height: 85}}
      resizeMode='contain'/>

      <Text style={{color: whites[0], fontSize: 18, marginTop: 5}}>
        Bem-Vindo
      </Text>

      <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold', paddingBottom: 25}}>
        {user && user.name}
      </Text>
    </View>

    <DrawerItemList {...props}/>

    <DrawerItem
    {...props}
    label='Sair do app'
    inactiveBackgroundColor={tertiary}
    onPress={() => signOut()}
    />
  </DrawerContentScrollView>
}
