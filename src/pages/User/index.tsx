import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import MyInput from '../../components/MyInput';

export default function CadastroPage() {

  const [nome, setNome] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [senhaConfirmada, setSenhaConfirmada] = React.useState('');

  function validate(nome: string, login: string, senha: string, senhaConfirmada: string){
    if(nome.trim() != '' && login.trim() != '' && 
       senha.trim() != '' && senhaConfirmada.trim() != ''){
      if(senha === senhaConfirmada){
        Alert.alert('Usuário cadastrado com sucesso!');
        return true;
      }
      else{
        Alert.alert('Senha informada não é igual à confirmação de senha!');
        return false;
      }
    }
    else{
      Alert.alert('Algum campo não foi preenchido!');
      return false;
    }
  }

  function cadastrar(){    
    if(validate(nome, login, senha, senhaConfirmada)){
      setNome('');
      setLogin('');
      setSenha('');
      setSenhaConfirmada('');
    }    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Cadastro</Text>

      <MyInput title='Nome' value={nome} change={setNome} />

      <MyInput title='Login' value={login} change={setLogin} />

      <MyInput title='Senha' value={senha} change={setSenha} isPassword />

      <MyInput title='Senha confirmada' value={senhaConfirmada} change={setSenhaConfirmada} isPassword />

      <View style={styles.buttonView}>
        <Button color='purple' title='Cadastrar' onPress={cadastrar} />
      </View>
    </View>
  );
}
