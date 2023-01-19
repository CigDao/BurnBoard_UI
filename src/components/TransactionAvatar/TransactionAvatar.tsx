import { SavingsRounded, AccountBalance, Percent, SyncAlt, QuestionMark, Fireplace, LocalFireDepartment, Logout, SwapCalls } from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';
import React from 'react';

interface IProps {
	transactionType: string;
	size?: number;
}

export function TransactionAvatar({ transactionType, size }: IProps) {
	switch (transactionType) {
		case 'reflections':
			return (
				<Tooltip title='Reflections' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<SavingsRounded sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'dao':
			return (
				<Tooltip title='DAO' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<AccountBalance sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'tax':
			return (
				<Tooltip title='Tax' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<Percent sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'transfer':
			return (
				<Tooltip title='Transfer' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<SyncAlt sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'burn':
			return (
				<Tooltip title='Burn' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<LocalFireDepartment sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'transferFrom':
			return (
				<Tooltip title='Transfer from' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<Logout sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'swap_yc':
			return (
				<Tooltip title='Swap YC to WICP' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<SwapCalls sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		case 'swap_icp':
			return (
				<Tooltip title='Swap WICP to YC' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<SwapCalls sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
		default:
			return (
				<Tooltip title='Unknown' arrow placement='top'>
					<Avatar sx={{ bgcolor: '#E6E8C9', width: size, height: size }}>
						<QuestionMark sx={size ? { width: size / 2, height: size / 2 } : {}} color='secondary' />
					</Avatar>
				</Tooltip>
			);
	}
}
