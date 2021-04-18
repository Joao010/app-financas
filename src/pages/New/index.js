import React, { useContext, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';

import firebase from '../../database/firebaseConnection';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import { Header } from '../../components/Header';
import { Picker } from '../../components/Picker';

export const New = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [ value, setValue ] = useState('');
  const [ type, setType ] = useState('receita');

  const handleSubmit = async() => {
    Keyboard.dismiss();
    if(isNaN(parseFloat(value)) || type === null) {
      alert('Preencha todos os campos!')
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${ type } - Valor: ${ parseFloat(value) }`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: async() => await handleAdd(),
        }
      ]
    )
  }

  const handleAdd = async() => {
    let uid = user.uid;
    let key = await (await firebase.database().ref('historico').child(uid).push()).key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      type,
      value: parseFloat(value),
      date: format(new Date(), 'dd/MM/yyyy'),
    });

    // Atualizando o saldo
    let userLocation = firebase.database().ref('users').child(uid);
    await userLocation.once('value').then(snapshot => {
      let saldo = parseFloat(snapshot.val().saldo);

      type === 'despesa'
      ? saldo -= parseFloat(value)
      : saldo += parseFloat(value);

      userLocation.child('saldo').set(saldo);
    });

    setValue('');
    Keyboard.dismiss();
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header/>

        <SafeAreaView style={{alignItems: 'center'}}>
          <Input
          placeholder='Valor desejado'
          keyboardType='numeric'
          returnKeyType='next'
          onSubmitEditing={() => Keyboard.dismiss()}
          value={value}
          onChangeText={(ev) => setValue(ev)}
          />

          <Picker onChange={setType} type={type}/>

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
