import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import ClientApi from '../api';
import { sendEmail } from '../sendEmail';
import RNSmtpMailer from "react-native-smtp-mailer";

const ForgotenPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);

    const setNewPassword = async (email: string) => {
        const values = {
            email: email,
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
            setNewPassword(email);

 
    RNSmtpMailer.sendMail({
        mailhost: "smtp.gmail.com",
        port: "465",
        ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
        username: "usernameEmail",
        password: "password",
        fromName: "Asana Master", // optional
        recipients: email,
        subject: "New Password",
        htmlBody: "<h1>header</h1><p>Your new password is: newPassword</p>",
        attachmentPaths: [],
        attachmentNames: [],
    })
    .then(success => console.log(success))
    .catch(err => console.log(err));
        }
    };

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