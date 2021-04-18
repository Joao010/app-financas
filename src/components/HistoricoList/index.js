import React from 'react';

import { TouchableWithoutFeedback } from 'react-native';
import { Container, Type, TypeText, IconView, ValueText } from './styles';
import Icon from 'react-native-vector-icons/Feather';

export const HistoricoList = ({ data, deleteItem }) => {
  return <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
    <Container>
        <Type>
          <IconView type={data.type}>
            <Icon
            name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
            color='#fff'
            size={20}/>
            <TypeText>Receita</TypeText>
          </IconView>
        </Type>

        <ValueText>R$ {data.value}</ValueText>
      </Container>
  </TouchableWithoutFeedback>
}
