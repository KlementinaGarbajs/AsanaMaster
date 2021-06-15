import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

function InversionsScreen() {
  
  return (
  <View style={styles.container}>
    <Text style={styles.logo}>Yogi on a journey</Text>
  </View>
  );
}

export default InversionsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center'
  },

  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#034947",
    alignSelf: "center"
  },
});
