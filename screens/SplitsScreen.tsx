import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, FlatList} from 'react-native';
import { StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Card from "../components/Card";
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ClientApi from '../api';
import * as ImagePicker from 'expo-image-picker';

function SplitsScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState<number>();
  const [image, setImage] = useState("");
  const [allImages, setImages] = useState<any[]>([]);

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
      setRating(res[0].rating);
   });
  },[]);

  useEffect(() => {
      const values = {
          rating: rating
      }

      ClientApi.saveRatingSplits(values).then(() => {
          console.log("Saved");
      });
  },[rating]);

  useEffect(() => {
    const values = {
        url: image,
        user_id: 6
    }

    ClientApi.saveImage(values).then(() => {
        console.log("Saved");
      });
    },[image]);

  useEffect(() => {
    ClientApi.getImages().then((res) => {
      setImages(res);
      console.log(allImages);
    });
  },[allImages]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let [visible, setVisible] = useState<boolean>(false);
  const images = [{
    url: require('../TemplateDiploma/splitprogress1.jpg'),
 
  }, {
    url: require('../TemplateDiploma/splitprogress2.jpg'),
  }]

  return (
    <ScrollView>
    <View style={styles.container}>
      <Card title="Start your journey" containerStyle={styles.card}>
        <ScrollView style={{ height: 350 }}>
          <FlatList data={[
                          {id: 1, link: "7__5szNyObA"},
                          {id: 2, link: "tSYtyL4aLzI"},
                          /*{id: 3, link: "snso8Drg_PQ"},
                          {id: 4, link: "BJKk3Jd"},
                          {id: 5, link: "9TiVGK24DeY"},
                          {id: 6, link: "Pf4KTaEs"},
                          {id: 7, link: "TQGzwetU_QU"},*/
                      ]} 
          renderItem={({item}) =>
          <View style={{paddingHorizontal: 10 }}>
            <Text style={styles.logo}>DAY {item.id}</Text>
            <YoutubePlayer
                height={150}
                width={260}
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image style={styles.logoImage} source={require('../TemplateDiploma/splitprogress1.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image style={styles.logoImage} source={require('../TemplateDiploma/splitprogress2.jpg')} />
          </TouchableOpacity>
          <Modal visible={visible} transparent={true}>
              <ImageViewer onDoubleClick={() => setVisible(false)} imageUrls={images}/>
            </Modal>
        </View>
      </Card>

      <Card title="RATE YOUR PROGRESS" containerStyle={styles.card}>
        <AirbnbRating 
          count={10}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Very Good", "Wow", "Amazing", "Unbelievable", "Done!"]}
          selectedColor={"#034947"}
          reviewColor={"rgba(4, 98, 89, 0.5)"}
          defaultRating={rating}
          onFinishRating={setRating}
          size={16} />
      </Card>
  </View>
  </ScrollView>
  );
}

export default SplitsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },

  logo: {
    marginTop: 10,
    paddingVertical: 10,
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
    width: "80%",
    marginBottom: 20
  }
});
