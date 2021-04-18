import styled from 'styled-components/native';

import { primary, whites, blacks } from '../../styles/colors.json';

export const Background = styled.View`
  flex:1;
  background: ${ blacks[1] };
`;

export const Container = styled.View`
  margin: 0 0 25px 15px;
`;

export const Name = styled.Text`
  font-size: 19px;
  font-style: italic;
  color: ${ whites[0] };
`;

export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  font-weight: bold;
  color: ${ whites[0] };
`;

export const Area = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: baseline;
`;

export const Title = styled.Text`
  margin: 15px 0 10px 15px;
  color: ${ primary };
`;

export const List = styled.FlatList`
  padding-top: 15px;
  background: ${ whites[0] };
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin: 0 8px;
`;
