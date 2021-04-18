import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from '../database/firebaseConnection';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ loadingAuth, setLoadingAuth ] = useState(false);

  useEffect(() => {
    const loadStorage = async() => {
      const storageUser = await AsyncStorage.getItem('Auth_User');

      if(storageUser) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  const signIn = async(email, password) => {
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async(ev) => {
      let uid = ev.user.uid;

      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot) => {
        let data = {
          uid,
          name: snapshot.val().name,
          email: ev.user.email,
        };

        setUser(data);
        storageUser(data);
      });
    })
    .catch((error) => {
      alert(error.code);
    });

    setLoadingAuth(false);
  }

  const signUp = async(name, email, password) => {
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async(ev) => {
      let uid = ev.user.uid;

      await firebase.database().ref('users').child(uid).set({
        saldo: 0,
        name,
      })
      .then(() =>
      {
        let data = {
          uid,
          name,
          email: ev.user.email,
        };

        setUser(data);
        storageUser(data);
      });
    })
    .catch((error) => alert(error.code));
    
    setLoadingAuth(false);
  }

  const signOut = async() => {
    setLoadingAuth(true);

    try {
      await firebase.auth().signOut();
      await AsyncStorage.clear();
      setUser(null);
    }
    catch(error) { alert(error) }

    setLoadingAuth(false);
  }

  const storageUser = async(data) => {
    await AsyncStorage.setItem('Auth_User', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider value={{
      loading,
      loadingAuth,
      signed: Boolean(user),
      user,
      signUp,
      signIn,
      signOut,
    }}>
      { children }
    </AuthContext.Provider>
  );
}
