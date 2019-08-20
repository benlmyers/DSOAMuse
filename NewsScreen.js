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

class NewsScreen extends React.Component {

  /*constructor(props){
    super(props);

    this.load = this.load.bind(this);

    this.state = {
      isLoading: true,
      dataSource: [],
      titles: [],
      fadeAnim: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
    }
  }

  componentDidMount() {
    this.load(1);
  }

  load(post) {
    return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts?context=embed&per_page=1&page=' + post + '')
      .then((response) => response.json())
      .then((responseJson) => {

        this.state.fadeAnim.push(new Animated.Value(0));

        if(this.state.fadeAnim[post - 1]._value == 0) {
          Animated.timing(
            this.state.fadeAnim[post - 1],
            {
              toValue: 1,
              duration: 1000,
            }
          ).start();
        }

        for(var i = 0; i < responseJson.length; i++) {
          map.push([
            responseJson[i].title.rendered,
            responseJson[i].featured_image_urls.thumbnail,
            responseJson[i].excerpt.rendered,
            responseJson[i].date,
          ]);
        }

        var mapped = map.map((art) =>
          <Animated.View style={{opacity: this.state.fadeAnim[2]}}>
            <View style={styles.articleContainer}>
            <View>
              <View style={styles.shadow}>
                <Image source={{uri: art[1]}} style={styles.articleIcon}/>
              </View>
              <Text style={{textAlign: 'center', fontSize: 9, fontWeight: '600', color: 'gray', marginTop: 10}}>{simpleDate(art[3])}</Text>
            </View>
              <View style={styles.articleSubContainer}>
                <Text style={styles.articleTitle}>{toTitleCase(art[0])}</Text>
                <Text style={styles.articlePreview}>
                  {unescapeHTML(art[2])}
                </Text>
              </View>
            </View>
          </Animated.View>
        )

        mapped.shift();

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          views: mapped,
        }, function(){

        if(post == 20) {

        } else {

          this.load(post + 1);

        }

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }*/

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

          </SafeAreaView>
        </Fragment>
    );
  }

}
