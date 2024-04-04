import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function HomePage() {
    const navigation = useNavigation<NavigationProp<any>>();
    
    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={logOut}/>,
        headerRight: () => <Button title="Add" onPress={goToUser}/>
    });

    function logOut(){
        navigation.goBack();
    }
    
    function goToUser(){
        navigation.navigate('Cadastro');
    }

    return (
        <View>
            <Text>Listagem</Text>
        </View>
    );
}