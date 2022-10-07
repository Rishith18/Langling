import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      signUpOpen: false,
    };
  }

  login = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log('hello');
        this.props.navigation.navigate('DashBoard');
      })
      .catch((error) => {
        console.log(error.message);
        return Alert.alert(error.message);
      });
  };

  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        firebase
          .database()
          .ref('users/' + firebase.auth().currentUser.uid)
          .set({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          });
        this.props.navigation.navigate('DashBoard');
      })
      .catch((error) => {
        console.log(error.message);
        return Alert.alert(error.message);
      });
  };

  render() {
    if (this.state.signUpOpen === false) {
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
          <TextInput
            placeholder="Email"
            style={styles.emailInput}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.passwordInput}
            secureTextEntry
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.login();
            }}>
            <Text style={styles.submitButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.setState({ signUpOpen: true });
            }}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
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
          <TextInput
            placeholder="Email"
            style={styles.emailInput}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.passwordInput}
            secureTextEntry
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.passwordInput}
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
          />
          <TextInput
            placeholder="First Name"
            style={styles.passwordInput}
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.passwordInput}
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.signUp();
            }}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.setState({ signUpOpen: false });
            }}>
            <Text style={styles.submitButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  emailInput: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 50,
    marginTop: 20,
  },
  passwordInput: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 50,
  },
  submitButton: {
    backgroundColor: '#ff6a00',
    padding: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ff9100',
    marginTop: 40,
    marginHorizontal: 50,
  },
  submitButtonText: {
    alignSelf: 'center',
    fontFamily: 'Avenir Next',
    fontSize: 20,
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
});
