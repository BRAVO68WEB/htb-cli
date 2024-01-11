import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import Table from '../../components/table.js';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

const List = () => {
	const [machines, setMachines] = useState<IHTBMachines[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.fetchMachines().then((machines) => {
			setMachines(machines.data);
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

	return (
		<Table
			data={machines as any}
			columns={['id', 'name', 'os', 'difficultyText', 'user_owns_count', 'root_owns_count']}
			padding={1}
			header={(props) => <Text {...props} />}
			cell={(props) => <Text {...props} />}
		/>
	)
}

export default List;
