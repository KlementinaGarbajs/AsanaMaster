import { useNavigation, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

function MenuScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}  >
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  loginBtn: {
    width: "30%",
    backgroundColor: "#034947",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  loginText: {
    color: "#edf4ef"
  },
});
