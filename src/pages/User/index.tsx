import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import MyInput from '../../components/MyInput';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { userService } from '../../services/user.service'
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';

type Props = {
  id: number
}

export default function CadastroPage() {
  const navigation = useNavigation<NavigationProp<any>>();

  const route = useRoute()

  const id: number = route.params ? (route.params as any).id : 0


  const [nome, setNome] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [senhaConfirmada, setSenhaConfirmada] = React.useState('');

  React.useEffect(() => {
    if(id > 0){
      navigation.setOptions({ title: 'Editar Usuário' })
      fetchUser()
    }
    else{
      navigation.setOptions({ title: 'Novo Usuário' })
    }
    
  }, [id])

  function fetchUser(){
    if(id>0){
      userService.getById(id).then(user => {
        setNome(user.name);
        setLogin(user.username);
      })
    }
  }


  function validate(nome: string, login: string, senha: string, senhaConfirmada: string){
    if(nome.trim() != '' && login.trim() != '' && 
       senha.trim() != '' && senhaConfirmada.trim() != ''){
      if(senha === senhaConfirmada){
        userService.create(nome, login, senha).then(result => {
          if(result === true){
            setNome('');
            setLogin('');
            setSenha('');
            setSenhaConfirmada('');
            navigation.goBack();
          } 
          else Alert.alert(result + '');

        }).catch(error => console.log(error));

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

  function salvar(){  
    
    if(id>0) atualizar()
    else{
      if(validate(nome, login, senha, senhaConfirmada)){
        setNome('');
        setLogin('');
        setSenha('');
        setSenhaConfirmada('');
      }    
    }     
  }

  function atualizar(){
    if(!nome || nome.trim().length < 1){
      Alert.alert('Informe o nome!');
      return false;
    }

    userService.update(id, nome).then(result => {
      if(result === true){
        setNome('');
        setLogin('');
        setSenha('');
        setSenhaConfirmada('');
        navigation.goBack();
      }
    })
  }

  return (
    <View style={styles.container}>     

      <MyInput title='Nome' value={nome} change={setNome}  />

      <MyInput title='Login' value={login} change={setLogin} disable = {id>0} />

      {(id===0) && (
        <>
          <MyInput title='Senha' value={senha} change={setSenha} isPassword />

          <MyInput title='Senha confirmada' value={senhaConfirmada} change={setSenhaConfirmada} isPassword />
        </>        
      )}      

      <View style={styles.buttonView}>
        <Button color='purple' title='Cadastrar' onPress={salvar} />
      </View>
    </View>
  );
}
