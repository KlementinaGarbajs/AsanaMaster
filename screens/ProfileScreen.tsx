import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import ClientApi from '../api';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState('');

  useEffect(() => {
      navigation.setOptions({ headerRight: () => <View style={{padding: 10}}>
        <Icon
          name={"logout"}
          size={30}
          color="rgba(28, 28, 28, 0.8)"
          onPress={() => navigation.navigate('Login')}
      /></View>, title: "Profile", headerLeft: null});
  },[]);

  useEffect(() => {
    ClientApi.getUser().then((res) => {
      setUser(res);
   });
  },[]);

  console.log(user);
  
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage}
        source={require('../TemplateDiploma/path35490.png')}
      />
      <Text style={styles.logo}>{user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#034947",
    marginBottom: 10
  },
  logoImage: {
    width: 200, 
    height: 200,
    marginTop: 50
  },
});
