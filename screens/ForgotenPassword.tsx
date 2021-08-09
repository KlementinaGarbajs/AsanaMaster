import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotenPasswordScreen = () => {
    const [email, setEmail] = useState('');

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
                <TouchableOpacity style={styles.loginBtn}>
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