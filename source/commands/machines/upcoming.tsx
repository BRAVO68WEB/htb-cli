import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import Table from '../../components/table.js';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

const Upcoming = () => {
	const [machines, setMachines] = useState<IHTBUnRelMachines[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.fetchUnreleasedMachines().then((machines) => {
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

	const CellComponent = (props: any) => {
		return <Text {...props} />;
	};

	return (
		<Table
			data={machines as any}
			columns={['id', 'name', 'os', 'difficulty_text', 'difficulty', 'retiring_name']}
			padding={1}
			header={CellComponent}
			cell={CellComponent}
		/>
	)
}

export default Upcoming;
