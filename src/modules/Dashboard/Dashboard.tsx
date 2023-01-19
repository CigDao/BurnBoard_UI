import { Box, Button, Container, Divider, Input, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import http, { CombinedReflection, Reflection, Transaction } from '@utils/http';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/cig_logo.png';
import { _SERVICE as _TAXCOLLECTOR_ACTOR } from '../../declarations/taxcollector';
import { _SERVICE as _tokenService } from '../../declarations/token';

import Loading from '@components/Loading/Loading';
import bigDecimal from 'js-big-decimal';
import { theme } from '@misc/theme';
import { TransactionAvatar } from '@components/TransactionAvatar/TransactionAvatar';
import BurnTable from '@modules/BurnTable/BurnTable';
import { useCanister, useWallet } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { DECIMALS, bigIntToDecimal, bigIntToDecimalPrettyString } from '@utils/util';
import { LoadingButton } from '@mui/lab';

export default function Dashboard() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [burnt, setBurnt] = useState(0);
	const [myBurntAmount, setMyBurntAmount] = useState(0n);
	const [myEarnedAmount, setMyEarnedAmount] = useState(0n);
	const [burnAmount, setBurnAmount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonsLoading, setButtonsLoading] = useState(false);

	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [_taxcollectorActor] = useCanister('taxcollector');
	const taxCollectorActor = _taxcollectorActor as unknown as _TAXCOLLECTOR_ACTOR;
	const [_tokenActor] = useCanister('token');
	const tokenActor = _tokenActor as unknown as _tokenService;
	const [wallet] = useWallet()
	useEffect(() => {
		intialize();
	}, []);

	useEffect(() => {
		if (wallet?.isConnected) {
			getBurnAmount();
		}
	}, [wallet?.isConnected]);

	async function getBurnAmount() {
		const burn = await taxCollectorActor.getBurner(Principal.fromText(wallet?.principal || ""));
		const earnedAmount = burn[0]?.earnedAmount || 0n;
		const burnedAmount = burn[0]?.burnedAmount || 0n;
		setMyEarnedAmount(earnedAmount);
		setMyBurntAmount(burnedAmount);
	}

	async function intialize() {
		try {
			setIsLoading(true);
			const promises = await Promise.all([http.fetchTransactions(), http.getBurnt()]);
			let transactions = promises[0];
			setTransactions(transactions);
			let burnt = promises[1];
			setBurnt(burnt);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	async function onChange(e: any) {
		setBurnAmount(e.target.value);
	}

	async function getMax() {
		setButtonsLoading(true);
		const allTokens = await tokenActor.balanceOf(Principal.fromText(wallet?.principal || ""));
		setBurnAmount(bigIntToDecimal(allTokens).getValue());
		setButtonsLoading(false);
	}

	async function burnCoins() {
		setButtonsLoading(true);
		await tokenActor.burn(BigInt(Number(burnAmount) * DECIMALS))
		await getBurnAmount();
		setButtonsLoading(false);
		setBurnAmount('');
	}

	function renderBurnBar() {
		return (
			<Paper sx={{ display: 'flex', flexGrow: 1, width: '100%', marginTop: 4 }}>
				<TextField type='number' sx={{ margin: 2 }} value={burnAmount} fullWidth
				onChange={onChange}
				placeholder='Enter amount to burn' variant='outlined'
				    InputProps={{
						inputProps: { 
							min: 0 
						},
						endAdornment: <LoadingButton variant='contained' loading={isButtonsLoading} disabled={isLoading} onClick={getMax}>Max</LoadingButton>
					}}
				/>
				<LoadingButton loading={isButtonsLoading} onClick={burnCoins}  sx={{ marginY: 2, marginRight: 2 }} disabled={isLoading}  color='secondary' variant='contained'>
					Burn
				</LoadingButton>
			</Paper>
		);
	}

	function renderReflections() {
		return (
			<Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', marginBottom: "4px" }}>

				<Paper sx={{ bgcolor: theme => theme.palette.secondary.light, marginBottom: 2 }}>
					<ListItem>
						<ListItemAvatar>
							<TransactionAvatar transactionType='burn' />
						</ListItemAvatar>
						<ListItemText sx={{ width: '50%' }} primary='Total Burned Amount' secondary={new bigDecimal(burnt / 100000000).getPrettyValue(3, ',') + ' YC'} />
					</ListItem>
				</Paper>
				{wallet?.isConnected && <>
					<Paper sx={{ bgcolor: theme => theme.palette.secondary.light, marginBottom: 2 }}>
						<ListItem>
							<ListItemAvatar>
								<TransactionAvatar transactionType='reflections' />
							</ListItemAvatar>
							<ListItemText sx={{ width: '50%' }} primary='My Burnt Amount' secondary={bigIntToDecimalPrettyString(myBurntAmount)} />
						</ListItem>
					</Paper>
					<Paper sx={{ bgcolor: theme => theme.palette.secondary.light }}>
					<ListItem>
						<ListItemAvatar>
							<TransactionAvatar transactionType='reflections' />
						</ListItemAvatar>
						<ListItemText sx={{ width: '50%' }} primary='My Earned Amount' secondary={bigIntToDecimalPrettyString(myEarnedAmount)} />
					</ListItem>
				</Paper>
				</>
				}

			</Box>
		);
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			<img style={{ filter: 'drop-shadow(5px 5px 5px rgba(0,0,0, 0.4))' }} src={logo} width={isSmallScreen ? '50%' : '25%'} />
			<Typography sx={{ paddingTop: 2, textAlign: 'center', fontSize: isSmallScreen ? 32 : undefined, textShadow: '1px 1px 1px #000000' }} color='#ffffff' variant='h4'>
				CIGDAO BurnBoard
			</Typography>
			<Typography color='primary' variant='h6' sx={{ marginTop: 0 }}>
				Burn tokens by voting, transfering, buying, or bellow
			</Typography>
			{renderBurnBar()}
			<Box sx={{ width: '100%', paddingY: 1 }}>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<Divider sx={{ margin: 2 }} />
						<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
							{/* {!isSmallScreen && <ReflectionChart reflections={reflections} />} */}
							{renderReflections()}
						</Box>
						<Divider sx={{ margin: 2 }} />
						<BurnTable></BurnTable>
					</>
				)}
			</Box>
		</Box>
	);
}