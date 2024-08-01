import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

const Info = () => {
	const [machine, setMachine] = useState<IHTBArenaMachineInfo>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.fetchArenaMachineInfo().then((machine) => {
			setMachine(machine);
			setLoading(false);
		}).catch(() => {
			setLoading(false);
		})
	}, []);

	if(loading) {
		return (
			<Text>
				<Text color="cyan"> Loading .. </Text>
			</Text>
		);
	}
	else if (machine) {
		return (
			<Text>
				<Text color="green"> {machine.data.name} </Text>
				<Text color="white"> {machine.data.ip ?? 'REDACTED'} </Text>
				<Text color="red"> {machine.data.difficulty_text} </Text>
				<Text color="cyan"> {machine.data.os} </Text>
				<Text color="yellow"> {machine.data.points} </Text>
			</Text>
		)
	}
	else {
		return (
			<Text>
				<Text color="red"> Session not started / Machine not found </Text>
			</Text>
		)
	}
}

export default Info;
