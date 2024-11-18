/**
 * Selectors: Extract specific pieces of state from the store.
 *
 * These functions provide a consistent interface for accessing store data.
 * They allow components to retrieve data without knowing the store structure.
 * Exported functions must have unique names across all store modules.
 *
 * @file
 */

import { STORE_KEY } from './constants';

const EMPTY_OBJ = Object.freeze( {} );

const getState = ( state ) => {
	if ( ! state ) {
		return EMPTY_OBJ;
	}

	return state[ STORE_KEY ] || EMPTY_OBJ;
};

export const onboardingPersistentData = ( state ) => {
	return getState( state ).data || EMPTY_OBJ;
};

export const onboardingTransientData = ( state ) => {
	const { data, flags, ...transientState } = getState( state );
	return transientState || EMPTY_OBJ;
};

export const onboardingFlags = ( state ) => {
	return getState( state ).flags || EMPTY_OBJ;
};
