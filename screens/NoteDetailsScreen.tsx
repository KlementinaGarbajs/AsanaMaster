import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import Moment from 'moment';
import { Icon } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const NoteDetailsScreen = ({route}: {route: any}) => {
  const navigation = useNavigation();
  navigation.setOptions({ title: route.params.paramKey.name });

  console.log(route.params.paramKey);
  return (
    <SafeAreaView style={{flex: 1}}>
        <Text style={styles.logo}>{route.params.paramKey.name}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textBold}>Date:</Text>
            <Text style={styles.text}>{Moment(route.params.paramKey.date).format('d MMM')}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>How do I feel today?</Text>
            <TouchableOpacity style={{ padding: 5 }}>
                <Icon name='emoji-emotions' size={30} color='rgba(6, 152, 111, 0.8)' />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }}>
                <Icon name='emoji-emotions' size={30} color='rgba(149, 152, 6, 0.8)' />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }}>
                <Icon name='emoji-emotions' size={30} color='rgba(152, 6, 6, 0.8)' />
            </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
            <Text style={styles.textDescription}>{route.params.paramKey.description}</Text>
        </View>
    </SafeAreaView>
  );
}

export default NoteDetailsScreen;

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

    logo: {
        fontSize: 30,
        padding: 10,
        color: "rgba(4, 98, 89, 0.8)",
    },

    text: {
        fontSize: 18,
        padding: 10,
    },

    textBold: {
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 10,
        paddingVertical: 10,
    },

    textDescription: {
        fontSize: 16,
        color: "rgba(28, 28, 28, 0.8)"
    },

    textBtn: {
        color: "#edf4ef"
    },
});
