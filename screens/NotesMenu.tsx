import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';

const NotesMenu = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const notes = getNotes();
    console.log(notes);
  },[]);

  const getNotes = async () => {
    ClientApi.getNotes().then((res) => {
      setNotes(res);
   });
  }

  return (
    <ScrollView>
        {notes.map((notes, index) => {
            return (
                <SafeAreaView style={{flex: 1}}>
                    <FlatList data={[notes]}
                    renderItem={({item}) =>
                        <View style={styles.container}>
                            <TouchableOpacity style={{ alignItems:"center" }}>
                                <Text style={styles.text}>{ item.name }</Text>
                            </TouchableOpacity>
                        </View>}
                    numColumns={2} 
                    keyExtractor={(item, index) => index.toString()}
                    />
                </SafeAreaView>
            )
        })}
    </ScrollView>
  );
}

export default NotesMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  asanaImage: {
    width: 100, 
    height: 100,
    aspectRatio: 1, 
    resizeMode: 'contain',
    },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },

  backBtn: {
    width: "30%",
    backgroundColor: "#034947",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center"
  },

  textBtn: {
    color: "#edf4ef"
  },
});
