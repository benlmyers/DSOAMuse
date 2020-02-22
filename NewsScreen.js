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

import { WebView } from 'react-native-webview';
import { MyWebView } from 'react-native-webview-autoheight';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import { DrawerNavigator } from 'react-navigation';

const script = `<script>
	window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
	document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
</script>`;

export default class NewsScreen extends React.Component {

  constructor(props){
    super(props);

    this.load = this.load.bind(this);

    this.state = {
      isLoading: true,
      dataSource: [],
      titles: [],
      fadeAnim: [new Animated.Value(0), new Animated.Value(0)],
      textBox: "\n\n\n\n\n\n\n\n",
      Height: 0,
    }
  }

  onNavigationChange(event) {
    if (event.title) {
        const htmlHeight = Number(event.title) //convert to number
        this.setState({Height:htmlHeight});
    }

  }

  componentDidMount() {
    this.load(1);
  }

  load(post) {
    return fetch('https://www.themuseatdreyfoos.com/wp-json/wp/v2/posts?include[]=' + this.props.navigation.getParam('postNum', 10000))
      .then((response) => response.json())
      .then((responseJson) => {

        Animated.timing(
          this.state.fadeAnim[0],
          {
            toValue: 1,
            delay: 300,
            duration: 500,
          }
        ).start();

        Animated.timing(
          this.state.fadeAnim[1],
          {
            toValue: 1,
            delay: 600,
            duration: 1000,
          }
        ).start();

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          articleTitle: responseJson[0].title.rendered,
          articleBanner: responseJson[0].featured_image_urls.large,
          articleContent: modify(responseJson[0].content.rendered),
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
              <Text style={{textAlign: 'center', paddingTop: 50, ...Platform.select({ios: {fontWeight: '700',},android: {fontFamily: 'Roboto-Thin',},}),}}>GETTING YOUR ARTICLE</Text>
            </SafeAreaView>
          </Fragment>
      );
    }

    return (

      <Fragment>
          <StatusBar barStyle="dark-content">
          </StatusBar>
          <SafeAreaView>
            <ScrollView indicatorStyle={'black'} stickyHeaderIncices={[0]} showsVerticalScrollIndicator={false}>
              <Animated.View style={{opacity: this.state.fadeAnim[0]}}>
                <Animated.View style={{opacity: this.state.fadeAnim[1]}}>
                  <View style={styles.bgImageWrapper}>
                    <Image source={{uri: this.state.articleBanner}} style={styles.bgImage}/>
                  </View>
                </Animated.View>
                <Text style={styles.title}>{toTitleCase(this.state.articleTitle)}</Text>
                <WebView source={{html: this.state.articleContent + htmlStyle + script}}
                  startInLoadingState={true}
                  style={styles.content}
                  useWebKit={true}
                  scrollEnabled={true}
                  javascriptEnabled={true}
                  automaticallyAdjustContentInsets={false}
                  onNavigationStateChange={this.onNavigationChange.bind(this)}/>
              </Animated.View>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
    );
  }

}

function modify(str) {
  for(var i = 0; i < 100; i++) {
    return str.replace(/<div*?<\/div>/g, '');
  }
}

function toTitleCase(str) {
  if(str == '' || str == null) {
    return;
  }
  str = str.replace("&#8220;", '"');
  str = str.replace("&#8216;", "'");
  str = str.replace("&#8217;", "'");
  str = str.replace("&#038;", "&");
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

/*const RootDrawer = DrawerNavigator(
	{
		Home: {
			screen: NewsScreen,
		},
	},
	{
		// Custom rendering component of drawer panel
		//contentComponent: MainDrawer,
	}
);*/

const screenWidth = Math.round(Dimensions.get('window').width);

const htmlStyle = '\
<style> \
* { \
  font-size: 46px; \
  font-family: "system font"; \
} \
.Buttons { \
  display: none; \
} \
input { \
  display: none; \
} \
.wp-polls-loading { \
  display: none; \
} \
.slideshowwrap, .remodal-close { \
  display: none; \
} \
a { \
  text-decoration: none; \
  color: #000000; \
} \
img { \
  color: #444444; \
  font-size: 12px; \
  display: block; \
  max-width: 100%; \
  height: auto; \
} \
input { \
  width: 20px; \
  height: 20px; \
} \
span { \
    margin: 0; \
    padding: 0; \
    font-size: 46px; \
    font-family: "Benton Sans", "Helvetica Neue", helvetica, arial, sans-serif; \
} \
#height-calculator { \
    position: absolute; \
    top: 0; \
    left: 0; \
    right: 0; \
} \
</style> \
'

var styles = StyleSheet.create({
  bgImageWrapper: {
    top: 0, bottom: 0, left: 0, right: 0,
    height: 250,
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
    textAlign: 'center',
    padding: 20,
  },
  content: {
    padding: 10,
    margin: 15,
    fontSize: 14,
    //height: height,
    resizeMode: 'cover',
    flex: 1,
    //height: parseInt(window.getComputedStyle(this.state.textBox).fontSize, 10),
    height: 555,
    //fontFamily: 'system font'
  },
});
