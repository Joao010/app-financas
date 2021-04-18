import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import {
  Background, Container,
  AreaInput, Input, SubmitButton,
  SubmitText, Link, LinkText
} from '../SignIn/styles';

export const SignUp = () => {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const navigation =useNavigation();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
   <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      >
        <AreaInput>
          <Input
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          value={name}
          onChangeText={ (text) => setName(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (text) => setPassword(text) }
          secureTextEntry={true}
          />
        </AreaInput>

      <SubmitButton onPress={() => signUp(name, email, password)}>
        { loadingAuth
        ? <ActivityIndicator size={20} color='#fff'/>
        : <SubmitText>Acessar</SubmitText>
        }
      </SubmitButton>

      <Link onPress={ () => navigation.navigate('SignIn') }>
        <LinkText>Já tenho uma conta!</LinkText>
      </Link>

      </Container>
    </Background>
  );
}
