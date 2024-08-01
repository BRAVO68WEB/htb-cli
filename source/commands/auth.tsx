import React, {useState, useEffect} from 'react';
import { Text } from 'ink';
import zod from 'zod';

import HTB from '../app/main.js';
import { store } from '../libs/config.js';

export const options = zod.object({
	token: zod.string().optional().describe('API Token'),
});

type Props = {
	options: zod.infer<typeof options>;
};

const Auth = ({options}: Props) => {
	const [loading, setLoading] = useState(true);
	const apiToken = options.token ?? '';

	store.set('token', apiToken);

	const htbUser = new HTB(
		apiToken
	);

	useEffect(() => {
		htbUser.fetchWhoAmI(
		).then((data) => {
			data.info.email ? setLoading(false) : setLoading(true);
		})
	}, []);

	if(loading) {
		return (
			<Text>
				<Text color="cyan"> Login in-progress .. </Text>
			</Text>
		);
	}
	else {
		return (
			<Text>
				<Text color="green"> Login success !! </Text>
			</Text>
		);
	}
}

export default Auth;
