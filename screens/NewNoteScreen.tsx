import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ClientApi from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

function NewNoteScreen() {
    const navigation = useNavigation();
    //const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [date, setDate] = React.useState('2020-10-06');
    const [rate, setRate] = React.useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const setNoteDescription = (event: string) => {
        setDescription(event);
    }
    const setNoteTitle = (event: string) => {
        setTitle(event);
    }

    const closeModal = () => {
        navigation.navigate('Notes');
    }

    /*const handleDateChange = (date: React.SetStateAction<Date>) => {
        setSelectedDate(date);
    };*/

  const saveNote = async() => {
    const values = {
        name: title,
        description: description,
        date: date,
        rate: rate
    }
        ClientApi.saveNewNote(values).then(() => {
            console.log("juhu");
        });    

        setTitle('');
        setDescription('');
        closeModal();
    }

  return (
    <SafeAreaView>
        <Text style={styles.logo}>Note to myself</Text>
        <View style={styles.inputView}>
            <TextInput
                style={{ fontSize: 16 }}
                onChangeText={(e) => setNoteTitle(e)}
                value={title}
                autoCompleteType="off"
                placeholder="Title..."
                placeholderTextColor="rgba(28, 28, 28, 0.8)"/>
        </View>
        <Text style={styles.logo}>How do I feel today?</Text>
        <View style={styles.inputViewBig}>
            <TextInput
                multiline
                numberOfLines={30}
                style={{ fontSize: 16 }}
                onChangeText={(e) => setNoteDescription(e)}
                value={description}/>
        </View>

        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Notes')}>
                <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={(saveNote)}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default NewNoteScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    logo: {
        fontSize: 20,
        color: "#034947",
        paddingHorizontal: 10,
        paddingTop: 10
    },
    
    text: {
        color: "#034947",
        fontWeight: "bold",
    },

    backBtnText: {
        color: "#034947"
    },

    saveBtnText: {
        color: "white"
    },

    inputView: {
        width: "50%",
        height: 50,
        backgroundColor: "white",
        marginBottom: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        paddingHorizontal: 10
    },

    inputViewBig: {
        height: 300,
        backgroundColor: "white",
        marginBottom: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10
    },

    backBtn: {
        width: 80,
        backgroundColor: "white",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },

    saveBtn: {
        width: 80,
        backgroundColor: "#034947",
        color: "white",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },

});
