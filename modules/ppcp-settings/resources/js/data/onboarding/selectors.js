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
