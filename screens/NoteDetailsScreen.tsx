import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import Moment from 'moment';
import { Icon } from 'react-native-elements';

const NoteDetailsScreen = ({route}: {route: any}) => {
  const navigation = useNavigation();

  useEffect(() => {
        navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
        name={"home"}
        size={30}
        color="rgba(28, 28, 28, 0.8)"
        onPress={() => navigation.navigate('Menu')}
    /></View>, title: null, headerLeft: null});
    },[]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.paramKey.name });
  },[]);

  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
        navigation.navigate('Notes');
        return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
    );

  return (
    <SafeAreaView style={{flex: 1}}>
        <Text style={styles.logo}>{route.params.paramKey.name}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textBold}>Date:</Text>
            <Text style={styles.text}>{Moment(route.params.paramKey.updated_at).format('D MMM')}</Text>
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
