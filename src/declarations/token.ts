import type { Principal } from '@dfinity/principal';

export interface Burner { 'burnedAmount' : bigint, 'earnedAmount' : bigint };
export type HeaderField = [string, string];
export interface Metadata {
  'fee' : bigint,
  'decimals' : number,
  'owner' : Principal,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'symbol' : string,
};
export interface Request {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
};
export interface Response {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
};
export type StreamingCallback = (arg_0: StreamingCallbackToken) => Promise<
    StreamingCallbackResponse
  >;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
};
export interface StreamingCallbackToken {
  'key' : number,
  'sha256' : [] | [Array<number>],
  'index' : number,
  'content_encoding' : string,
};
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export type Time = bigint;
export interface TokenInfo {
  'holderNumber' : bigint,
  'deployTime' : Time,
  'metadata' : Metadata,
  'historySize' : bigint,
  'cycles' : bigint,
  'feeTo' : Principal,
};
export type TxReceipt = { 'Ok' : string } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export interface _SERVICE {
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'burn' : (arg_0: bigint) => Promise<TxReceipt>,
  'chargeTax' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'decimals' : () => Promise<number>,
  'distributeTransactions' : () => Promise<undefined>,
  'fetchBurners' : (arg_0: bigint, arg_1: bigint) => Promise<
      Array<[Principal, Burner]>
    >,
  'fetchTopBurners' : () => Promise<Array<[Principal, Burner]>>,
  'getAllowanceSize' : () => Promise<bigint>,
  'getBurner' : (arg_0: Principal) => Promise<[] | [Burner]>,
  'getBurnerCount' : () => Promise<bigint>,
  'getCreditor' : () => Promise<Principal>,
  'getCycles' : () => Promise<bigint>,
  'getHeapSize' : () => Promise<bigint>,
  'getHolders' : (arg_0: bigint, arg_1: bigint) => Promise<
      Array<[Principal, bigint]>
    >,
  'getMemorySize' : () => Promise<bigint>,
  'getMetadata' : () => Promise<Metadata>,
  'getTokenFee' : () => Promise<bigint>,
  'getTokenInfo' : () => Promise<TokenInfo>,
  'getUserApprovals' : (arg_0: Principal) => Promise<
      Array<[Principal, bigint]>
    >,
  'historySize' : () => Promise<bigint>,
  'http_request' : (arg_0: Request) => Promise<Response>,
  'logo' : () => Promise<string>,
  'mint' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'name' : () => Promise<string>,
  'setCreditors' : (arg_0: Principal) => Promise<undefined>,
  'setData' : (
      arg_0: Array<[Principal, Burner]>,
      arg_1: bigint,
      arg_2: bigint,
    ) => Promise<undefined>,
  'setFee' : (arg_0: bigint) => Promise<undefined>,
  'setFeeTo' : (arg_0: Principal) => Promise<undefined>,
  'setLogo' : (arg_0: string) => Promise<undefined>,
  'setName' : (arg_0: string) => Promise<undefined>,
  'setOwner' : (arg_0: Principal) => Promise<undefined>,
  'setTransactionChunkCount' : (arg_0: bigint) => Promise<undefined>,
  'setTransactionQueueDuration' : (arg_0: bigint) => Promise<undefined>,
  'setup' : () => Promise<TxReceipt>,
  'symbol' : () => Promise<string>,
  'taxTransfer' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'totalSupply' : () => Promise<bigint>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<TxReceipt>,
  'updateTransactionPercentage' : (arg_0: number) => Promise<undefined>,
};

export const idlFactory = ({ IDL }: any) => {
	const TxReceipt = IDL.Variant({
	  'Ok' : IDL.Text,
	  'Err' : IDL.Variant({
		'InsufficientAllowance' : IDL.Null,
		'InsufficientBalance' : IDL.Null,
		'ErrorOperationStyle' : IDL.Null,
		'Unauthorized' : IDL.Null,
		'LedgerTrap' : IDL.Null,
		'ErrorTo' : IDL.Null,
		'Other' : IDL.Text,
		'BlockUsed' : IDL.Null,
		'AmountTooSmall' : IDL.Null,
	  }),
	});
	const Burner = IDL.Record({
	  'burnedAmount' : IDL.Nat,
	  'earnedAmount' : IDL.Nat,
	});
	const Metadata = IDL.Record({
	  'fee' : IDL.Nat,
	  'decimals' : IDL.Nat8,
	  'owner' : IDL.Principal,
	  'logo' : IDL.Text,
	  'name' : IDL.Text,
	  'totalSupply' : IDL.Nat,
	  'symbol' : IDL.Text,
	});
	const Time = IDL.Int;
	const TokenInfo = IDL.Record({
	  'holderNumber' : IDL.Nat,
	  'deployTime' : Time,
	  'metadata' : Metadata,
	  'historySize' : IDL.Nat,
	  'cycles' : IDL.Nat,
	  'feeTo' : IDL.Principal,
	});
	const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
	const Request = IDL.Record({
	  'url' : IDL.Text,
	  'method' : IDL.Text,
	  'body' : IDL.Vec(IDL.Nat8),
	  'headers' : IDL.Vec(HeaderField),
	});
	const StreamingCallbackToken = IDL.Record({
	  'key' : IDL.Nat32,
	  'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
	  'index' : IDL.Nat32,
	  'content_encoding' : IDL.Text,
	});
	const StreamingCallbackResponse = IDL.Record({
	  'token' : IDL.Opt(StreamingCallbackToken),
	  'body' : IDL.Vec(IDL.Nat8),
	});
	const StreamingCallback = IDL.Func(
		[StreamingCallbackToken],
		[StreamingCallbackResponse],
		['query'],
	  );
	const StreamingStrategy = IDL.Variant({
	  'Callback' : IDL.Record({
		'token' : StreamingCallbackToken,
		'callback' : StreamingCallback,
	  }),
	});
	const Response = IDL.Record({
	  'body' : IDL.Vec(IDL.Nat8),
	  'headers' : IDL.Vec(HeaderField),
	  'streaming_strategy' : IDL.Opt(StreamingStrategy),
	  'status_code' : IDL.Nat16,
	});
	return IDL.Service({
	  'allowance' : IDL.Func(
		  [IDL.Principal, IDL.Principal],
		  [IDL.Nat],
		  ['query'],
		),
	  'approve' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
	  'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
	  'burn' : IDL.Func([IDL.Nat], [TxReceipt], []),
	  'chargeTax' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
	  'decimals' : IDL.Func([], [IDL.Nat8], ['query']),
	  'distributeTransactions' : IDL.Func([], [], []),
	  'fetchBurners' : IDL.Func(
		  [IDL.Nat, IDL.Nat],
		  [IDL.Vec(IDL.Tuple(IDL.Principal, Burner))],
		  ['query'],
		),
	  'fetchTopBurners' : IDL.Func(
		  [],
		  [IDL.Vec(IDL.Tuple(IDL.Principal, Burner))],
		  ['query'],
		),
	  'getAllowanceSize' : IDL.Func([], [IDL.Nat], ['query']),
	  'getBurner' : IDL.Func([IDL.Principal], [IDL.Opt(Burner)], ['query']),
	  'getBurnerCount' : IDL.Func([], [IDL.Nat], ['query']),
	  'getCreditor' : IDL.Func([], [IDL.Principal], ['query']),
	  'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
	  'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
	  'getHolders' : IDL.Func(
		  [IDL.Nat, IDL.Nat],
		  [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
		  ['query'],
		),
	  'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
	  'getMetadata' : IDL.Func([], [Metadata], ['query']),
	  'getTokenFee' : IDL.Func([], [IDL.Nat], ['query']),
	  'getTokenInfo' : IDL.Func([], [TokenInfo], ['query']),
	  'getUserApprovals' : IDL.Func(
		  [IDL.Principal],
		  [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
		  ['query'],
		),
	  'historySize' : IDL.Func([], [IDL.Nat], ['query']),
	  'http_request' : IDL.Func([Request], [Response], ['query']),
	  'logo' : IDL.Func([], [IDL.Text], ['query']),
	  'mint' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
	  'name' : IDL.Func([], [IDL.Text], ['query']),
	  'setCreditors' : IDL.Func([IDL.Principal], [], []),
	  'setData' : IDL.Func(
		  [IDL.Vec(IDL.Tuple(IDL.Principal, Burner)), IDL.Nat, IDL.Nat],
		  [],
		  [],
		),
	  'setFee' : IDL.Func([IDL.Nat], [], ['oneway']),
	  'setFeeTo' : IDL.Func([IDL.Principal], [], ['oneway']),
	  'setLogo' : IDL.Func([IDL.Text], [], ['oneway']),
	  'setName' : IDL.Func([IDL.Text], [], ['oneway']),
	  'setOwner' : IDL.Func([IDL.Principal], [], ['oneway']),
	  'setTransactionChunkCount' : IDL.Func([IDL.Nat], [], []),
	  'setTransactionQueueDuration' : IDL.Func([IDL.Nat], [], []),
	  'setup' : IDL.Func([], [TxReceipt], []),
	  'symbol' : IDL.Func([], [IDL.Text], ['query']),
	  'taxTransfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
	  'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
	  'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
	  'transferFrom' : IDL.Func(
		  [IDL.Principal, IDL.Principal, IDL.Nat],
		  [TxReceipt],
		  [],
		),
	  'updateTransactionPercentage' : IDL.Func([IDL.Float64], [], []),
	});
  };
