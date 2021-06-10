import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const AsanaDetailsScreen = ({route}: {route: any}) => {
    const navigation = useNavigation();
    const [howTo, setHowTo] = useState(Array);

    useEffect(() => {
        const howTo = route.params.paramKey.how_to;
        const howToArray = howTo.split('*');

        setHowTo(howToArray);
    },[]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.logo}>{route.params.paramKey.name}</Text>
            <View style={{ paddingLeft: 10, flexDirection: 'row' }}>
                <Text style={styles.textBold}>Sanskrit name:</Text>
                <Text style={styles.text}>{route.params.paramKey.name_sanskrit}</Text>
            </View>
            
            <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                <Text style={styles.textBold}>Benefits:</Text>
                <Text style={styles.textDescription}>{route.params.paramKey.description}</Text>
            </View>

            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={styles.textBold}>How to?</Text>
                {howTo.map((how, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Text style={styles.textDescription}>
                                <Text style={styles.textBold}>{index+1}. </Text>
                                {how}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    );
}

export default AsanaDetailsScreen;

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
