import styled from 'styled-components/native';
import { primary, whites, blacks } from '../../styles/colors.json';

export const Background = styled.View`
  flex: 1;
  background: ${ blacks[1] };
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: blacks[3]
})`
  height: 50px;
  width: 90%;
  background: rgba(255,255,255,.9);
  margin-top: 30px;
  font-size: 17px;
`;
export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  background: ${ primary };
`;
export const SubmitText = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: ${ whites[0] };
`;
