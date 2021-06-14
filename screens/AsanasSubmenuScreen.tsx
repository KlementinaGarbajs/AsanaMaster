import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';

const AsanasSubmenu = ({route}: {route: any}) => {
  const navigation = useNavigation();
  navigation.setOptions({ title: route.params.paramKey.name + " ASANAS" });
  const [asanas, setAsanas] = useState<any[]>([]);
  let [level, setLevel] = useState<number>();

  useEffect(() => {
    ClientApi.getAsanas().then((res) => {
      setAsanas(res);
    });
    
    if (route.params.paramKey.name === "BEGINNER") {
        setLevel(0);
    } else if (route.params.paramKey.name === "INTERMEDIATE") {
        setLevel(1);
    } else if (route.params.paramKey.name === "MASTER") {
        setLevel(2);
    }
  },[]);

  return (
    <ScrollView>
      {asanas.map((asanas, index) => {
        if (asanas.level === level) {
          return (
            <SafeAreaView key={index}>
                <FlatList data={[asanas]}
                  renderItem={({item}) =>
                    <View style={styles.container} key={item.id}>
                        <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Asana Details', { paramKey: item })}>
                          <Image style={styles.asanaImage} source={{uri: require(`../Asanas/${item.image}`)}} />
                          <Text style={styles.text}>{ item.name }</Text>
                        </TouchableOpacity>
                    </View>}

                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
          )
        }
      })}
    </ScrollView>
  );
}

export default AsanasSubmenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: StatusBar.currentHeight,
  },

  asanaImage: {
    width: 100, 
    height: 100,
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
