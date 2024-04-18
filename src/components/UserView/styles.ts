import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },

    title: {
        fontSize: 16,
        fontWeight: '500'
    },

    subTitle: {
        fontSize: 12,        
    },

    deleteContainer: {
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },

    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }

})