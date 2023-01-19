import Dashboard from '@modules/Dashboard/Dashboard';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export default function Router() {
	let location = useLocation();

	return (
		<Routes>
			<Route path='/'>
				<Route index element={<Dashboard />} />
			</Route>
		</Routes>
	);
}
