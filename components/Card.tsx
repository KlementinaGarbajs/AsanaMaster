import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

const Card = props => {
  const {
    children,
    containerStyle,
    wrapperStyle,
    title,
    titleStyle,
    titleNumberOfLines,
    image,
    ...attributes
  } = props;

  return (
    <View
      {...attributes}
      style={StyleSheet.flatten( [
        styles.container,
        containerStyle && containerStyle
      ] )}
    >
      <View
        style={StyleSheet.flatten( [
          styles.wrapper,
          wrapperStyle && wrapperStyle
        ] )}
      >
        {title === '' || React.isValidElement( title ) ?
          title :
          title &&
            title.length &&
              <View>
                <Text
                  testID="cardTitle"
                  style={StyleSheet.flatten( [
                    styles.cardTitle,
                    image && styles.imageCardTitle,
                    titleStyle && titleStyle
                  ] )}
                  numberOfLines={titleNumberOfLines}
                >
                  {title}
                </Text>
                <View
                    style={StyleSheet.flatten( [
                    styles.divider
                    ] )}
                ></View>
              </View>
            }
        {children}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    borderColor: 'rgba(4, 98, 89, 0.5)',
    ...Platform.select( {
      android: {
        elevation: 1
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    } )
  },
  featuredTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    ...Platform.select( {
      default: {
        fontWeight: '800'
      }
    } )
  },
  featuredSubtitle: {
    fontSize: 13,
    marginBottom: 8,
    color: 'white',
    ...Platform.select( {
      default: {
        fontWeight: '400'
      }
    } )
  },
  wrapper: {
    backgroundColor: 'transparent'
  },
  divider: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(4, 98, 89, 0.5)',
  },
  cardTitle: {
    fontSize: 18,
    color: '#034947',
    ...Platform.select( {
      default: {
        fontWeight: 'bold'
      }
    } ),
    textAlign: 'center',
    marginBottom: 15
  },
  imageCardTitle: {
    marginTop: 15
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default Card;