import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { StyleSheet } from 'react-native';

function MenuScreen() {
  const navigation = useNavigation();
  return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
        <View style={styles.container}>

          <Text style={styles.logo}>Yogi on a journey</Text>

          <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Asanas')}>
              <Image style={styles.logoImage}
                  source={require('../TemplateDiploma/crow.png')} 
                />
                <Text style={styles.text}>ASANAS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems:"center" }}>
            <Image style={styles.logoImage}
                source={require('../TemplateDiploma/goals.png')}
              />
              <Text style={styles.text}>GOALS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('NotesMenu')}>
            <Image style={styles.logoImage}
                source={require('../TemplateDiploma/writing.png')}
              />
              <Text style={styles.text}>NOTES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems:"center" }}>
            <Image style={styles.logoImage}
                source={require('../TemplateDiploma/quiz.png')}
              />
              <Text style={styles.text}>QUIZ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#034947",
    alignSelf: "center"
    },

  logoImage: {
    flex: 1,
    width: 220, 
    height: 220,
    marginTop: 70,
    opacity: 0.8,
    aspectRatio: 1, 
    resizeMode: 'contain',
    },

  backBtn: {
    width: "30%",
    backgroundColor: "#034947",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center"
  },

  textBtn: {
    color: "#edf4ef"
  },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },
});
