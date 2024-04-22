import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import styles from './styles';


export default function MenuPage() {
    const navigation = useNavigation<NavigationProp<any>>();

    function cadastroUsers(){
        navigation.navigate('Home');
    }

    function cadastroRoles(){
        navigation.navigate('ListRole');
    }

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <Button color='purple' title='Cadastro de Usuários' onPress={cadastroUsers} />
            </View>
            
            <View style={styles.options}>
                <Button color='blue' title='Cadastro de Roles' onPress={cadastroRoles} />
            </View>            
        </View>
    );
}