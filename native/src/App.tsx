import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {GoogleSignin, GoogleSigninButton, statusCodes, User} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import Config from "react-native-config";
import {AuthRouter, AuthProvider, AuthContext} from './Auth';
import UserList from './UserList';
import DomainList from './DomainList';

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
const Login = () => {
  const {siginIn} = useContext(AuthContext);
  return(
    <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => siginIn()}
      />
  )
}

const App = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    webClientId: WEB_CLIENT_ID,
  });
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AuthRouter
          renderLogin={() => <Login />}
          renderMain={() => <DomainList />}
          // renderMain={() => <UserList />}
        />
      </AuthProvider>
    </View>
  )
}
export default App;
