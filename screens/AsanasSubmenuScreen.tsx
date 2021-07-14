import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';import { LogBox } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

const AsanasSubmenu = ({route}: {route: any}) => {
  const navigation = useNavigation();

  const [asanas, setAsanas] = useState<any[]>([]);
  let [level, setLevel] = useState<number>();
  let text = route.params.paramKey.name;

  useEffect(() => {
    ClientApi.getAsanas().then((res) => {
      setAsanas(res);
    });
  },[]);

  useEffect(() => {
      navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
      name={"home"}
      size={30}
      color="rgba(28, 28, 28, 0.8)"
      onPress={() => navigation.navigate('Menu')}
  /></View>, title: text.slice(0, 1) + text.slice(1,text.length).toLowerCase() + " asanas", headerLeft: null});
  },[]);

  useEffect(() => {
    if (route.params.paramKey.name === "BEGINNER") {
        setLevel(0);
    } else if (route.params.paramKey.name === "INTERMEDIATE") {
        setLevel(1);
    } else if (route.params.paramKey.name === "MASTER") {
        setLevel(2);
    }
  },[]);

  return (
        asanas.map((asanas, index) => {
          if (asanas.level === level) {
            return (
              <SafeAreaView key={index} >
                <ScrollView>
                <FlatList data={[asanas]}
                  renderItem={({item}) =>
                    <View style={styles.container} key={item.id}>
                      <TouchableOpacity style={{ alignItems:"center" }} onPress={() => navigation.navigate('Asana Details', { paramKey: item })}>
                        <Image style={styles.asanaImage} source={require('../Asanas/thecrow.png')} />
                        <Text style={styles.text}>{ item.name }</Text>
                      </TouchableOpacity>
                    </View>}

                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
                </ScrollView>
              </SafeAreaView>
            )
          }
        })
  );
}

export default AsanasSubmenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  asanaImage: {
    flex: 1,
    width: 100, 
    height: 100
    },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },
  
  textBtn: {
    color: "#edf4ef"
  },
});
