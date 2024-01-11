import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import zod from 'zod';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

export const options = zod.object({
	name: zod.string().describe('Machine Name'),
});

type Props = {
	options: zod.infer<typeof options>;
};

const Info = ({options} : Props) => {
	const [machine, setMachine] = useState<IHTBMachineProfile>();
	const [loading, setLoading] = useState(true);

	const machineName = options.name || '';

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.fetchMachineProfile(machineName).then((machines) => {
			setMachine(machines);
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
				<Text color="green"> {machine.info.name} </Text>
				<Text color="white"> {machine.info.ip} </Text>
				<Text color="red"> {machine.info.difficultyText} </Text>
				<Text color="cyan"> {machine.info.os} </Text>
				<Text color="yellow"> {machine.info.points} </Text>
			</Text>
		)
	}
	else {
		return (
			<Text>
				<Text color="red"> Machine not found </Text>
			</Text>
		)
	}
}

export default Info;
