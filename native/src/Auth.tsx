import React, { useContext, useState, useCallback, useEffect, createContext, Fragment } from 'react';
import {GoogleSignin, GoogleSigninButton, statusCodes, User} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    const siginIn = useCallback(async () => {
        const userInfo = await GoogleSignin.signIn();
        const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        await auth().signInWithCredential(credential);
    }, []);

    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            setCurrentUser(user);
        })
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, siginIn}}>
            {children}
        </AuthContext.Provider>
    )
}
const AuthRouter = ({renderLogin, renderMain}) => {
    const {currentUser} = useContext(AuthContext);
    return(
        <Fragment>
            {currentUser ? renderMain() : renderLogin()}
        </Fragment>
    )
}
export {AuthContext, AuthProvider, AuthRouter}