/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Animated,
  Button,
  Dimensions,
} from 'react-native';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class NewsScreen extends React.Component {

  constructor(props){
    super(props);

    this.load = this.load.bind(this);

    this.state = {
      isLoading: true,
      dataSource: [],
      titles: [],
      fadeAnim: [new Animated.Value(0)],
    }
  }

  componentDidMount() {
    this.load(1);
  }

  load(post) {
    return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts?per_page=1&page=' + this.props.navigation.getParam('postNum', 8))
      .then((response) => response.json())
      .then((responseJson) => {

        Animated.timing(
          this.state.fadeAnim[0],
          {
            toValue: 1,
            duration: 1000,
          }
        ).start();

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          articleTitle: responseJson[0].title.rendered,
          articleBanner: responseJson[0].featured_image_urls.large,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

    const {navigate} = this.props.navigation;

    if(this.state.isLoading) {
      return (
        <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Text>Loading...</Text>
            </SafeAreaView>
          </Fragment>
      );
    }

    return (

      <Fragment>
          <StatusBar barStyle="dark-content">
          </StatusBar>
          <SafeAreaView>
            <View style={styles.bgImageWrapper}>
              <Image source={{uri: this.state.articleBanner}} style={styles.bgImage}/>
            </View>
            <Text>{this.state.articleTitle}</Text>
          </SafeAreaView>
        </Fragment>
    );
  }

}

const screenWidth = Math.round(Dimensions.get('window').width);

var styles = StyleSheet.create({
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    height: 250,
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },
});
