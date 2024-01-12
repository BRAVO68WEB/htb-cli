#!/usr/bin/env node
import Pastel from 'pastel';

const app = new Pastel({
	importMeta: import.meta,
	description: 'Unofficial Hack The Box CLI client',
	name: 'htb-cli',
	version: '0.0.0-git',
});

await app.run();
