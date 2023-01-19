export function getErrorMessage(error: any) {
	if ('InsufficientAllowance' in error) {
		return 'Insufficient allowance';
	}
	if ('InsufficientBalance' in error) {
		return 'Insufficient balance';
	}
	if ('ActiveProposal' in error) {
		return 'There is already an active proposal';
	}
	if ('ErrorOperationStyle' in error) {
		return 'Something went wrong';
	}
	if ('Unauthorized' in error) {
		return 'Unauthorized to do this action';
	}
	if ('LedgerTrap' in error) {
		return 'Ledger trapped';
	}
	if ('ErrorTo' in error) {
	}
	if ('Other' in error) {
		return `Other: ${error.Other}`;
	}
	if ('BlockUsed' in error) {
		return 'Blocked';
	}
	if ('AmountTooSmall' in error) {
		return 'Amount to small';
	}

	return 'Something went wrong';
}
