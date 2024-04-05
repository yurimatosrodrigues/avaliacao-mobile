import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import MyInput from '../../components/MyInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { userService } from '../../services/user.service'

export default function CadastroPage() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [nome, setNome] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [senhaConfirmada, setSenhaConfirmada] = React.useState('');

//  navigation.setOptions({ title:"Novo usuário" });

  function validate(nome: string, login: string, senha: string, senhaConfirmada: string){
    if(nome.trim() != '' && login.trim() != '' && 
       senha.trim() != '' && senhaConfirmada.trim() != ''){
      if(senha === senhaConfirmada){
        userService.create(nome, login, senha).then(isSaved => {
          if(isSaved) navigation.goBack();
        });
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
