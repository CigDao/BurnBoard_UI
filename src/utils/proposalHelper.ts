import { Canister, Proposal, RequestDraft, TaxType } from '@declarations/dao';

export interface IProposal {
	_type: string;
	type: string;
	id: number;
	nay: bigint;
	yay: bigint;
	title: string;
	creator: string;
	timeStamp: bigint;
	description: string;
	executed: boolean;
	executedAt?: bigint;
	taxType?: ITaxType;
	request?: IRequestDraft;
	source?: string;
	args?: Array<number>;
	hash?: string;
	wasm?: Array<number>;
	canister?: string;
}

export interface ITaxType {
	name: string;
	value: number;
}

export interface IRequestDraft {
	name: string;
	token?: 'YC' | 'ICP';
	recipient?: string;
	description?: string;
	amount?: bigint;
	principal?: string;
	power?: bigint;
}

export function getProposalType(proposal: Proposal): IProposal | undefined {
	if ('tax' in proposal) {
		return {
			_type: 'tax',
			type: 'Tax proposal',
			id: proposal.tax.id,
			args: undefined,
			canister: undefined,
			creator: proposal.tax.creator,
			description: proposal.tax.description,
			executed: proposal.tax.executed,
			hash: undefined,
			nay: proposal.tax.nay,
			request: undefined,
			source: undefined,
			taxType: getTaxType(proposal.tax.taxType),
			timeStamp: proposal.tax.timeStamp,
			title: proposal.tax.title,
			wasm: undefined,
			yay: proposal.tax.yay,
			executedAt: proposal.tax.executedAt[0]
		};
	}
	if ('treasuryAction' in proposal) {
		return {
			_type: 'treasuryAction',
			type: 'Treasury action',
			id: proposal.treasuryAction.id,
			args: undefined,
			canister: undefined,
			creator: proposal.treasuryAction.creator,
			description: proposal.treasuryAction.description,
			executed: proposal.treasuryAction.executed,
			hash: undefined,
			nay: proposal.treasuryAction.nay,
			request: getRequestDraft(proposal.treasuryAction.request),
			source: undefined,
			taxType: undefined,
			timeStamp: proposal.treasuryAction.timeStamp,
			title: proposal.treasuryAction.title,
			wasm: undefined,
			yay: proposal.treasuryAction.yay,
			executedAt: proposal.treasuryAction.executedAt[0]
		};
	}
	if ('upgrade' in proposal) {
		return {
			_type: 'upgrade',
			type: 'Upgrade proposal',
			id: proposal.upgrade.id,
			args: proposal.upgrade.args,
			canister: getCanister(proposal.upgrade.canister),
			creator: proposal.upgrade.creator,
			description: proposal.upgrade.description,
			executed: proposal.upgrade.executed,
			hash: proposal.upgrade.hash,
			nay: proposal.upgrade.nay,
			request: undefined,
			source: proposal.upgrade.source,
			taxType: undefined,
			timeStamp: proposal.upgrade.timeStamp,
			title: proposal.upgrade.title,
			wasm: proposal.upgrade.wasm,
			yay: proposal.upgrade.yay,
			executedAt: proposal.upgrade.executedAt[0]
		};
	}
	if ('proposalCost' in proposal) {
		return {
			_type: 'proposalCost',
			type: 'Costs proposal',
			id: proposal.proposalCost.id,
			args: undefined,
			canister: undefined,
			creator: proposal.proposalCost.creator,
			description: proposal.proposalCost.description,
			executed: proposal.proposalCost.executed,
			hash: undefined,
			nay: proposal.proposalCost.nay,
			request: undefined,
			source: undefined,
			taxType: undefined,
			timeStamp: proposal.proposalCost.timeStamp,
			title: proposal.proposalCost.title,
			wasm: undefined,
			yay: proposal.proposalCost.yay,
			executedAt: proposal.proposalCost.executedAt[0]
		};
	}
	if ('treasury' in proposal) {
		return {
			_type: 'treasury',
			type: 'Treasury proposal',
			id: proposal.treasury.id,
			args: undefined,
			canister: undefined,
			creator: proposal.treasury.creator,
			description: proposal.treasury.description,
			executed: proposal.treasury.executed,
			hash: undefined,
			nay: proposal.treasury.nay,
			request: undefined,
			source: undefined,
			taxType: undefined,
			timeStamp: proposal.treasury.timeStamp,
			title: proposal.treasury.title,
			wasm: undefined,
			yay: proposal.treasury.yay,
			executedAt: proposal.treasury.executedAt[0]
		};
	}
}

export function getTaxType(taxType: TaxType): ITaxType | undefined {
	if ('maxHolding' in taxType) {
		return {
			name: 'Max holding',
			value: taxType.maxHolding
		};
	}
	if ('marketing' in taxType) {
		return {
			name: 'Marketing',
			value: taxType.marketing
		};
	}
	if ('burn' in taxType) {
		return {
			name: 'Burn',
			value: taxType.burn
		};
	}
	if ('transaction' in taxType) {
		return {
			name: 'Transaction',
			value: taxType.transaction
		};
	}
	if ('reflection' in taxType) {
		return {
			name: 'Reflection',
			value: taxType.reflection
		};
	}
	if ('treasury' in taxType) {
		return {
			name: 'Treasury',
			value: taxType.treasury
		};
	}
}

export function getRequestDraft(requestDraft: RequestDraft): IRequestDraft | undefined {
	if ('threshold' in requestDraft) {
		return {
			name: 'Threshold',
			amount: BigInt(0),
			description: requestDraft.threshold.description,
			power: requestDraft.threshold.power,
			principal: undefined,
			recipient: undefined,
			token: undefined
		};
	}
	if ('removeMember' in requestDraft) {
		return {
			name: 'Remove member',
			amount: BigInt(0),
			description: requestDraft.removeMember.description,
			power: requestDraft.removeMember.power,
			principal: requestDraft.removeMember.principal,
			recipient: undefined,
			token: undefined
		};
	}
	if ('addMember' in requestDraft) {
		return {
			name: 'Add member',
			amount: BigInt(0),
			description: requestDraft.addMember.description,
			power: requestDraft.addMember.power,
			principal: requestDraft.addMember.principal,
			recipient: undefined,
			token: undefined
		};
	}
	if ('transfer' in requestDraft) {
		return {
			name: 'Transfer',
			amount: requestDraft.transfer.amount,
			description: requestDraft.transfer.description,
			power: BigInt(0),
			principal: undefined,
			recipient: requestDraft.transfer.recipient,
			token: 'yc' in requestDraft.transfer.token ? 'YC' : 'ICP'
		};
	}
}

export function getCanister(canister: Canister) {
	if ('dao' in canister) {
		return 'DAO';
	}
	if ('controller' in canister) {
		return 'Controller';
	}
	if ('community' in canister) {
		return 'Community';
	}
	if ('treasury' in canister) {
		return 'Treasury';
	}
}

// { dao: null } | { controller: null } | { community: null } | { treasury: null
// { threshold: ThresholdDraft } | { removeMember: MemberDraft } | { addMember: MemberDraft } | { transfer: TransferDraft };
// { maxHolding: number } | { marketing: number } | { burn: number } | { transaction: number } | { reflection: number } | { treasury: number }
// { tax: Tax } | { treasuryAction: TreasuryAction } | { upgrade: Upgrade } | { proposalCost: PropodalCost } | { treasury: Treasury }
