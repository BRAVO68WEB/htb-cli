import React, {useState, useEffect} from 'react';
import { Text } from 'ink';

import HTB from '../app/main.js';
import { store } from '../libs/config.js';

const Auth = () => {
	const [loading, setLoading] = useState(true);
	const userName = store.get('email') as string;
	const password = store.get('password') as string;

	if(!userName || !password) {
		return (
			<Text color={'red'}>
				You are not logged in. Please login first.
			</Text>
		);
	}

	const htbUser = new HTB();

	useEffect(() => {
		htbUser.init(
			userName,
			password,
		).then((token) => {
			store.set('token', token);
			setLoading(false);
		})
	}, []);

	return (
		<Text>
			{loading ? <Text>
					Login <Text color="cyan"> in-progress .. </Text>
				</Text> :
				<Text>
					Login <Text color="green"> success !! </Text>
				</Text>
			}
		</Text>
	);
}

export default Auth;
