import { STORE_KEY } from './constants';

const EMPTY_OBJ = Object.freeze( {} );

const getState = ( state ) => {
	if ( ! state ) {
		return EMPTY_OBJ;
	}

	return state[ STORE_KEY ] || EMPTY_OBJ;
};

export const getPersistentData = ( state ) => {
	return getState( state ).data || EMPTY_OBJ;
};

export const getTransientData = ( state ) => {
	const { data, flags, ...transientState } = getState( state );
	return transientState || EMPTY_OBJ;
};

export const getFlags = ( state ) => {
	return getState( state ).flags || EMPTY_OBJ;
};
