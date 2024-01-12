import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

const Info = () => {
	const [machine, setMachine] = useState<IHTBStartArenaMachineResponse>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.startArenaMachine().then((machine) => {
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
				<Text color="green"> {machine.message} </Text>
				{"\n"}
				Rerun <Text color="green"> htb-cli arena info </Text> to get the machine info and ip.
			</Text>
		)
	}
	else {
		return (
			<Text>
				<Text color="red"> It's off-season or something went wrong ! </Text>
			</Text>
		)
	}
}

export default Info;
