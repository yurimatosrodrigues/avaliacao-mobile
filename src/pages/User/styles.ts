import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    title:{
        fontSize: 26,
        margin: 40
    },

    inputView:{       
    },

    label:{
        fontSize: 20
    },
  
    input:{
      borderWidth: 1,
      width: Dimensions.get('screen').width - 100,
      marginBottom: 20,
      fontSize: 16,
      padding: 10
    },

    buttonView: {
        marginTop: 10,
        width: Dimensions.get('screen').width - 220
    }
  });
  