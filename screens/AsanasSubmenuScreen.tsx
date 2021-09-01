import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';import { LogBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { images } from '../assets/images/images';

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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Asanas');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

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
    <ScrollView>
        {asanas.map((asanas, index) => {
          if (asanas.level === level) {
            return (
                <FlatList key={index} data={[asanas]}
                  renderItem={({item}) =>
                    {
                      return <View style={styles.container} key={item.id}>
                              <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Asana Details', { paramKey: item })}>
                                <Image style={styles.asanaImage} source={(images[item.id])} />
                                <Text style={styles.text}>{item.name}</Text>
                              </TouchableOpacity>
                            </View>;
                      }}
                  numColumns={2}
                />
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
  },

  asanaImage: {
    width: 120,
    height: 120
  },

  text: {
    color: "#034947",
    fontWeight: "bold",
  },
  
  textBtn: {
    color: "#edf4ef"
  },
});
