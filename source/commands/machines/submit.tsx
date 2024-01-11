import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import zod from 'zod';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

export const options = zod.object({
	flag: zod.string().describe('Flag'),
	id: zod.string().describe('Machine ID'),
});

type Props = {
	options: zod.infer<typeof options>;
};

const List = ({options} : Props) => {
	const [loading, setLoading] = useState(true);
	const [flagResponse, setFlagResponse] = useState<IHTBSubmitFlagResponse>();

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.submitFlag(
			options.id,
			options.flag,
		).then((submit) => {
			setFlagResponse(submit);
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
	else {
		return (
			<Text>
				<Text color="green"> {flagResponse?.message} </Text>
			</Text>
		)
	}
}

export default List;
