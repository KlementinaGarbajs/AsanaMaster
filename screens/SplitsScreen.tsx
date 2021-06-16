import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import { StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Card from "../components/Card";
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';

function SplitsScreen() {

  let [visible, setVisible] = useState<boolean>(false);
  const images = [{
    url: require('../TemplateDiploma/splitprogress1.jpg'),
 
    props: {
        // headers: ...
    }
  }, {
    url: require('../TemplateDiploma/splitprogress2.jpg'),
    props: {
        // Or you can set source directory.
    }
  }]

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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
          defaultRating={10}
          size={16} />
      </Card>
  </View>
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
