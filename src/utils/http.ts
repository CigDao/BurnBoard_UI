import canisterIds from '@misc/canisterIds';
import axios from 'axios';
import { flatMap, groupBy, orderBy, sortBy } from 'lodash';
import { dateFromNano } from './dateHelper';

const databasesUrl = (canisterId: string) => `https://${canisterId}.raw.ic0.app/pk/ledger`;
const urlBuilder = (canisterId: string, endpoint: string) => `https://${canisterId}.raw.ic0.app/${endpoint}`;

export interface Transaction {
	amount: number;
	timeStamp: number;
	hash: string;
	receiver: string;
	fee: number;
	sender: string;
	transactionType: string;
	type?: string;
}

export interface Reflection {
	amount: number;
	timestamp: number;
}

export interface CombinedReflection {
	amount: number;
	timestamp: string;
}

export interface Proposal {
	id: number;
	vote?: boolean | null;
	creator: string;
	title: string;
	yay: bigint;
	description: string;
	timeStamp: number;
	treasuryRequestId?: number | null;
	executed: boolean;
	nay: bigint;
	request?: Request | null;
	type?: string;
	executedAt: bigint;
}
export interface TreasuryRequest {
	id: number;
	recipient: string;
	amount: number;
	description: string;
	createdAt: number;
	executed: boolean;
	approvals: [Approval];
}

interface Approval {
	power: number;
	member: string;
}

export interface Request {
	recipient: string;
	amount: number;
	description: string;
}

export interface Vote {
	yay: boolean;
	timeStamp: bigint;
	power: number;
	proposalId: number;
	member: string;
}

async function fetchAcceptedProposals(): Promise<Proposal[]> {
	return await (
		await axios.get(urlBuilder(canisterIds.daoCanisterId, 'fetchAcceptedProposals'), { responseType: 'json' })
	).data;
}
async function fetchTreasuryRequests(): Promise<TreasuryRequest[]> {
	const x = await (await axios.get(urlBuilder(canisterIds.treasuryCanisterId, 'fetchRequests'), { responseType: 'json' })).data;
	console.log(x);
	return x;
}

async function fetchRejectedProposals(): Promise<Proposal[]> {
	return await (
		await axios.get(urlBuilder(canisterIds.daoCanisterId, 'fetchRejectedProposals'), { responseType: 'json' })
	).data;
}

async function getProposal(): Promise<Proposal> {
	return await (
		await axios.get(urlBuilder(canisterIds.daoCanisterId, 'getProposal'), { responseType: 'json' })
	).data;
}

async function getVote(voteId: number): Promise<Vote> {
	return await (
		await axios.get(urlBuilder(canisterIds.daoCanisterId, `getVote/${voteId}`), { responseType: 'json' })
	).data;
}

async function getDatabases(): Promise<string[]> {
	return await (
		await axios.get(databasesUrl(canisterIds.transactionDatabaseCanisterId), { responseType: 'json' })
	).data;
}

async function getReflectionDatabases(): Promise<string[]> {
	return await (
		await axios.get(databasesUrl(canisterIds.reflectionDatabaseCanisterId), { responseType: 'json' })
	).data;
}

async function transactionExists(canisterId: string, hash: string): Promise<boolean> {
	return await (
		await axios.get(urlBuilder(canisterId, `skExists/transactionId:${hash}`), { responseType: 'json' })
	).data;
}

async function fetchTransactions(): Promise<Transaction[]> {
	const databases = await getDatabases();

	const transactionsArray = await Promise.all(
		databases.map(async database => (await axios.get<{ transactions: Transaction[] }>(urlBuilder(database, 'fetchTransactions/0/~'), { responseType: 'json' })).data)
	);
	let transactions = orderBy(
		flatMap(transactionsArray, a => a.transactions),
		t => t.timeStamp,
		'desc'
	);
	return transactions;
}

async function getTransaction(hash: string): Promise<Transaction> {
	const databases = await getDatabases();
	const result = await Promise.all(
		databases.map(async database => {
			const hasHash = await transactionExists(database, hash);
			return { hasHash, database };
		})
	);
	const database = result.find(r => r.hasHash)?.database;

	if (database) {
		return await (
			await axios.get(urlBuilder(database, `getTransaction/${hash}`), { responseType: 'json' })
		).data;
	} else {
		return Promise.reject();
	}
}

async function fetchSenderTransactions(principal: string): Promise<Transaction[]> {
	const databases = await getDatabases();

	const transactionsArray = await Promise.all(
		databases.map(async database => (await axios.get<{ transactions: Transaction[] }>(urlBuilder(database, `fetchSenderTransactions/${principal}/${principal}:~`), { responseType: 'json' })).data)
	);

	let transactions = flatMap(transactionsArray, a => a.transactions);
	return transactions;
}

async function fetchReceiverTransactions(principal: string): Promise<Transaction[]> {
	const databases = await getDatabases();

	const transactionsArray = await Promise.all(
		databases.map(
			async database => (await axios.get<{ transactions: Transaction[] }>(urlBuilder(database, `fetchReceiverTransactions/${principal}/${principal}:~`), { responseType: 'json' })).data
		)
	);

	let transactions = flatMap(transactionsArray, a => a.transactions);
	return transactions;
}

async function getBalance(principal: string): Promise<number> {
	return await (
		await axios.get(urlBuilder(canisterIds.tokenCanisterId, `balance/${principal}`), { responseType: 'json' })
	).data;
}

async function getBurnt(): Promise<number> {
	return await (
		await axios.get(urlBuilder(canisterIds.tokenCanisterId, `burnt/`), { responseType: 'json' })
	).data;
}

async function fetchReflections(): Promise<CombinedReflection[]> {
	const databases = await getReflectionDatabases();

	const reflectionsArray = await Promise.all(
		databases.map(async database => (await axios.get<{ reflections: Reflection[] }>(urlBuilder(database, 'fetchReflections/0/~'), { responseType: 'json' })).data)
	);

	let reflections = flatMap(reflectionsArray, a => a.reflections);
	let groupedReflections = groupBy(reflections, r => dateFromNano(BigInt(r.timestamp)).toFormat('dd-MM-yyyy HH'));
	let combinedReflections: CombinedReflection[] = Object.entries(groupedReflections).map(([k, v]) => ({ timestamp: k, amount: v.map(n => n.amount / 100000000).reduce((a, b) => a + b, 0) }));
	return combinedReflections;
}

async function getReflectionCount(): Promise<number> {
	return await (
		await axios.get(urlBuilder(canisterIds.tokenCanisterId, `reflectionCount`), { responseType: 'json' })
	).data;
}

async function getReflectionAmount(): Promise<number> {
	return await (
		await axios.get(urlBuilder(canisterIds.tokenCanisterId, `reflectionAmount`), { responseType: 'json' })
	).data;
}

export default {
	fetchTransactions,
	getTransaction,
	fetchReceiverTransactions,
	fetchSenderTransactions,
	getBalance,
	fetchReflections,
	getReflectionCount,
	getReflectionAmount,
	getBurnt,
	fetchAcceptedProposals,
	fetchTreasuryRequests,
	fetchRejectedProposals,
	getProposal,
	getVote
};
