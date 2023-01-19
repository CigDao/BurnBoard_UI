import Topbar from '@components/Topbar/Topbar';
import { Container } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export default function Frame({ children }: PropsWithChildren) {
	return (
		<>
			<Topbar />
			<Container sx={{ display: 'flex', paddingTop: 4, flexDirection: 'column' }}>
				<>{children}</>
			</Container>
		</>
	);
}
