import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

interface User {
    dispaly_name: string;
    email: string;
}

interface Props {
    item: User;
}

const UserItem: FunctionComponent<Props> = (props: Props) => {
    const {item} = props;
    return (
        <Text>{item.dispaly_name}</Text>
    )
}

export default UserItem;