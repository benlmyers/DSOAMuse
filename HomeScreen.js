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

var map = [[]];

export default class HomeScreen extends React.Component {

  constructor(props){
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
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.body}>
                <View style={styles.headerContainer}>
                  <Image source={theMuse} style={{width: 150, height: 60}}/>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Latest</Text>

                  {this.state.views}

                </View>
              </View>
              <View style={styles.footer}/>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
    );
  }
};

function toTitleCase(str) {
  if(str == '' || str == null) {
    return;
  }
  str = str.replace("&#8220;", '"')
  str = str.replace("&#8216;", "'")
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return unescapeHTML(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  );
}

function unescapeHTML(str) {

  if(str == '' || str == null) {
    return;
  }
  var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
  str = str.replace(/<\/?[^>]+(>|$)/g, "");
  str = str.replace("&nbsp; ", "");
  return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
    var match;

    if ( entityCode in escapeChars) {
      return escapeChars[entityCode];
    } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    } else if ( match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
}

function simpleDate(str) {
  if(str == '' || str == null) {
    return;
  }
  var month = str.slice(5, 7);
  switch(month) {
    case "01": month = "JAN"; break;
    case "02": month = "FEB"; break;
    case "03": month = "MAR"; break;
    case "04": month = "APR"; break;
    case "05": month = "MAY"; break;
    case "06": month = "JUN"; break;
    case "07": month = "JUL"; break;
    case "08": month = "AUG"; break;
    case "09": month = "SEP"; break;
    case "10": month = "OCT"; break;
    case "11": month = "NOV"; break;
    case "12": month = "DEC"; break;
  }

  var day = str.slice(8, 10);

  return month + " " + parseInt(day);
}

const testArticleIcon = {
  uri: 'https://www.themuseatdreyfoos.com/wp-content/uploads/2019/06/Screen-Shot-2019-06-01-at-8.17.59-PM-70x70.png'
};

const theMuse = {
  uri: 'https://www.themuseatdreyfoos.com/wp-content/uploads/2019/07/IMG_1267.png'
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
    	width: 0.0,
    	height: 2.8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,
    elevation: 15,
  },
  categoryIcon: {
    width: 13,
    height: 13,
    marginTop: 20,
    alignItems: 'center',
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 18,
  },
  headerContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  articleContainer: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  articleSubContainer: {
    padding: 2,
    marginLeft: 7,
    flex: 1,
  },
  articleIcon: {
    width: 55,
    height: 55,
    marginTop: 6,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  articlePreview: {
    //marginTop: 2,
    fontSize: 12,
    fontWeight: '300',
    color: Colors.dark,
  },
  footer: {
    backgroundColor: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    padding: 40,
    paddingRight: 12,
    textAlign: 'right',
  },
});
