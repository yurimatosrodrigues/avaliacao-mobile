import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { userService } from '../../services/user.service';
import UserView from '../../components/UserView';

export default function HomePage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [users, setUsers] = React.useState<any[]>([]);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    
    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOut}/>,
        headerRight: () => <Button title="Add" onPress={goToUser}/>
    });

    React.useEffect(() =>{
        fetchUsers()
    }, []);    

    function logOut(){
        navigation.goBack();
    }
    
    function goToUser(){
        navigation.navigate('Cadastro');
    }

    async function fetchUsers(){
        setRefreshing(true)
        try{
            const list = await userService.get()
            if(list) setUsers(list);
            else logOut();
        }
        catch(e){
            console.error('Erro ao atualizar lista: '+ e)
        }
        setRefreshing(false)
    }

    function editUser(id: number){
        navigation.navigate('Cadastro', {id});
    }

    function removeUser(id: number){
        userService.remove(id).then(isDeleted => {
            if(isDeleted) fetchUsers()
        })
    }

    return (
        <View>
            <FlatList
                data={users}
                refreshing={refreshing}
                onRefresh={fetchUsers}
                renderItem={({ item }) => <UserView user={item} edit={editUser} remove={removeUser} />}
            />
        </View>
    );
}