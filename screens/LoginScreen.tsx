import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://localhost:8080';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const checkTextInput = () => {
      //Check for the Name TextInput
      if (!email.trim()) {
        alert('Please Enter Email');
        return;
      }
      //Check for the Email TextInput
      if (!password.trim()) {
        alert('Please Enter Password');
        return;
      }
      //Checked Successfully
      //Do whatever you want
      navigation.navigate('Menu');
    };

    const onLoggedIn = (token: any) => {
      fetch(`${API_URL}/private`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      })
      .then(async res => { 
          try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                  setMessage(jsonRes.message);
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }

    const onSubmitHandler = () => {
      const payload = {
          email,
          password,
      };
      fetch(`${API_URL}/${'login'}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      })
      .then(async res => { 
          try {
              const jsonRes = await res.json();
              if (res.status !== 200) {
                  setIsError(true);
                  setMessage(jsonRes.message);
              } else {
                  onLoggedIn(jsonRes.token);
                  setIsError(false);
                  setMessage(jsonRes.message);
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });

      navigation.navigate('Menu')
  };

  return (
      <ImageBackground style={styles.logoImageContainer}
          source={require('../TemplateDiploma/BackGroundSign.png')}
        >
        <View style={styles.container}>
          <Image style={styles.logoImage}
            source={require('../TemplateDiploma/path35490.png')}
          />
          <Text style={styles.logo}>Asana Master</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              onChangeText={setEmail}
              placeholderTextColor="#034947"/>
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              onChangeText={setPassword}
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#034947"/>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={checkTextInput}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signUpText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot} onPress={() => navigation.navigate('Forgoten')}>Forgot password?</Text>
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