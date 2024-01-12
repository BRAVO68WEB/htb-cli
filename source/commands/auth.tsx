import React, {useState, useEffect} from 'react';
import { Text } from 'ink';
import zod from 'zod';

import HTB from '../app/main.js';
import { store } from '../libs/config.js';

export const options = zod.object({
	email: zod.string().describe('Email'),
	password: zod.string().describe('Password'),
	otp: zod.string().optional().describe('OTP'),
});

type Props = {
	options: zod.infer<typeof options>;
};

const Auth = ({options}: Props) => {
	const [loading, setLoading] = useState(true);
	const [was2FaEnabled, setWas2FaEnabled] = useState(false);
	const userName = options.email || '';
	const password = options.password || '';
	const otp = options.otp ?? '';

	store.set('email', userName);
	store.set('password', password);

	const htbUser = new HTB();

	useEffect(() => {
		htbUser.init(
			userName,
			password,
		).then((token) => {
			store.set('token', token.message.access_token);
			if(token.message.is2FAEnabled) {
				setWas2FaEnabled(true);
				if(!otp) {
					setLoading(false);
				}
				else {
					htbUser.auth2FA(otp).then(() => {
						setWas2FaEnabled(false);
						setLoading(false);
					})
				}
			}else {
				setLoading(false);
			}
		})
	}, []);

	// return (
	// 	<Text>
	// 		{loading ? <Text>
	// 				Login <Text color="cyan"> in-progress .. </Text>
	// 			</Text> :
	// 			<Text>
	// 				Login <Text color="green"> success !! </Text>
	// 			</Text>
	// 		}
	// 	</Text>
	// );

	if(loading) {
		return (
			<Text>
				<Text color="cyan"> Login in-progress .. </Text>
			</Text>
		);
	}
	else if(was2FaEnabled) {
		return (
			<Text>
				<Text color="red"> 2FA is enabled. Please login using 2FA command. </Text>
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
