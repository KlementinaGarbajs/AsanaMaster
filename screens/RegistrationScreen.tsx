import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, BackHandler } from 'react-native';
import ClientApi from '../api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const RegistrationScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isError, setIsError] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            navigation.navigate('Login');
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
      );

    const registration = async() => {
        const setUser = async() => {
            const values = {
              id: 100,
            }
            ClientApi.setUser(values).then(() => {
                console.log("Success!");
            });
          }

        const values = {
            id: 100,
            name: name,
            email: email,
            password: password,
            first_login: true,
        }

        ClientApi.register(values).then(() => {
            console.log("Success!");
        });


        //Check for the Email TextInput
        if (!name.trim()) {
            alert('Please Enter Name');
            setIsError(true);
            return;
        }

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
      
        //Checked Successfully
        if(isError === false) {
            setUser();
            navigation.navigate('About Yoga');
        };
    }

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
                        placeholder="Name"
                        onChangeText={setName}
                        placeholderTextColor="#034947" />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    onChangeText={setEmail}
                    placeholderTextColor="#034947" />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    onChangeText={setPassword}
                    placeholder="Password..."
                    placeholderTextColor="#034947" />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={registration}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default RegistrationScreen;

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
        backgroundColor: "#edf4ef",
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
        color: "#034947"
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