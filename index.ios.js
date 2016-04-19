/**
 * GameList test app
 */

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  Component,
  View,
  ToolbarAndroid,
  StyleSheet
} = React;
var ListScreen = require('./ListScreen');

class GameList extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Awesome Games',
          component: ListScreen
        }} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

AppRegistry.registerComponent('GameList', () => GameList);
