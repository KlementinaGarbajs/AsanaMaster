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

function InversionsScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState<number>();
  const [image, setImage] = useState("");
  const [allImages, setImages] = useState<any[]>([]);
  let [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
      navigation.setOptions({ headerRight: () => <View style={{padding: 10}}><Icon
      name={"home"}
      size={30}
      color="rgba(28, 28, 28, 0.8)"
      onPress={() => navigation.navigate('Menu')}
  /></View>, title: "Backbends", headerLeft: null});
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

      ClientApi.saveRatingBends(values).then(() => {
          console.log("Saved");
      });
  },[rating]);

  useEffect(() => {
    ClientApi.getImages().then((res) => {
      setImages(res);
    });
  },[image]);

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
      saveImage(result.uri);
    }
  };

  const saveImage =  async (url: string) => {
    const values = {
        url: url,
        user_id: 6,
        goal: "backbend"
    }

    ClientApi.saveImage(values).then(() => {
      console.log("Saved");
    });
  };

  const images: { url: any, goal: any}[] | undefined = [];

  allImages.forEach(element => {
    if(element.goal === "backbend") {
      images.push({url: element.url, goal: element.goal});
    }
  });

  return (
    <ScrollView>
    <View style={styles.container}>
      <Card title="Start your journey" containerStyle={styles.card}>
        <ScrollView style={{ height: 350 }}>
          <FlatList data={[
                          {id: 1, link: "apLz3GqW5Jg"},
                          {id: 2, link: "NN8AC7HdzRU"},
                          /*{id: 3, link: "H11YApLHDOA"},
                          {id: 4, link: "7oohbfR1ogE"},
                          {id: 5, link: "OC-93ssVRbw"},*/
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
        <ScrollView style={{ flexDirection: "row" }} horizontal={true}>
          {images.map((item, key) => {
          if(item.goal === "backbend") return (<TouchableOpacity key={key} onPress={() => setVisible(true)}>
              <Image style={styles.logoImage} source={{uri: item.url}} />
            </TouchableOpacity>
          )})}
        </ScrollView>
        <Modal visible={visible} transparent={true}>
            <ImageViewer onDoubleClick={() => setVisible(false)} imageUrls={images}/>
          </Modal>
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

export default InversionsScreen;

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
