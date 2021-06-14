import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';
import { Icon } from 'react-native-elements';

const NotesMenu = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    ClientApi.getNotes().then((res) => {
      setNotes(res);
   });
  },[]);

  return (
    <ScrollView contentContainerStyle={[{flex: 1, flexDirection: 'column'}]}>
        {notes.map((notes, index) => {
            return (
                <View key={index}>
                    <FlatList nestedScrollEnabled={true} data={[notes]}
                    renderItem={({item}) =>
                        <View style={styles.container} key={item.id}>
                            <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Note Details', { paramKey: item })}>
                                <Text style={styles.text}>{ item.name }</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    numColumns={2} 
                    keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.separator} />
                </View>
            )
        })}
        <TouchableOpacity onPress={() => navigation.navigate('New Note')}
            style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            backgroundColor: '#034947',
            borderRadius: 100,
            position: 'absolute',
            right: 20,
            bottom: 20
            }}
        >
            <Icon name='add' size={30} color='white' />
        </TouchableOpacity>
    </ScrollView>
  );
}

export default NotesMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    padding: 10,
    justifyContent: 'center',
    height: 50,
  },

  separator: {
    borderWidth: 0.5,
    borderColor: "rgba(4, 98, 89, 0.5)",
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
    fontSize: 16,
    alignSelf: 'flex-start'
  },

  textBtn: {
    color: "#edf4ef"
  },
});
