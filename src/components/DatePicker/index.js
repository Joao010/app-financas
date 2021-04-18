import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, Header } from './styles.js';
import { Platform } from 'react-native';

import { whites } from '../../styles/colors.json';

export const DatePicker = ({ date, onClose, onChange }) => {
  const [ dateNow, setDateNow ] = useState(new Date(date));

  return <Container>
    {Platform.OS === 'ios' &&
    <Header>
      <TouchableOpacity onPress={ onClose }>
        <Text>Fechar</Text>
      </TouchableOpacity>
    </Header>
    }

    <DateTimePicker
    value={dateNow}
    mode='date'
    display='default'
    onChange={(e, d) => {
      const currentDate = d || dateNow;
      setDateNow(currentDate);
      onChange(currentDate);
    }}
    style={{background: whites[0]}}
    />
  </Container>
}
