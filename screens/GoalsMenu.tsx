import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { StyleSheet } from 'react-native';

function GoalsMenu() {
  const navigation = useNavigation();

  const progress = [
    { name: 'SPLITS', navigate: 'Splits', image: require('../Asanas/thelowlunge.png') },
    { name: 'BACKBENDS', navigate: 'Backbends', image: require('../Asanas/thecamel.png') },
    { name: 'INVERSIONS', navigate: 'Inversions', image: require('../Asanas/forearmstand.png') },
  ]

  return (
  <View style={styles.container}>
    <Text style={styles.logo}>What to improve next?</Text>
      <ScrollView contentContainerStyle={{paddingVertical: 10}}>
        {progress.map((p, index) => {
          return (
          <TouchableOpacity key={index} style={{ alignItems:"center", paddingVertical: 20 }} onPress={() => navigation.navigate(p.navigate)}>
              <Image style={styles.logoImage}
                  source={p.image} 
                />
                <Text style={styles.text}>{p.name}</Text>
          </TouchableOpacity>
          )
      })}
    </ScrollView>
  </View>
  );
}

export default GoalsMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    padding: 10,
    fontSize: 30,
    color: "#034947",
    alignSelf: "center"
  },

  logoImage: {
    flex: 1,
    width: 220, 
    height: 220,
    marginHorizontal: 50,
    opacity: 0.8,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },

  textBtn: {
    color: "#edf4ef"
  },

  text: {
    color: "#034947",
    fontWeight: "bold",
  }
});
