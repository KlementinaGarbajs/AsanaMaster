import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView, Image, View, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

function MenuScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerRight: () => 
    <View style={{padding: 10, flexDirection: "row"}}>
      <Icon
        name={"logout"}
        size={30}
        color="rgba(28, 28, 28, 0.8)"
        onPress={() => navigation.navigate('Login')}
      />
    </View>, title: null, headerLeft: null});
  },[]);

  const cards = [
    { name: 'ASANAS', navigate: 'Asanas', image: require('../TemplateDiploma/crow.png') },
    { name: 'GOALS', navigate: 'Goals', image: require('../TemplateDiploma/goals.png') },
    { name: 'NOTES', navigate: 'Notes', image: require('../TemplateDiploma/writing.png') }
  ]

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  
  return (
  <View style={styles.container}>
    <Text style={styles.logo}>Yogi on a journey</Text>
      <ScrollView horizontal={true} contentContainerStyle={{paddingVertical: 50}}>
        {cards.map((card, index) => {
          return (
          <TouchableOpacity key={index} style={{ alignItems:"center" }} onPress={() => navigation.navigate(card.navigate)}>
                <Image style={styles.logoImage}
                  source={card.image} 
                />
                <Text style={styles.text}>{card.name}</Text>
          </TouchableOpacity>
          )
      })}
    </ScrollView>
  </View>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignContent: 'center'
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
    width: 220, 
    height: 220,
    marginTop: 100,
    marginHorizontal: 70,
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
