import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import * as Speech from 'expo-speech';

export default class Speak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writtenWord: '',
      french: false,
    };
  }
  speak = (word) => {
    var lang = this.state.french ? 'fr' : 'en';
    Speech.speak(word, { language: lang });
  };

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
        <View style={styles.switchbox}>
          <Text
            style={
              this.state.french
                ? [styles.switchText1, { color: 'black' }]
                : [styles.switchText1, { color: '#ff6a00' }]
            }>
            English
          </Text>
          <Switch
            value={this.state.french}
            onValueChange={() => {
              var currentState = this.state.french;
              this.setState({
                french: !currentState,
                //frenchWord: '',
                //englishWord: '',
              });
            }}
          />
          <Text
            style={
              this.state.french === false
                ? [styles.switchText2, { color: 'black' }]
                : [styles.switchText2, { color: '#ff6a00' }]
            }>
            French
          </Text>
        </View>
        <TextInput
          multiline={true}
          placeholder={
              this.state.french ? 'French Word/Sentence' : 'English Word/Sentence'
          }
          style={styles.inputFrench}
          onChangeText={(text) => {
            this.setState({ writtenWord: text });
          }}
          placeholderTextColor="grey"
        />
        <View style={styles.submitbuttonContainer}>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => {
              this.speak(this.state.writtenWord);
            }}>
            <Text style={styles.submitbuttonText}>Speak</Text>
          </TouchableOpacity>
        </View>
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
  inputFrench: {
    borderRadius: 15,
    padding: 15,
    borderWidth: 3,
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitbutton: {
    backgroundColor: '#ff6a00',
    padding: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ff9100',
    marginTop: 20,
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
