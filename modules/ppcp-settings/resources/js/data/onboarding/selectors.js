/**
 * Selectors: Extract specific pieces of state from the store.
 *
 * These functions provide a consistent interface for accessing store data.
 * They allow components to retrieve data without knowing the store structure.
 *
 * @file
 */

const EMPTY_OBJ = Object.freeze( {} );

const getState = ( state ) => state || EMPTY_OBJ;

export const persistentData = ( state ) => {
	return getState( state ).data || EMPTY_OBJ;
};

export const transientData = ( state ) => {
	const { data, flags, ...transientState } = getState( state );
	return transientState || EMPTY_OBJ;
};

export const flags = ( state ) => {
	return getState( state ).flags || EMPTY_OBJ;
};

/**
 * Returns the products that we use for the production login link in the last onboarding step.
 *
 * This selector does not return state-values, but uses the state to derive the products-array
 * that should be returned.
 *
 * @param {{}} state
 * @return {string[]} The ISU products, based on choices made in the onboarding wizard.
 */
export const determineProducts = ( state ) => {
	const derivedProducts = [];

	return derivedProducts;
};
