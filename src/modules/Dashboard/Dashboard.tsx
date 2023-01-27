import { Alert, Avatar, Box, Button, Container, Divider, Input, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import http, { CombinedReflection, Reflection, Transaction } from '@utils/http';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/cig_logo.png';
import { _SERVICE as _tokenService } from '../../declarations/token';
import Confetti from 'react-confetti'
import Loading from '@components/Loading/Loading';
import bigDecimal from 'js-big-decimal';
import { theme } from '@misc/theme';
import { TransactionAvatar } from '@components/TransactionAvatar/TransactionAvatar';
import BurnTable from '@modules/BurnTable/BurnTable';
import { useCanister, useConnect, useWallet } from '@connect2ic/react';
import { Principal } from '@dfinity/principal';
import { DECIMALS, bigIntToDecimal, bigIntToDecimalPrettyString } from '@utils/util';
import { LoadingButton } from '@mui/lab';
import { CurrencyExchange, Fireplace, SavingsRounded, StarsOutlined } from '@mui/icons-material';

export default function Dashboard() {
	const [burnt, setBurnt] = useState(0);
	const [myBurntAmount, setMyBurntAmount] = useState(0n);
	const [myEarnedAmount, setMyEarnedAmount] = useState(0n);
	const [burnAmount, setBurnAmount] = useState('');
	const [burnRank, setBurnRank] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);


	const [isLoading, setIsLoading] = useState(false);
	const [isButtonsLoading, setButtonsLoading] = useState(false);

	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [_tokenActor] = useCanister('token');
	const tokenActor = _tokenActor as unknown as _tokenService;
	const { isConnected, principal } = useConnect();
	useEffect(() => {
		intialize();
	}, []);

	useEffect(() => {
		console.log(isConnected)
		if (isConnected) {
			getBurnAmount();
		}
	}, [isConnected]);

	async function getBurnAmount() {
		const innerPrincipal = Principal.fromText(principal || "");
		const promises = await Promise.all([tokenActor.getBurner(innerPrincipal), tokenActor.fetchTopBurners()]);
		const burn = promises[0];
		const earnedAmount = burn[0]?.earnedAmount || 0n;
		const burnedAmount = burn[0]?.burnedAmount || 0n;
		setMyEarnedAmount(earnedAmount);
		setMyBurntAmount(burnedAmount);

		let topBurners = promises[1];
		for (let index = 0; index < topBurners.length; index++) {
			const element = topBurners[index];
			if (element[0].toString() === principal) {
				setShowSuccess(true);
				setBurnRank(String(index + 1));
				break;
			}
		}

		setTimeout(() => setShowSuccess(false), 6000);


	}

	async function intialize() {
		try {
			setIsLoading(true);
			let burnt = await http.getBurnt();
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
		const allTokens = await tokenActor.balanceOf(Principal.fromText(principal || ""));
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
				{isConnected && <>
					{burnRank &&
					<Paper sx={{ bgcolor: theme => theme.palette.secondary.light, marginBottom: 2 }}>
						<ListItem>
							<ListItemAvatar>
							<Avatar sx={{ bgcolor: '#E6E8C9' }}>
								<StarsOutlined color='secondary' />
							</Avatar>							
							</ListItemAvatar>
							<ListItemText sx={{ width: '50%' }} primary='My Burnt Rank' secondary={(burnRank)} />
						</ListItem>
						{showSuccess &&
							<Stack sx={{ position: "fixed", top: "100px", left: 0 }}>
								<Alert severity="success" >
									Congratulations you are ranked {burnRank} and will recieve extra reflections
								</Alert>
							</Stack>
						}
						<Confetti
						recycle={false}
						width={window.innerWidth}
						height={window.innerHeight}
						/>
					</Paper>

					}
					<Paper sx={{ bgcolor: theme => theme.palette.secondary.light, marginBottom: 2 }}>
						<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: '#E6E8C9' }}>
								<Fireplace color='secondary' />
							</Avatar>							
							</ListItemAvatar>
							<ListItemText sx={{ width: '50%' }} primary='My Burnt Amount' secondary={(myBurntAmount === 0n ? '0' : bigIntToDecimalPrettyString(myBurntAmount)) + " YC"} />
						</ListItem>
					</Paper>
					<Paper sx={{ bgcolor: theme => theme.palette.secondary.light }}>
					<ListItem>
					<ListItemAvatar>
							<Avatar sx={{ bgcolor: '#E6E8C9' }}>
								<CurrencyExchange color='secondary' />
							</Avatar>							
							</ListItemAvatar>
						<ListItemText sx={{ width: '50%' }} primary='My Earned Amount' secondary={(myEarnedAmount === 0n ? '0' : bigIntToDecimalPrettyString(myEarnedAmount)) + " YC"} />
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
				Top Burners get extra rewards, best way to burn is to <a target={"_blank"} href="https://dao.cigdao.com">vote</a> 
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
