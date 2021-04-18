import styled from 'styled-components/native';

import { primary, tertiary, whites, blacks } from '../../styles/colors.json';

export const Container = styled.View`
  flex: 1;
  background: ${ blacks[1] };
  align-items: center;
`;

export const Name = styled.Text`
  text-align: center;
  font-size: 28px;
  margin-top: 25px;
  margin-bottom: 25px;
  color: ${ whites[0] };
`;

export const NewLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${ primary };
  width: 90%;
  height: 45px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const NewText = styled.Text`
  font-size: 18px;
  color: ${ whites[0] };
  font-weight: bold;
`;

export const Logout = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${ tertiary };
  width: 90%;
  height: 45px;
  border-radius: 10px;
`;

export const LogoutText = styled.Text`
  font-size: 18px;
  color: ${ whites[0] };
  font-weight: bold;
`;
