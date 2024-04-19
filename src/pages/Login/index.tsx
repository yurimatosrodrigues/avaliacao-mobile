import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';
import MyInput from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { authService } from '../../services/auth.service';

export default function LoginPage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  //navigation.setOptions( { title: 'Página de Acesso' } );

  function login(){
    authService.login(username.trim(), password).then(isLogged => {
      if (isLogged){        
        navigation.navigate('ListRole');
      }
      else{
          Alert.alert('Login e/ou senha incorreto(s)!');
      }
    }).catch(error => Alert.alert(error))
  }

  return (
    <View style={styles.container}>
      <MyInput title='Login' value={username} change={setUserName} />

      <MyInput title='Senha' value={password} change={setPassword} isPassword/>
      
      <View style={styles.buttonView}>
        <Button color='purple' title='Entrar' onPress={login} />
      </View>
    </View>
  );
}
