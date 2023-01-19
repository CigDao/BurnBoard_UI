import { Principal } from '@dfinity/principal';

export type ErrorMessage = { message: string };
export type HeaderField = [string, string];
export interface MemberDraft {
	principal: string;
	description: string;
	power: bigint;
}
export interface MemberResponse {
	id: number;
	principal: string;
	executedAt: [] | [Time];
	createdAt: Time;
	description: string;
	error: [] | [string];
	executed: boolean;
	power: bigint;
	proposalId: number;
}
export interface Request {
	url: string;
	method: string;
	body: Array<number>;
	headers: Array<HeaderField>;
}
export type RequestDraft =
	| { threshold: ThresholdDraft }
	| { addLiquidity: TransferDraft }
	| { swapFor: TransferDraft }
	| { removeMember: MemberDraft }
	| { addMember: MemberDraft }
	| { withdrawLiquidity: WithdrawLiquidityDraft }
	| { transfer: TransferDraft };
export type RequestResponse =
	| { threshold: ThresholdResponse }
	| { addLiquidity: TransferResponse }
	| { swapFor: TransferResponse }
	| { removeMember: MemberResponse }
	| { addMember: MemberResponse }
	| { withdrawLiquidity: WithdrawLiquidityResponse }
	| { transfer: TransferResponse };
export interface Response {
	body: Array<number>;
	headers: Array<HeaderField>;
	streaming_strategy: [] | [StreamingStrategy];
	status_code: number;
}
export type Result = { ok: null } | { err: ErrorMessage };
export type StreamingCallback = (arg_0: StreamingCallbackToken) => Promise<StreamingCallbackResponse>;
export interface StreamingCallbackResponse {
	token: [] | [StreamingCallbackToken];
	body: Array<number>;
}
export interface StreamingCallbackToken {
	key: number;
	sha256: [] | [Array<number>];
	index: number;
	content_encoding: string;
}
export type StreamingStrategy = {
	Callback: {
		token: StreamingCallbackToken;
		callback: StreamingCallback;
	};
};
export interface ThresholdDraft {
	description: string;
	power: bigint;
}
export interface ThresholdResponse {
	id: number;
	executedAt: [] | [Time];
	createdAt: Time;
	description: string;
	error: [] | [string];
	executed: boolean;
	power: bigint;
	proposalId: number;
}
export type Time = bigint;
export type Token = { yc: null } | { icp: null };
export interface TransferDraft {
	token: Token;
	recipient: string;
	description: string;
	amount: bigint;
}
export interface TransferResponse {
	id: number;
	token: Token;
	executedAt: [] | [Time];
	createdAt: Time;
	recipient: string;
	description: string;
	error: [] | [string];
	executed: boolean;
	amount: bigint;
	proposalId: number;
}
export interface WithdrawLiquidityDraft {
	recipient: string;
	description: string;
	amount: bigint;
}
export interface WithdrawLiquidityResponse {
	id: number;
	executedAt: [] | [Time];
	createdAt: Time;
	description: string;
	error: [] | [string];
	executed: boolean;
	amount: bigint;
	proposalId: number;
}
export interface _SERVICE {
	approveRequest: (arg_0: number) => Promise<Result>;
	createRequest: (arg_0: number, arg_1: RequestDraft) => Promise<number>;
	fetchMembers: () => Promise<Array<[Principal, bigint]>>;
	fetchRequests: () => Promise<Array<RequestResponse>>;
	getCycles: () => Promise<bigint>;
	getHeapSize: () => Promise<bigint>;
	getMemorySize: () => Promise<bigint>;
	getThreshold: () => Promise<bigint>;
	http_request: (arg_0: Request) => Promise<Response>;
}

export const idlFactory = ({ IDL }: any) => {
	const ErrorMessage = IDL.Variant({ message: IDL.Text });
	const Result = IDL.Variant({ ok: IDL.Null, err: ErrorMessage });
	const ThresholdDraft = IDL.Record({
		description: IDL.Text,
		power: IDL.Nat
	});
	const Token = IDL.Variant({ yc: IDL.Null, icp: IDL.Null });
	const TransferDraft = IDL.Record({
		token: Token,
		recipient: IDL.Text,
		description: IDL.Text,
		amount: IDL.Nat
	});
	const MemberDraft = IDL.Record({
		principal: IDL.Text,
		description: IDL.Text,
		power: IDL.Nat
	});
	const WithdrawLiquidityDraft = IDL.Record({
		recipient: IDL.Text,
		description: IDL.Text,
		amount: IDL.Nat
	});
	const RequestDraft = IDL.Variant({
		threshold: ThresholdDraft,
		addLiquidity: TransferDraft,
		swapFor: TransferDraft,
		removeMember: MemberDraft,
		addMember: MemberDraft,
		withdrawLiquidity: WithdrawLiquidityDraft,
		transfer: TransferDraft
	});
	const Time = IDL.Int;
	const ThresholdResponse = IDL.Record({
		id: IDL.Nat32,
		executedAt: IDL.Opt(Time),
		createdAt: Time,
		description: IDL.Text,
		error: IDL.Opt(IDL.Text),
		executed: IDL.Bool,
		power: IDL.Nat,
		proposalId: IDL.Nat32
	});
	const TransferResponse = IDL.Record({
		id: IDL.Nat32,
		token: Token,
		executedAt: IDL.Opt(Time),
		createdAt: Time,
		recipient: IDL.Text,
		description: IDL.Text,
		error: IDL.Opt(IDL.Text),
		executed: IDL.Bool,
		amount: IDL.Nat,
		proposalId: IDL.Nat32
	});
	const MemberResponse = IDL.Record({
		id: IDL.Nat32,
		principal: IDL.Text,
		executedAt: IDL.Opt(Time),
		createdAt: Time,
		description: IDL.Text,
		error: IDL.Opt(IDL.Text),
		executed: IDL.Bool,
		power: IDL.Nat,
		proposalId: IDL.Nat32
	});
	const WithdrawLiquidityResponse = IDL.Record({
		id: IDL.Nat32,
		executedAt: IDL.Opt(Time),
		createdAt: Time,
		description: IDL.Text,
		error: IDL.Opt(IDL.Text),
		executed: IDL.Bool,
		amount: IDL.Nat,
		proposalId: IDL.Nat32
	});
	const RequestResponse = IDL.Variant({
		threshold: ThresholdResponse,
		addLiquidity: TransferResponse,
		swapFor: TransferResponse,
		removeMember: MemberResponse,
		addMember: MemberResponse,
		withdrawLiquidity: WithdrawLiquidityResponse,
		transfer: TransferResponse
	});
	const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
	const Request = IDL.Record({
		url: IDL.Text,
		method: IDL.Text,
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(HeaderField)
	});
	const StreamingCallbackToken = IDL.Record({
		key: IDL.Nat32,
		sha256: IDL.Opt(IDL.Vec(IDL.Nat8)),
		index: IDL.Nat32,
		content_encoding: IDL.Text
	});
	const StreamingCallbackResponse = IDL.Record({
		token: IDL.Opt(StreamingCallbackToken),
		body: IDL.Vec(IDL.Nat8)
	});
	const StreamingCallback = IDL.Func([StreamingCallbackToken], [StreamingCallbackResponse], ['query']);
	const StreamingStrategy = IDL.Variant({
		Callback: IDL.Record({
			token: StreamingCallbackToken,
			callback: StreamingCallback
		})
	});
	const Response = IDL.Record({
		body: IDL.Vec(IDL.Nat8),
		headers: IDL.Vec(HeaderField),
		streaming_strategy: IDL.Opt(StreamingStrategy),
		status_code: IDL.Nat16
	});
	return IDL.Service({
		approveRequest: IDL.Func([IDL.Nat32], [Result], []),
		createRequest: IDL.Func([IDL.Nat32, RequestDraft], [IDL.Nat32], []),
		fetchMembers: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))], ['query']),
		fetchRequests: IDL.Func([], [IDL.Vec(RequestResponse)], ['query']),
		getCycles: IDL.Func([], [IDL.Nat], ['query']),
		getHeapSize: IDL.Func([], [IDL.Nat], ['query']),
		getMemorySize: IDL.Func([], [IDL.Nat], ['query']),
		getThreshold: IDL.Func([], [IDL.Nat], ['query']),
		http_request: IDL.Func([Request], [Response], ['query'])
	});
};
