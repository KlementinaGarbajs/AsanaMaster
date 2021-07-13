import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Card from "../../components/Card";

const OnBoardingOne = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
          <Text style={styles.logo}>What is Yoga?</Text>
          <Text style={styles.text}>
              Yoga is an art, a science and a philosophy. 
              It touches the life of man at every level, physical, mental, and spiritual. 
              It is a practical method for making one’s life purposeful, useful and noble.
              Yoga can be practiced by adults of any age or physical condition, just listen to your body.
          </Text>
      </Card>
      <Icon
      name={"arrow-right"}
      size={30}
      color="white"
      onPress={() => navigation.navigate('About')}
    />
  </View>
  );
}

export default OnBoardingOne;

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