import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { roleService } from '../../services/role.service';
import RoleView from '../../components/RoleView';

export default function RolePage() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [roles, setRoles] = React.useState<any[]>([]);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    
    navigation.setOptions({
        headerRight: () => <Button title="Add role" onPress={goToRole}/>
    });

    React.useEffect(() =>{
      fetchRole()
    }, []);
    
    function goToRole(){
        navigation.navigate('AddRole');
    }

    async function fetchRole(){
        setRefreshing(true)
        try{
            const list = await roleService.get()
            if(list) setRoles(list);
        }
        catch{
            console.error('Erro ao atualizar lista.')
        }
        setRefreshing(false)
    }

    function editRole(id: number){
        navigation.navigate('Role', {id});
    }

    return (
        <View>
            <FlatList
                data={roles}
                refreshing={refreshing}
                onRefresh={fetchRole}
                renderItem={({ item }) => <RoleView role={item} edit={editRole} />}
            />
        </View>
    );
}