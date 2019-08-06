import React, {useState, FunctionComponent, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    ActivityIndicator,
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import UserItem from './UserItem';

interface Props {
}

const defaultProps = {
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const UserList:FunctionComponent<Props> = (props: Props = defaultProps) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .onSnapshot((querySnapshot) => {
                const users = querySnapshot.docs.map((documentSnapshot) => ({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                }))
                setUsers(users)
            })
        if (loading) {
            setLoading(false);
        }
        // return () => unsubscribe();
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#2196F3" />
            </View>
        )
    }


    return (
        <FlatList
            data={users}
            renderItem={UserItem}
        />
    )
}

export default UserList;