import React from 'react';
import { View, StyleSheet } from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes, User} from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';
import Config from "react-native-config";


const {WEB_CLIENT_ID} = Config;

interface State {
  userInfo?: User,
  isSigninInProgress: boolean,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

class App extends React.Component<any, State> {
  state: State = {
    userInfo: undefined,
    isSigninInProgress: false,
  }
  constructor(props: any)  {
    super(props);
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      webClientId: WEB_CLIENT_ID,
    });

    this._signIn = this._signIn.bind(this);
  }

  // Somewhere in your code
  async _signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);
      const result = await firebase.auth().signInWithCredential(credential);
      console.log('firebase', result);
      console.log('userInfo', userInfo);
      this.setState({ userInfo, isSigninInProgress: true });
    } catch (error) {
      console.error('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
         <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress} />
      </View>
    )
  }
}

export default App;
