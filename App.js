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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var map = [[]];

export default class App extends React.Component {

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
    return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts?per_page=1&page=' + post + '')
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
          ]);
        }

        var mapped = map.map((art) =>
          <Animated.View style={{opacity: this.state.fadeAnim[2]}}>
            <View style={styles.articleContainer}>
            <View>
              <View style={styles.shadow}>
                <Image source={{uri: art[1]}} style={styles.articleIcon}/>
              </View>
              <Image source={testCategoryIcon} style={styles.categoryIcon}/>
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

const testArticleIcon = {
  uri: 'https://www.themuseatdreyfoos.com/wp-content/uploads/2019/06/Screen-Shot-2019-06-01-at-8.17.59-PM-70x70.png'
};

const theMuse = {
  uri: 'https://www.themuseatdreyfoos.com/wp-content/uploads/2019/07/IMG_1267.png'
};

const testCategoryIcon = {
  uri: 'data:image/jpeg;base64,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'
}

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
