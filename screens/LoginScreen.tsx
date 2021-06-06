import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
      <ImageBackground style={styles.logoImageContainer}
          source={require('../TemplateDiploma/BackGroundSign.png')}
        >
        <View style={styles.container}>
          <Image style={styles.logoImage}
            source={require('../TemplateDiploma/path35490.png')}
          />
          <Text style={styles.logo}>Asana Master</Text>
          <View style={styles.inputView} >
            
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#034947" />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#034947" />
          </View>

          <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate('Menu')}  >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Registration')} >
            <Text style={styles.signUpText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
);
}

export default LoginScreen;

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
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