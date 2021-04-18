import styled from 'styled-components/native';

import { primary, tertiary, whites, blacks } from '../../styles/colors.json';

export const Container = styled.View`
  margin-bottom: 5px;
  padding: 10px;
  box-shadow: 2px 2px rgba(0,0,0,0.40);
  background: rgba(0,0,0,0.02);
`;
export const Type = styled.View`
  flex-direction: row;
`;
export const IconView = styled.View`
  flex-direction: row;
  background: ${ props => props.type === 'despesa' ? tertiary : primary };
  padding: 3px 8px;
  border-radius: 7px;
`;
export const TypeText = styled.Text`
  color: ${ whites[0] };
  font-size: 16px;
  font-style: italic;
`;
export const ValueText = styled.Text`
  color: ${ blacks[3] };
  font-size: 22px;
  font-weight: bold;
`;
