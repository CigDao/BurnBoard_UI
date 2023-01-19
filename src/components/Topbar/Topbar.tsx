import { AppBar, Container, Toolbar, Box, Menu, MenuItem, Button, Divider, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '@assets/images/cig_logo_small.png';
import { useNavigate } from 'react-router-dom';
import { useCanister, useConnect } from '@connect2ic/react';
import { NFID, PlugWallet, StoicWallet } from '@connect2ic/core/providers';
import { Principal } from '@dfinity/principal';
import { _SERVICE as _TOKEN_SERVICE } from '../../declarations/token';
import { _SERVICE as _LEDGER_SERVICE } from '../../declarations/ledger';
import bigDecimal from 'js-big-decimal';
import { AccountIdentifier, SubAccount } from '@dfinity/nns';
import { theme } from '@misc/theme';
import NavMenu from '@components/NavMenu/NavMenu';

interface Page {
	name: string;
	path: string;
}
const pages: Page[] = [{ name: 'Explorer', path: '' }];

export default function Topbar() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [ycBalance, setYcBalance] = useState('');
	const [icpBalance, setIcpBalance] = useState('');
	const [isLoadingBalances, setIsLoadingBalances] = useState(false);
	const navigate = useNavigate();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { activeProvider, connect, disconnect, isInitializing, principal, isConnected } = useConnect();

	const [_tokenActor] = useCanister('token');
	const tokenActor = _tokenActor as unknown as _TOKEN_SERVICE;

	const [_ledgerActor] = useCanister('ledger');
	const ledgerActor = _ledgerActor as unknown as _LEDGER_SERVICE;

	useEffect(() => {
		initialize();
	}, [principal]);

	function handleLoginClick(provider: string) {
		connect(provider);
		setAnchorEl(null);
	}

	async function initialize() {
		try {
			setIsLoadingBalances(true);
			if (principal) {
				await getYcBalance(principal);
				await getIcpBalance(principal);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoadingBalances(false);
		}
	}

	async function getYcBalance(principal: string) {
		try {
			let rawBalance = await tokenActor.balanceOf(Principal.fromText(principal));
			let balance = (Number(rawBalance) / 100000000).toFixed(3);
			setYcBalance(new bigDecimal(balance).getPrettyValue(3, ','));
		} catch (error) {
			console.log(error);
		}
	}

	async function getIcpBalance(principal: string) {
		try {
			const identifier = AccountIdentifier.fromPrincipal({
				principal: Principal.fromText(principal),
				subAccount: SubAccount.ZERO
			}).toNumbers();
			let rawBalance = await ledgerActor.account_balance({ account: identifier });
			let balance = (Number(rawBalance.e8s) / 100000000).toFixed(3);
			setIcpBalance(new bigDecimal(balance).getPrettyValue(3, ','));
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AppBar position='static' elevation={0} sx={{ bgcolor: theme => theme.palette.primary.light }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box sx={{ display: 'flex', width: '33%', alignItems: 'center', justifyContent: 'left' }}>
						<img style={{ padding: 2 }} src={logo} height='48px' />
						<Box sx={{ paddingLeft: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Typography variant='h6'>BurnBoard</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', width: '33%', justifyContent: 'center' }}>
						<NavMenu appName='BurnBoard'/>
					</Box>
					<Box sx={{ display: 'flex', width: '33%', justifyContent: 'right' }}>
						{activeProvider ? (
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								{!isSmallScreen && !isLoadingBalances && ycBalance && icpBalance && (
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											textAlign: 'end',
											paddingRight: 2
										}}>
										User balances
										<Box>
											<Typography variant='caption'>{ycBalance ? ycBalance + ' YC' : ''} </Typography>
											<span> | </span>
											<Typography variant='caption'>{icpBalance ? icpBalance + ' ICP' : ''} </Typography>
										</Box>
									</Box>
								)}
								<Button variant='outlined' color='inherit' onClick={() => disconnect()}>
									<img src={activeProvider.meta.icon.light} height={20} />
									<Box sx={{ marginLeft: 1 }}>Logout</Box>
								</Button>
							</Box>
						) : (
							<Button disabled={isInitializing} variant='outlined' color='inherit' onClick={e => setAnchorEl(e.currentTarget)}>
								{isInitializing ? <CircularProgress color='inherit' size={24} /> : 'Login'}
							</Button>
						)}

						<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
							<MenuItem onClick={() => handleLoginClick('plug')}>
								<img src={new PlugWallet().meta.icon.light} height={20} width={20} />
								<Box sx={{ marginLeft: 2 }}>PLUG</Box>
							</MenuItem>
							<MenuItem onClick={() => handleLoginClick('stoic')}>
								<img src={new StoicWallet().meta.icon.light} height={20} width={20} />
								<Box sx={{ marginLeft: 2 }}>STOIC</Box>
							</MenuItem>
							<MenuItem onClick={() => handleLoginClick('nfid')}>
								<img src={new NFID().meta.icon.light} height={20} width={20} />
								<Box sx={{ marginLeft: 2 }}>NFID</Box>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
			<Divider />
		</AppBar>
	);
}
