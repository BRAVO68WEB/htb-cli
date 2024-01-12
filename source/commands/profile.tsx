import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

import HTB from '../app/main.js';
import { store } from '../libs/config.js';

const Profile = () => {
	const [user, setUser] = useState<IHTBWhoAmIInfo>();
	const [loading, setLoading] = useState(true);
	const token = store.get('token') as string;

	if(!token) {
		return (
			<Text color={'red'}>
				You are not logged in. Please login first.
			</Text>
		);
	}

	const htbUser = new HTB(token);

	useEffect(() => {
		htbUser.fetchWhoAmI().then((user) => {
			setUser(user);
			setLoading(false);
		}).catch(() => {
			setLoading(false);
		});
	}, []);

	if(loading) {
		return (
			<Text>
				<Text color="cyan"> Loading ... </Text>
			</Text>
		);
	}
	else if(user) {
		return (
			<Text>
				ID : <Text color="green"> {user.info.id} </Text>
				{"\n"}
				Name : <Text color="green"> {user.info.name} </Text>
			</Text>
		)
	}
	else {
		return (
			<Text>
				<Text color="red"> Are you sure you logged in ? </Text>
			</Text>
		)
	}
}

export default Profile;
