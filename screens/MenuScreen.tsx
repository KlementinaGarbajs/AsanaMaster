import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image, View, ImageBackground, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

function MenuScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.logo}>Yogi on a journey</Text>


        <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('AsanasMenu')}>
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

        <TouchableOpacity style={{ alignItems:"center" }}>
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

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')} >
          <Text style={styles.textBtn}>Back</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#034947"
    },

  logoImage: {
    flex: 1,
    width: 220, 
    height: 220,
    marginTop: 70,
    borderRadius: 220 / 2,
    borderWidth: 2,
    borderColor: "#034947",
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
    marginBottom: 10
  },

  textBtn: {
    color: "#edf4ef"
  },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },
});
