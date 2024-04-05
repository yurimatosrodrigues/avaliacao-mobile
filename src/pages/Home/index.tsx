import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { authRepository } from '../../services/auth.repository';

export default function HomePage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [user, setUser] = React.useState({ name:'' });
    
    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOut}/>,
        headerRight: () => <Button title="Add" onPress={goToUser}/>
    });

    authRepository.getLoggedUser().then(logged => setUser(logged))

    function logOut(){
        navigation.goBack();
    }
    
    function goToUser(){
        navigation.navigate('Cadastro');
    }

    return (
        <View>
            <Text>Olá, {user.name}!</Text>
        </View>
    );
}