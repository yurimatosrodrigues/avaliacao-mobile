import { Text, View } from "react-native"

import styles from "./styles"

type Props = {
    role: any,
    edit: (id: number ) => void    
}


export default function UserView({ role , edit }: Props){
    return (
        <View style={styles.container} onTouchEnd={() => edit(role.id)}>
            <Text style={styles.title}>
                {role.name}
            </Text>

            <Text style={styles.subTitle}>
                {role.description}
            </Text>

        </View>
    )
}