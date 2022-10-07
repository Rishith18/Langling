import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

import db1 from '../frenchToEnglish';
import db2 from '../EnglishToFrench';

import db from '../config';
import firebase from 'firebase';

var temporaryStorage = {};

export default class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      englishWord: '',
      frenchWord: '',
      searchedWords: [],
      frToEng: false,
    };
  }

  lookupWordFr = () => {
    this.setState({
      frenchWord: db2[this.state.englishWord],
    });
  };
  lookupWordEng = () => {
    this.setState({
      englishWord: db1[this.state.frenchWord],
    });
  };

  submitWords = () => {
    db.ref('frequentlyUsedWords/' + firebase.auth().currentUser.uid).push({
      frenchWord: this.state.frenchWord,
      englishWord: this.state.englishWord,
    });
  };

  render() {
    return (
      <ScrollView>
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
          <View style={styles.switchbox}>
            <Text
              style={
                this.state.frToEng
                  ? [styles.switchText1, { color: 'black' }]
                  : [styles.switchText1, { color: '#ff6a00' }]
              }>
              English To French
            </Text>
            <Switch
              value={this.state.frToEng}
              onValueChange={() => {
                var currentState = this.state.frToEng;
                this.setState({
                  frToEng: !currentState,
                  englishWord: '',
                  frenchWord: '',
                });
              }}
            />
            <Text
              style={
                this.state.frToEng === false
                  ? [styles.switchText2, { color: 'black' }]
                  : [styles.switchText2, { color: '#ff6a00' }]
              }>
              French To English
            </Text>
          </View>
          <TextInput
            multiline={true}
            placeholder={this.state.frToEng ? 'French Word' : 'English Word'}
            style={styles.inputEnglish}
            onChangeText={(text) => {
              if (this.state.frToEng === false) {
                this.setState({ englishWord: text.toLowerCase().trim() });
              } else {
                this.setState({ frenchWord: text.toLowerCase().trim() });
              }
            }}
            placeholderTextColor="grey"
          />

          <View style={styles.translatebuttonContainer}>
            <TouchableOpacity
              style={styles.translatebutton}
              onPress={() => {
                this.state.frToEng==false?this.lookupWordFr():this.lookupWordEng()
              }}>
              <Text style={styles.translatebuttonText}>Translate!</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitbuttonContainer}>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={() => {
                this.submitWords();
              }}>
              <Text style={styles.submitbuttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            multiline={true}
            placeholder={this.state.frToEng ? 'English Word' : 'French Word'}
            style={styles.inputFrench}
            value={
              this.state.frToEng == false
                ? this.state.frenchWord
                : this.state.englishWord
            }
            placeholderTextColor="grey"
          />
          <View style={{ marginTop: 500 }}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  inputEnglish: {
    borderRadius: 15,
    padding: 15,
    borderWidth: 3,
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
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
  translatebutton: {
    backgroundColor: '#ff6a00',
    padding: 15,
    borderRadius: 10,
  },
  translatebuttonContainer: {
    padding: 25,
  },
  translatebuttonText: {
    alignSelf: 'center',
    fontFamily: 'Avenir Next',
    fontSize: 20,
  },
  submitbutton: {
    backgroundColor: '#ff6a00',
    padding: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ff9100',
  },
  submitbuttonContainer: {
    padding: 25,
    marginTop: -25,
  },
  submitbuttonText: {
    alignSelf: 'center',
    fontFamily: 'Avenir Next',
    fontSize: 20,
  },
  inputFrench: {
    borderRadius: 15,
    padding: 15,
    borderWidth: 3,
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginTop: 0,
  },
  switchbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  switchText1: {
    fontSize: 15,
    marginRight: 10,
  },
  switchText2: {
    fontSize: 15,
    marginLeft: 10,
  },
});
