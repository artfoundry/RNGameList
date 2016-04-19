var React = require('react-native');
var {
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ScrollView,
  ListView
} = React;

var IMAGES = {
  "Boom Beach": require("./images/BoomBeach.png"),
  "Clash of Clans": require("./images/CoC.png"),
  "Clash of Kings": require("./images/CoK.png"),
  "Jurassic World": require("./images/JurassicWorld.png"),
  "Puzzles and Dragons": require("./images/PuzzlesAndDragons.png")
};

class GameInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.game.comments,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  render() {
    var game = this.props.game;
    var image = IMAGES[game.name];
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.comments);
    return (
      <ScrollView>
        <Image 
          style={styles.image}
          source={image} />
        <View style={styles.container}>
          <Text style={styles.caption}>{game.caption}</Text>
          <Text style={styles.header}>Comments</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderComment.bind(this)} />
          <TextInput
            style={styles.commentInput}
            onSubmitEditing={this._updateComments.bind(this)}
            placeholder='Enter a comment' />
        </View>
      </ScrollView>
    );
  }

  _renderComment(comment) {
    return (<Text style={styles.comment}>{comment}</Text>);
  }

  _updateComments(event) {
    this.setState({comments: this.state.comments.concat(event.nativeEvent.text)});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'contain',
    width: null,
    height: 200,
  },
  caption: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  comment: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  commentInput: {
    height: 28,
    fontSize: 14,
    color: 'black',
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

module.exports = GameInfo;
