import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ClientApi from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

function NewNoteScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
        name={"home"}
        size={30}
        color="rgba(28, 28, 28, 0.8)"
        onPress={() => navigation.navigate('Menu')}
    /></View>, title: null, headerLeft: null});
    },[]);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    let [id, setId] = useState<number>();

    const setNoteDescription = (event: string) => {
        setDescription(event);
    }
    const setNoteTitle = (event: string) => {
        setTitle(event);
    }

    const closeModal = () => {
        navigation.navigate('Splits');
    }

    useEffect(() => {
        ClientApi.getID().then((res) => {
          setId(res[0].id);
        });
      },[]);

    useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
        navigation.navigate('Splits');
        return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
    );

    const saveNote = async() => {
        const values = {
            name: title,
            description: description,
            user_id: id
        }
        ClientApi.saveNewNote(values).then(() => {
            console.log("Saved");
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
                multiline={true}
                numberOfLines={20}
                style={{ fontSize: 16, textAlignVertical: 'top', padding: 10 }}
                onChangeText={(e) => setNoteDescription(e)}
                value={description}/>
        </View>

        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Splits')}>
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
        padding: 10,
    },

    inputViewBig: {
        maxHeight: 300,
        backgroundColor: "white",
        marginBottom: 10,
        marginVertical: 20,
        marginHorizontal: 10,
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
