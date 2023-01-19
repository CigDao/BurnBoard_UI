import { Principal } from "@dfinity/principal";
export interface Burner { 'burnedAmount' : bigint, 'earnedAmount' : bigint };
export type HeaderField = [string, string];
export interface Holder { 'holder' : string, 'amount' : bigint };
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
export interface _SERVICE {
  'burnFee' : (arg_0: Principal, arg_1: number) => Promise<undefined>,
  'burnIt' : (arg_0: Principal, arg_1: bigint) => Promise<undefined>,
  'distribute' : (
      arg_0: Principal,
      arg_1: bigint,
      arg_2: Array<Holder>,
    ) => Promise<undefined>,
  'fetchTopBurners' : () => Promise<Array<[Principal, Burner]>>,
  'getBurner' : (arg_0: Principal) => Promise<[] | [Burner]>,
  'getBurnerCount' : () => Promise<bigint>,
  'fetchBurners' : (arg_0: bigint, arg_1: bigint) => Promise<
      Array<[Principal, Burner]>
    >,
  'getCycles' : () => Promise<bigint>,
  'getHeapSize' : () => Promise<bigint>,
  'getMemorySize' : () => Promise<bigint>,
  'http_request' : (arg_0: Request) => Promise<Response>,
  'marketingFee' : (arg_0: number) => Promise<undefined>,
  'treasuryFee' : (arg_0: number) => Promise<undefined>,
  'updateBurnPercentage' : (arg_0: number) => Promise<undefined>,
  'updateMarketingPercentage' : (arg_0: number) => Promise<undefined>,
  'updateReflectionPercentage' : (arg_0: number) => Promise<undefined>,
  'updateTreasuryPercentage' : (arg_0: number) => Promise<undefined>,
};
export const idlFactory = ({ IDL }: any) => {
    const Holder = IDL.Record({ 'holder' : IDL.Text, 'amount' : IDL.Nat });
    const Burner = IDL.Record({
      'burnedAmount' : IDL.Nat,
      'earnedAmount' : IDL.Nat,
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
      'burnFee' : IDL.Func([IDL.Principal, IDL.Float64], [], []),
      'burnIt' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
      'distribute' : IDL.Func([IDL.Principal, IDL.Nat, IDL.Vec(Holder)], [], []),
      'fetchTopBurners' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Principal, Burner))],
          ['query'],
        ),
      'getBurner' : IDL.Func([IDL.Principal], [IDL.Opt(Burner)], ['query']),
      'fetchBurners' : IDL.Func(
          [IDL.Nat, IDL.Nat],
          [IDL.Vec(IDL.Tuple(IDL.Principal, Burner))],
          ['query'],
        ),
      'getBurnerCount' : IDL.Func([], [IDL.Nat], ['query']),
      'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
      'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
      'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
      'http_request' : IDL.Func([Request], [Response], ['query']),
      'marketingFee' : IDL.Func([IDL.Float64], [], []),
      'treasuryFee' : IDL.Func([IDL.Float64], [], []),
      'updateBurnPercentage' : IDL.Func([IDL.Float64], [], []),
      'updateMarketingPercentage' : IDL.Func([IDL.Float64], [], []),
      'updateReflectionPercentage' : IDL.Func([IDL.Float64], [], []),
      'updateTreasuryPercentage' : IDL.Func([IDL.Float64], [], []),
    });
  };