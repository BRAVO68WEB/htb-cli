import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

import HTB from '../../app/main.js';
import { store } from '../../libs/config.js';

const Info = () => {
	const [vpnInfo, setVpnInfo] = useState<IHTBVpnInfoResponse>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = store.get('token') as string;
		const htbUser = new HTB(token);
		htbUser.fetchVPNInfo().then((vpninfo) => {
			setVpnInfo(vpninfo);
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
	else {
		return (
			<>
				<Text>
					<Text color="green"> Competitive </Text>
					<Text color="white"> {vpnInfo?.data.competitive.location_type_friendly ?? "N/A"} </Text>
				</Text>
				<Text>
					<Text color="blue"> Labs </Text>
					<Text color="white"> {vpnInfo?.data.lab.location_type_friendly ?? "N/A"} </Text>
				</Text>
				<Text>
					<Text color="cyan"> Starting Point </Text>
					<Text color="white"> {vpnInfo?.data.starting_point.location_type_friendly ?? "N/A"} </Text>
				</Text>
				<Text>
					<Text color="magenta"> Pro Labs </Text>
					<Text color="white"> {vpnInfo?.data.pro_labs.location_type_friendly ?? "N/A"} </Text>
				</Text>
				<Text>
					<Text color="red"> Endgames </Text>
					<Text color="white"> {vpnInfo?.data.endgames.location_type_friendly ?? "N/A"} </Text>
				</Text>
				<Text>
					<Text color="yellow"> Fortresses </Text>
					<Text color="white"> {vpnInfo?.data.fortresses.location_type_friendly ?? "N/A"} </Text>
				</Text>
			</>
		)
	}
}

export default Info;
