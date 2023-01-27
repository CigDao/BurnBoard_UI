import Frame from '@components/Frame/Frame';
import Router from '@components/Router/Router';
import { createClient } from '@connect2ic/core';
import { NFID, PlugWallet, StoicWallet } from '@connect2ic/core/providers';
import { Connect2ICProvider } from '@connect2ic/react';
import canisterIds, { canisterIdsAsArray } from '@misc/canisterIds';
import { theme } from '@misc/theme';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { idlFactory as daoIdl } from './declarations/dao';
import { idlFactory as tokenIdl } from './declarations/token';
import { idlFactory as ledgerIdl } from './declarations/ledger';
import { idlFactory as treasuryIdl } from './declarations/treasury';


const client = createClient({
	globalProviderConfig: {
		host: 'https://mainnet.ic0.app',
		whitelist: canisterIdsAsArray,
		autoConnect: false
	},
	canisters: {
		['dao']: {
			canisterId: canisterIds.daoCanisterId,
			idlFactory: daoIdl
		},
		['token']: {
			canisterId: canisterIds.tokenCanisterId,
			idlFactory: tokenIdl
		},
		['ledger']: {
			canisterId: canisterIds.ledgerCanisterId,
			idlFactory: ledgerIdl
		},
		['treasury']: {
			canisterId: canisterIds.treasuryCanisterId,
			idlFactory: treasuryIdl
		},
	},
	providers: [new PlugWallet(), new StoicWallet(), new NFID()]
});

export default function App() {
	return (
		<Connect2ICProvider client={client}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Frame>
						<Router />
					</Frame>
				</BrowserRouter>
			</ThemeProvider>
		</Connect2ICProvider>
	);
}
