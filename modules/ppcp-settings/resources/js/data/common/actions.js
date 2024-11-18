/**
 * Action Creators: Define functions to create action objects.
 *
 * These functions update state or trigger side effects (e.g., async operations).
 * Exported functions must have unique names across all store modules.
 * Actions are categorized as Transient, Persistent, or Side effect.
 *
 * @file
 */

import ACTION_TYPES from './action-types';

/**
 * Transient. Marks the onboarding details as "ready", i.e., fully initialized.
 *
 * @param {boolean} isReady
 * @return {{type: string, isReady: boolean}} The action.
 */
export const setIsReady = ( isReady ) => {
	return {
		type: ACTION_TYPES.SET_TRANSIENT,
		isReady,
	};
};

/**
 * Transient. Changes the "saving" flag.
 *
 * @param {boolean} isSaving
 * @return {{type: string, isSaving: boolean}} The action.
 */
export const setIsSaving = ( isSaving ) => {
	return {
		type: ACTION_TYPES.SET_TRANSIENT,
		isSaving,
	};
};

/**
 * Persistent. Sets the sandbox mode on or off.
 *
 * @param {boolean} useSandbox
 * @return {{type: string, useSandbox: boolean}} An action.
 */
export const setSandboxMode = ( useSandbox ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		useSandbox,
	};
};

/**
 * Persistent. Toggles the "Manual Connection" mode on or off.
 *
 * @param {boolean} useManualConnection
 * @return {{type: string, useManualConnection: boolean}} An action.
 */
export const setManualConnectionMode = ( useManualConnection ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		useManualConnection,
	};
};

/**
 * Persistent. Changes the "client ID" value.
 *
 * @param {string} clientId
 * @return {{type: string, clientId: string}} The action.
 */
export const setClientId = ( clientId ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		clientId,
	};
};

/**
 * Persistent. Changes the "client secret" value.
 *
 * @param {string} clientSecret
 * @return {{type: string, clientSecret: string}} The action.
 */
export const setClientSecret = ( clientSecret ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		clientSecret,
	};
};

/**
 * Side effect. Saves the persistent details to the WP database.
 *
 * @return {{type: string}} The action.
 */
export function* commonPersist() {
	return {
		type: ACTION_TYPES.DO_PERSIST_DATA,
	};
}
