import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

function MenuScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
            <FlatList data={[{name: 'SITTING ASANAS', image:require('../TemplateDiploma/meditate.png')}, 
                            {name: 'STANDING ASANAS', image: require('../TemplateDiploma/halfcamel.png')},
                            {name: 'LAYING ASANAS', image: require('../TemplateDiploma/legstretch3.png')},
                            {name: 'INVERSIONS', image:require('../TemplateDiploma/crow.png')},
                            {name: 'FOLDS', image:require('../TemplateDiploma/legstretch1.png')},
                            {name: 'TWISTS', image:require('../TemplateDiploma/splitoneleg.png')},
                            {name: 'BEGINNER', image:require('../TemplateDiploma/legstretch2.png')},
                            {name: 'INTERMEDIATE', image:require('../TemplateDiploma/path35522.png')},
                            {name: 'MASTER', image:require('../TemplateDiploma/split.png')},
                            {name: 'LEARNED ASANAS', image:require('../TemplateDiploma/path35490.png')}
                        ]} 
            renderItem={({item}) =>
            
            <View style={styles.container}>
                <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Asanas')}>
                    <Image style={styles.asanaImage}
                        source={ item.image }
                    />
                    <Text style={styles.text}>{ item.name }</Text>
                </TouchableOpacity>
            </View>}
            numColumns={2} 
            keyExtractor={(item, index) => index.toString()}
            />
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

  asanaImage: {
    width: 100, 
    height: 100,
    aspectRatio: 1, 
    resizeMode: 'contain',
    },

  text: {
    color: "#034947",
    fontWeight: "bold",
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
});
