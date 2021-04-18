import React, { useEffect, useContext, useState } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { format, isBefore } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';

import firebase from '../../database/firebaseConnection';
import { Background, Container, Name, Saldo, Area, Title, List } from './styles';
import { AuthContext } from '../../contexts/auth';
import { Header } from '../../components/Header';
import { HistoricoList } from '../../components/HistoricoList';
import { DatePicker } from '../../components/DatePicker';

export const Home = () => {
  const { user } = useContext(AuthContext);

  const [ historico, setHistorico ] = useState({});
  const [ saldo, setSaldo ] = useState(0);
  const [ newDate, setNewDate ] = useState(new Date());
  const [ show, setShow ] = useState(false);
  const uid = user && user.uid;

  useEffect(() => {
    const loadList = async() => {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid).orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot) => {
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            date: childItem.val().date,
          };

          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadList();
  }, [newDate]);

  const handleDelete = (data) => {
    /**
     * convertendo formatação de data
     *
     * d/m/y - formatação usada no Brasil e nesse projeto
     * y/m/d - formatação necessitada para usar o isBefore()
     *
     * isBefore(diaItem, diaHoje) : verifica se a data já passou
     */

    // pegando data do item
    const [ dayItem, monthItem, yearItem ] = data.date.split('/');
    const dateItem = new Date(`${yearItem}/${monthItem}/${dayItem}`);

    // pegando data de hoje
    const formatDateToday = format(new Date(), 'dd/MM/yyyy');
    const [dayToday, monthToday, yearToday] = formatDateToday.split('/');
    const dateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`);

    // se a data do registro já passou
    if(isBefore(dateItem, dateToday)) {
      alert('Você não pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado, Atenção',
      `Você deseja excluir ${ data.type } - Valor: ${ data.value }`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSucess(data),
        },
      ]
    )
  }

  const handleDeleteSucess = async(data) => {
    await firebase.database().ref('historico').child(uid)
    .child(data.key)
    .remove()
    .then( async() => {
      let saldoAtual = saldo;

      data.type === 'despesa'
      ? saldoAtual += parseFloat(data.value)
      : saldoAtual -= parseFloat(data.value);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual);
    })
    .catch((error) => alert(error));
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  }

  return (
    <Background>
      <Header/>

      <Container>
        <Name>{user && (user.name)}</Name>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Icon name='calendar' color='#fff' size={30}/>
        </TouchableOpacity>

        <Title>Últimas movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtrator={ item => item.key }
        renderItem={ ({ item }) =>  (<HistoricoList data={item} deleteItem={handleDelete}/>) }
      />

      {show &&
      (<DatePicker
      onClose={() => setShow(false)}
      date={newDate}
      onChange={onChange}
      />)}
    </Background>
  );
}
