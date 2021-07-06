import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const OnBoardingOne = () => {
  const navigation = useNavigation();

  return (
      <ImageBackground style={styles.logoImageContainer}
          source={require('../../TemplateDiploma/BackGroundSign.png')}
        >
        <View style={styles.container}>
          <Text style={styles.logo}>About</Text>
          <TouchableOpacity>
          <View style={{padding: 10}}><Icon
            name={"arrow-right"}
            size={30}
            color="rgba(28, 28, 28, 0.8)"
            onPress={() => navigation.navigate('AboutTwo')}
          /></View>
          </TouchableOpacity>
        </View>
        
      </ImageBackground>
);
}

export default OnBoardingOne;

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center'
},

logo: {
  fontWeight: "bold",
  fontSize: 50,
  color: "#034947",
  marginBottom: 10
},

inputView: {
  width: "80%",
  backgroundColor: "#edf4ef",
  borderRadius: 25,
  height: 40,
  marginBottom: 10,
  justifyContent: "center",
  padding: 20
},

inputText: {
  height: 40,
  color: "#034947"
},

forgot: {
  marginTop: 10,
  color: "#034947",
  fontSize: 12
},

loginBtn: {
  width: "30%",
  backgroundColor: "#034947",
  borderRadius: 20,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 10
},

signUpBtn: {
  width: "30%",
  backgroundColor: "#edf4ef",
  borderRadius: 20,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10
},

loginText: {
  color: "#edf4ef"
},

signUpText: {
  color: "#034947"  
},

logoImage: {
  width: 200, 
  height: 200,
  marginTop: 180,
},

logoImageContainer: {
  flex: 1,
  justifyContent: 'center'
  },
});