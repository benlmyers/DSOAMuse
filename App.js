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
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

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

                  <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={({id}, index) => id}
                  />

                  <View style={styles.articleContainer}>
                    <Image source={testArticleIcon} style={styles.articleIcon}/>
                      <View style={styles.articleSubContainer}>
                        <Text style={styles.articleTitle}>Article Name</Text>
                        <Text style={styles.articlePreview}>
                          This is the beginning of the article. It's a shortened version of the description. Let's read a bit more...
                        </Text>
                      </View>
                  </View>

                  <View style={styles.articleContainer}>
                    <Image source={testArticleIcon} style={styles.articleIcon}/>
                      <View style={styles.articleSubContainer}>
                        <Text style={styles.articleTitle}>Article Name 2</Text>
                        <Text style={styles.articlePreview}>
                          This is the beginning of a different article. It's a shortened version of the description. Let's read a bit more...
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

/*async function getTitlesFromAPI() {
  try {
    let response = await fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts');
    let arr = await response.json();
    let str = arr.getString();

    JSONArray jsonarray = new JSONArray(str);
    for (int i = 0; i < jsonarray.length(); i++) {
        JSONObject jsonobject = jsonarray.getJSONObject(i);
        String name = jsonobject.getString("name");
        String url = jsonobject.getString("url");
    }

  } catch (error) {
    console.error(error);
  }
}*/

const testArticleIcon = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
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
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  articlePreview: {
    //marginTop: 2,
    fontSize: 14,
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
