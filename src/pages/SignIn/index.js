import React, { useContext, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';
import { Background, Container, Logo, AreaInput, Input, SubmitButton,
SubmitText, Link, LinkText } from './styles';

export const SignIn = () => {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return <Background>
    <Container
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    enabled
    >
      <Logo source={require('../../assets/Logo.png')}/>

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

    <SubmitButton onPress={() => signIn(email, password)}>
      { loadingAuth
      ? <ActivityIndicator size={20} color='#fff'/>
      : <SubmitText>Acessar</SubmitText>
      }
    </SubmitButton>

    <Link onPress={() => navigation.navigate('SignUp')}>
      <LinkText>Criar uma conta!</LinkText>
    </Link>

    </Container>
  </Background>
}
