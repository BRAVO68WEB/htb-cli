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
				<Text color="green">Name : {machine.info.name} {"\n"}</Text>
				<Text color="white">IP : {machine.info.ip ?? 'X.X.X.X'} {"\n"}</Text>
				<Text color="red">Difficulty : {machine.info.difficultyText} {"\n"}</Text>
				<Text color="cyan">OS : {machine.info.os} {"\n"}</Text>
				<Text color="yellow">Points : {machine.info.points} {"\n"}</Text>
				<Text color="blue">
					User Flag : {
						machine.info.authUserInUserOwns ? 'Owned ' : ' '
					} {"\n"}
				</Text>
				<Text color="magenta">
					Root Flag : {
						machine.info.authUserInRootOwns ? 'Owned ' : ' '
					}
				</Text>
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
