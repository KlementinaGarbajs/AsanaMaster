import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, FlatList, BackHandler, CheckBox} from 'react-native';
import { StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Card from "../components/Card";
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ClientApi from '../api';
import * as ImagePicker from 'expo-image-picker';

function SplitsScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [allImages, setImages] = useState<any[]>([]);
  let [visible, setVisible] = useState<boolean>(false);

  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  let [id, setId] = useState<number>();
  const [isSelected, setSelection] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  let componentMounted = true; 

  useEffect(() => {
      navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
      name={"home"}
      size={30}
      color="rgba(28, 28, 28, 0.8)"
      onPress={() => navigation.navigate('Menu')}
  /></View>, title: "Splits", headerLeft: null});
  },[]);

  useEffect(() => {
    ClientApi.getRatings().then((res) => {
      if (componentMounted){ 
        if (res[0] !== undefined) {
          setRating(res[0].rating);
        } else {
          setRating(0);
        }
      }
   });
   return () => { 
     componentMounted = false; 
   }
  },[rating]);

  useEffect(() => {
    const values = {
        rating: ratingCount,
        user_id: id
    }

    if (rating != ratingCount) {
      ClientApi.saveRatingSplits(values).then(() => {
        setRating(ratingCount);
        console.log("Saved");
      });
    };
  },[ratingCount]);

  useEffect(() => {
    ClientApi.getImages().then((res) => {
      if (componentMounted){ 
        setImages(res);
      };
    });
    return () => { 
      componentMounted = false; 
    }
  },[image]);

  useEffect(() => {
    ClientApi.getID().then((res) => {
      setId(res[0].id);
    });
  },[]);

  useEffect(() => {
    ClientApi.getNotesSplits().then((res) => {
      if (componentMounted){ 
        setNotes(res);
        }
      });
      return () => { 
        componentMounted = false; 
      }  
    },[notes]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Goals');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      saveImage(result.uri);
    }
  };

  const saveImage =  async (url: string) => {
    const values = {
        url: url,
        user_id: id,
        goal: "splits"
    }

    ClientApi.saveImage(values).then(() => {
      console.log("Saved");
    });
  };

  const images: { url: any, goal: any}[] | undefined = [];

  allImages.forEach(element => {
    if(element.goal === "splits") {
      images.push({url: element.url, goal: element.goal});
    }
  });

  return (
    <ScrollView>
    <View style={styles.container}>
      <Card title="Start your journey" containerStyle={styles.card}>
        <ScrollView style={{ height: 300 }}>
          <FlatList data={[
                          {id: 1, link: "7__5szNyObA"},
                          /*{id: 2, link: "tSYtyL4aLzI"},
                          {id: 3, link: "snso8Drg_PQ"},
                          
                          {id: 4, link: "BJKk3Jd"},
                          {id: 5, link: "9TiVGK24DeY"},
                          {id: 6, link: "Pf4KTaEs"},
                          {id: 7, link: "TQGzwetU_QU"},*/
                      ]} 
          renderItem={({item}) =>
          <View style={{paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10}}>
              <Text style={styles.logo}>DAY {item.id}</Text>

              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={{ marginLeft: 10 }}
              />
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate('New Note Goals')}>
              <Icon name='notes' size={30} style={{ padding: 10 }} color='rgba(6, 152, 111, 0.8)' />
            </TouchableOpacity>
            </View>
  
            <YoutubePlayer
                height={120}
                width={240}
                videoId={item.link}
            />
          </View>}
          keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </Card>

      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={pickImage}>
        <Text style={styles.title}>Upload your progress photos!</Text>
        <Icon name='camera' size={30} style={{ padding: 5 }} color='rgba(6, 152, 111, 0.8)' />
      </TouchableOpacity>

      <Card containerStyle={styles.card}>
        <ScrollView style={{ flexDirection: "row" }} horizontal={true}>
          {images.map((item, key) => {
          if(item.goal === "splits") return (<TouchableOpacity key={key} onPress={() => setVisible(true)}>
              <Image style={styles.logoImage} source={{uri: item.url}} />
            </TouchableOpacity>
          )})}
        </ScrollView>
        <Modal visible={visible} transparent={true}>
          <ImageViewer onDoubleClick={() => setVisible(false)} imageUrls={images}/>
        </Modal>
      </Card>

      <Card title="Progress notes" containerStyle={styles.card}>
      {notes.map((notes, index) => {
        return (
          <View key={index}>
            <FlatList nestedScrollEnabled={true} data={[notes]}
              renderItem={({item}) =>
                <View style={styles.container} key={item.id}>
                  <TouchableOpacity style={{ flexDirection: "column" }} onPress={() => navigation.navigate('Note Details', { paramKey: item })}>
                      <Text style={styles.text}>{ item.name }</Text>
                  </TouchableOpacity>
                </View>
                }
              numColumns={2} 
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      })}
      </Card>

      <Card title="Rate your progress" containerStyle={styles.card}>
        <AirbnbRating 
          count={10}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Very Good", "Wow", "Amazing", "Unbelievable", "Done!"]}
          selectedColor={"#034947"}
          reviewColor={"rgba(4, 98, 89, 0.5)"}
          defaultRating={rating}
          onFinishRating={rating => setRatingCount(rating)}
          size={16} />
      </Card>
  </View>
  </ScrollView>
  );
}

export default SplitsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },

  logo: {
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#034947",
  },

  title: {
    fontSize: 18,
    color: '#034947',
  },

  logoImage: {
    width: 50, 
    height: 50,
    marginLeft: 20,
    opacity: 0.8,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },

  text: {
    fontSize: 18,
    padding: 10,
},

  card: {
    alignSelf: "center",
    width: "90%",
    marginBottom: 10
  }
});
