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

	const TableHeader = (props: any) => <Text {...props} />;
    const TableCell = (props: any) => <Text {...props} />;

	return (
		<Table
			data={machines as any}
			columns={['id', 'name', 'os', 'difficultyText', 'user_owns_count', 'root_owns_count', 'authUserInUserOwns', 'authUserInRootOwns']}
			padding={1}
			header={TableHeader}
			cell={TableCell}
		/>
	)
}

export default List;
