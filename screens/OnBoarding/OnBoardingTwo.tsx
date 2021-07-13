import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Card from "../../components/Card";

const OnBoardingTwo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Card containerStyle={styles.card}>
        <Text style={styles.logo}>What is Asana Master?</Text>
        <Text style={styles.text}>
          Your mind, emotions, and body are tightly intertwined, 
          that's why we developed application with which you will{'\n'}{'\n'}
          <Icon name={"circle"} size={10} color="#034947"/> learn more about yoga{'\n'}
          <Icon name={"circle"} size={10} color="#034947"/> learn new asanas{'\n'}
          <Icon name={"circle"} size={10} color="#034947"/> improve your flexibility{'\n'}
          <Icon name={"circle"} size={10} color="#034947"/> track your progress{'\n'}
          <Icon name={"circle"} size={10} color="#034947"/> express your feelings
        </Text>
    </Card>
    <View style={{ flexDirection: "row" }}>
      <Icon
        name={"arrow-left"}
        size={30}
        color="white"
        onPress={() => navigation.navigate('About Yoga')}
      />
      <Icon
        name={"arrow-right"}
        size={30}
        color="white"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  </View>
  )
}

export default OnBoardingTwo;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#034947"
    },

    logo: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#034947",
    marginBottom: 10
    },

    text: {
      padding: 8,
      fontSize: 20,
      color: "#034947",
    },
  
    card: {
      alignSelf: "center",
      alignItems: "center",
      height: 400,
      width: "80%",
      marginBottom: 20
    }
});