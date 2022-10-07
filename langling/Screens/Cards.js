import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

var temporaryStorageArray;

export default class Cards extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedWords: [],
      frequentlyUsedWords: [],
    };
  }

  componentDidMount() {
    db.ref('frequentlyUsedWords/' + firebase.auth().currentUser.uid).on(
      'value',
      (data) => {
        var temp = data.val();
        if (data.val()) {
          var tempArray = [];
          Object.keys(temp).map((word) => {
            tempArray.push(temp[word]);
          });
          this.setState({ frequentlyUsedWords: tempArray });
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainerBack}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Lang</Text>
            <Image
              source={require('../assets/IMG_1810.PNG')}
              style={styles.headerImage}
            />
            <Text style={styles.headerText}>ling</Text>
          </View>
        </View>
        {this.state.frequentlyUsedWords.length == 0 ? (
          <Text>No Flashcards Saved</Text>
        ) : null}
        <FlatList
          data={this.state.frequentlyUsedWords}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.list}>
                <TouchableOpacity
                  style={styles.object}>
                  <View style={styles.objectobject}>
                    <Text style={styles.objectText}>{item.englishWord}</Text>
                  </View>
                  <View>
                    <Text style={styles.objectText}>{item.frenchWord}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: 50,
    height: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    fontSize: 40,
  },
  headerContainerBack: {
    backgroundColor: '#ff6a00',
  },
  object: {
    padding: 10,
    backgroundColor: '#ffa35c',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  objectText: {
    fontSize: 20,
  },
  objectobject: {
    marginRight: 100,
  },
});
