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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.renderRow = this.renderRow.bind(this);

    this.state = {
      isLoading: true,
      dataSource: [],
      title0: '',
      title1: '',
      title2: '',
    }
  }

  componentDidMount() {
    //return fetch('https://facebook.github.io/react-native/movies.json')
    return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((responseJson) => {

        var titles = [];
        var icons = [];
        var excs = [];

        for(var i = 0; i < responseJson.length; i++) {
          titles.push(responseJson[i].title.rendered);
          icons.push(responseJson[i].featured_image_urls.thumbnail);
          excs.push(responseJson[i].excerpt.rendered);
        }

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          titles: titles,
          icons: icons,
          excerpts: excs,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  renderRow(post) {
    let newspost = {
        postId: post.id,
        postDate: post.date,
        postLink: post.guid.rendered,
        postTitle: post.title.rendered,
        postExcerpt: post.excerpt.rendered,
        postContent: post.content.rendered,
        postCategory: post.categories,
    }
    return (
      <Row style={styles.newsItemBox}>
        <View style={styles.newsItemHighlight}>
          <Subtitle style={styles.newsTitles}
            numberOfLines={2}
            newspost={newspost}
            onPress={() => this.viewNews(newspost)}>
            {this.unescapeHTML(post.title.rendered.toUpperCase())}
          </Subtitle>
        </View>
      </Row>
    );
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

                  <View style={styles.articleContainer}>
                    <View style={styles.shadow}>
                      <Image source={{uri: this.state.icons[0]}} style={styles.articleIcon}/>
                    </View>
                    <View style={styles.articleSubContainer}>
                      <Text style={styles.articleTitle}>{toTitleCase(this.state.titles[0])}</Text>
                      <Text style={styles.articlePreview}>
                        {unescapeHTML(this.state.excerpts[0])}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.articleContainer}>
                    <View style={styles.shadow}>
                      <Image source={{uri: this.state.icons[1]}} style={styles.articleIcon}/>
                    </View>
                    <View style={styles.articleSubContainer}>
                      <Text style={styles.articleTitle}>{toTitleCase(this.state.titles[1])}</Text>
                      <Text style={styles.articlePreview}>
                        {unescapeHTML(this.state.excerpts[1])}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.articleContainer}>
                    <View style={styles.shadow}>
                      <Image source={{uri: this.state.icons[2]}} style={styles.articleIcon}/>
                    </View>
                    <View style={styles.articleSubContainer}>
                      <Text style={styles.articleTitle}>{toTitleCase(this.state.titles[2])}</Text>
                      <Text style={styles.articlePreview}>
                        {unescapeHTML(this.state.excerpts[2])}
                      </Text>
                    </View>
                  </View>

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
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return unescapeHTML(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  );
}

function unescapeHTML(str) {//modified from underscore.string and string.js
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
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
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
    marginTop: 8,
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
    marginTop: 12,
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
