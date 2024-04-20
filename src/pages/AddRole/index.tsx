import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles';
import MyInput from '../../components/MyInput';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { roleService } from '../../services/role.service'

type Props = {
  id: number
}

export default function AddRolePage() {
  const navigation = useNavigation<NavigationProp<any>>();

  const route = useRoute()

  const id: number = route.params ? (route.params as any).id : 0


  const [nome, setNome] = React.useState('');
  const [descricao, setDescricao] = React.useState(''); 

  React.useEffect(() => {
    if(id > 0){
      navigation.setOptions({ title: 'Editar role' })
      fetchUser()
    }
    else{
      navigation.setOptions({ title: 'New role' })
    }
    
  }, [id])

  function fetchUser(){
    if(id>0){
      roleService.getById(id).then(role => {
        setNome(role.name);
        setDescricao(role.description);
      })
    }
  }


  function create(nome: string, descricao: string){
    if(nome.trim() != '' && descricao.trim() != ''){        
      roleService.create(nome, descricao).then(result => {
        if(result === true){
          setNome('');
          setDescricao('');          
          navigation.goBack();
        } 
        else Alert.alert(result + '');

      }).catch(error => console.log(error));
    }
    else{
      Alert.alert('Algum campo não foi preenchido!');
      return false;
    }
  }

  function salvar(){  
    create(nome, descricao);    
  }

  return (
    <View style={styles.container}>     

      <MyInput title='Nome' value={nome} change={setNome}  />

      <MyInput title='Descrição' value={descricao} change={setDescricao} />
      
      <View style={styles.buttonView}>
        <Button color='purple' title='Cadastrar' onPress={salvar} />
      </View>
    </View>
  );
}
