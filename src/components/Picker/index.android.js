import React from 'react';
import { PickerView } from './styles';
import { Picker as PickerSelect } from '@react-native-community/picker';

// import { whites, blacks } from '../../styles/colors.json';

export const Picker = ({ onChange, type }) => {
  return <PickerView>
    <PickerSelect
      style={{
        width: '100%',
      }}
      selectedValue={type}
      onValueChange={(ev) => onChange(ev)}
    >
      <PickerSelect.Item label='Receita' value='receita'/>
      <PickerSelect.Item label='Despesa' value='despesa'/>
    </PickerSelect>
  </PickerView>
}
