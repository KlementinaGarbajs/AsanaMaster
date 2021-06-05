import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import ClientApi from '../api';

const AsanasSubmenu = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const [asanas, setAsanas] = useState<any[]>([]);
  let [level, setLevel] = useState<number>();

  useEffect(() => {
    const asanas = getAsanas();
    
    if (route.params.paramKey === "BEGINNER") {
        setLevel(0);
    } else if (route.params.paramKey === "INTERMEDIATE") {
        setLevel(1);
    } else if (route.params.paramKey === "MASTER") {
        setLevel(2);
    }
  },[]);

  const getAsanas = async () => {
    ClientApi.getAsanas().then((res) => {
      setAsanas(res);
   });
  }

  return (
    <ScrollView>
        {asanas.map((asanas, index) => {
            if (asanas.level === level) {
                return (
                    <SafeAreaView style={{flex: 1}}>
                        <FlatList data={[asanas]}
                        renderItem={({item}) =>
                            <View style={styles.container}>
                                <TouchableOpacity style={{ alignItems:"center" }}>
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
