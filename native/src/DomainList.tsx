import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import {StyleSheet, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './Auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

interface Props {}

interface Member {
    name: string;
    uid: string;
}
interface Domain {
    titie: string;
    key: string;
}
interface State {
    domains: Domain[];
    members: {[Key: string]: Member[]};
}

const getMembers = (domainId: string) => {
    return new Promise((resolve) => {
        firestore()
        .collection(`domains`)
        .doc(domainId)
        .collection('members')
        .onSnapshot((querySnap) => {
            const members = querySnap.docs.map((docSnap) => docSnap.data());
            resolve(members);
        });
    });
    
}

const DomainList: FunctionComponent<Props> = (props) => {
    
    const [domains, setDomains] = useState([]);
    useEffect(() => {
        firestore()
            .collection('domains')
            .onSnapshot((querySnapshot) => {
                const domains = querySnapshot.docs.map(async (docSnap) => {
                    const doc = docSnap.data();
                    console.log(`domain id is ${docSnap.id}`)
                    const memeber = await getMembers(docSnap.id);
                    console.table(memeber)
                    return {
                        title: docSnap.id,
                        key: docSnap.id,
                    }
                });
                console.log({domains})
                setDomains(domains)
            });
    }, []);
    return (
        <View />
    )
}

export default DomainList;