import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClientApi from '../api';

const API_URL = 'http://localhost:8080';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState<any[]>([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState();

    const [isError, setIsError] = useState(false);

    useEffect(() => {
      ClientApi.getUsers().then((res) => {
        setUsers(res);
     });
    },[users]);

    const setUser = async() => {
      const values = {
        id: id,
      }
      ClientApi.setUser(values).then(() => {
          console.log("Success!");
      });
    }

    const checkTextInput = () => {
      setIsError(false);

      if (!email.trim()) {
        alert('Please Enter Email');
        setIsError(true);
        return;
      }

      if (!password.trim()) {
        alert('Please Enter Password');
        setIsError(true);
        return;
      }

      users.some(function(el) {
        if(el.email === email){
          setId(el.id);
        }

        if (el.email !== email) {
          alert('Wrong email or password');
          setIsError(true);
          return;
        } else if (el.password !== password) {
          alert('Wrong email or password');
          setIsError(true);
          return;
        }
      });

      //Checked Successfully
      if(isError === false) {
        setUser();
        navigation.navigate('Menu');
      }
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
              } else {
                  onLoggedIn(jsonRes.token);
                  setIsError(false);
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
          <Text style={styles.loginText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
/*
  <TouchableOpacity>
    <Text style={styles.forgot} onPress={() => navigation.navigate('Forgoten')}>Forgot password?</Text>
  </TouchableOpacity>
*/

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