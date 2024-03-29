import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import React from 'react';
import MyInput from '../../components/MyInput';

export default function LoginPage() {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function validate(username: string, password: string){
    return (username === 'uedsonreis' && password === '123456');
  }

  function login(){
    if (validate(username, password)){
        Alert.alert('Logado com sucesso!');
    }
    else{
        Alert.alert('Login e/ou senha incorreto(s)!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Acesso</Text>

      <MyInput title='Login' value={username} change={setUserName} />

      <MyInput title='Senha' value={password} change={setPassword} isPassword/>
      
      <View style={styles.buttonView}>
        <Button color='purple' title='Entrar' onPress={login} />
      </View>
    </View>
  );
}
