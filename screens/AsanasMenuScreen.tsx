import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

function AsanasMenuScreen() {
  const navigation = useNavigation();

  useEffect(() => {
      navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
      name={"home"}
      size={30}
      color="rgba(28, 28, 28, 0.8)"
      onPress={() => navigation.navigate('Menu')}
  /></View>, title: "Asanas", headerLeft: null});
  },[]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList data={[
          {id: 1, name: 'BEGINNER', image: require('../TemplateDiploma/legstretch2.png')},
          {id: 2, name: 'INTERMEDIATE', image: require('../TemplateDiploma/path35522.png')},
          {id: 3, name: 'MASTER', image: require('../TemplateDiploma/split.png')},
      ]} 
      renderItem={({item}) =>
      
        <View style={styles.container} key={item.id}>
            <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Asanas Submenu', { paramKey: item })}>
                <Image style={styles.asanaImage}
                    source={ item.image }
                />
                <Text style={styles.text}>{ item.name }</Text>
            </TouchableOpacity>
        </View>}
      keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default AsanasMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  asanaImage: {
    width: 150, 
    height: 150,
    aspectRatio: 1, 
    resizeMode: 'contain',
    },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },

  textBtn: {
    color: "#edf4ef"
  },
});
