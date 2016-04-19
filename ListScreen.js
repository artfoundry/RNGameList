var React = require('react-native');
var {
  Component,
  Image,
  Platform,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
}  = React;

var GameInfo = require('./GameInfo');

var FILE_GAME_DATA = require('./games.json');
var THUMBS = {
  "Boom Beach": require("./images/BoomBeach_thumb.png"),
  "Clash of Clans": require("./images/CoC_thumb.png"),  
  "Clash of Kings": require("./images/CoK_thumb.png"),
  "Jurassic World": require("./images/JurassicWorld_thumb.png"),
  "Puzzles and Dragons": require("./images/PuzzlesAndDragons_thumb.png")
};

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: FILE_GAME_DATA,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  }

  _loadData() {
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.games);
    this.state.loaded = true;
  }

  _loadGame(game) {
    this.props.navigator.push({
      title: game.name,
      component: GameInfo,
      passProps: {game: game}
    });
  }

  render() {
    if (!this.state.games) {
      return this._renderLoadingView();
    }
    this._loadData();
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderGame.bind(this)}
        style={styles.listView} />
    );
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading games...</Text>
      </View>
    );
  }

  _renderGame(game) {
    var image = THUMBS[game.name];
    var TouchableElement = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight;
    
    return (
      <TouchableElement
        onPress={() => this._loadGame(game)}
        underlayColor='#CCC'>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image 
              source={image}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{game.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.arrow}> > </Text>
          </View>
        </View>
      </TouchableElement>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#FFF'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  leftContainer: {
    flex: 0,
    paddingLeft: 20
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 20
  },
  rightContainer: {
    paddingRight: 20
  },
  arrow: {
    textAlign: 'right',
    marginBottom: 8,
    fontSize: 30
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  thumbnail: {
    width: 64,
    height: 64
  },
});

module.exports = ListScreen;
