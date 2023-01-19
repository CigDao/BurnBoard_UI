import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { CombinedReflection, Reflection } from '@utils/http';
import { dateFromNano } from '@utils/dateHelper';
import bigDecimal from 'js-big-decimal';
import { Box } from '@mui/material';

interface IProps {
	reflections: CombinedReflection[];
}

export default function ReflectionChart({ reflections }: IProps) {
	return (
		<Box sx={{ width: '50%', paddingRight: 2 }}>
			<Line
				options={{ responsive: true }}
				data={{
					labels: reflections.map(r => r.timestamp),
					datasets: [{ data: reflections.map(r => r.amount), label: 'Reflections' }]
				}}
			/>
		</Box>
	);
}
