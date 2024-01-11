import React, {useState, useEffect} from 'react';
import { Text } from 'ink';
import zod from 'zod';

import HTB from '../app/main.js';
import { store } from '../libs/config.js';

export const options = zod.object({
	email: zod.string().describe('Email'),
	password: zod.string().describe('Password'),
});

type Props = {
	options: zod.infer<typeof options>;
};

const Auth = ({options}: Props) => {
	const [loading, setLoading] = useState(true);
	const userName = options.email || '';
	const password = options.password || '';

	store.set('email', userName);
	store.set('password', password);

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
					Login <Text color="cyan"> in-progress .. </Text>!
				</Text> :
				<Text>
					Login <Text color="green"> success !! </Text>!
				</Text>
			}
		</Text>
	);
}

export default Auth;
