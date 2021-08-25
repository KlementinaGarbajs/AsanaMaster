import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClientApi from '../api';

const ForgotenPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);

    const password = "newPassword";

    const setNewPassword = async() => {
        const values = {
            email: email,
            password: password,
        }
        ClientApi.setPassword(values).then(() => {
            console.log("Success!");
        });
    }

    useEffect(() => {
        ClientApi.getUsers().then((res) => {
          setUsers(res);
       });
      },[users]);

    const checkTextInput = () => {
        users.some(function(el) {
            if (el.email !== email) {
              alert('Wrong email');
              setIsError(true);
              return;
            }
          });
  
        //Checked Successfully
        if(isError === false) {
            console.log("juhu");
            setNewPassword;
        }
    };

    //send email function

    return (
        <ImageBackground style={styles.logoImageContainer}
            source={require('../TemplateDiploma/BackGroundSign.png')}
            >
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                    placeholderTextColor="#034947"/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={checkTextInput}>
                    <Text style={styles.loginText}>Send</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default ForgotenPasswordScreen;
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
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

    loginText: {
        color: "#edf4ef"
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