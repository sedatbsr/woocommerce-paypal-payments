/**
 * Action Creators: Define functions to create action objects.
 *
 * These functions update state or trigger side effects (e.g., async operations).
 * Actions are categorized as Transient, Persistent, or Side effect.
 *
 * @file
 */

import ACTION_TYPES from './action-types';

/**
 * @typedef {Object} Action An action object that is handled by a reducer or control.
 * @property {string}  type    - The action type.
 * @property {Object?} payload - Optional payload for the action.
 */

/**
 * Transient. Marks the onboarding details as "ready", i.e., fully initialized.
 *
 * @param {boolean} isReady
 * @return {Action} The action.
 */
export const setIsReady = ( isReady ) => ( {
	type: ACTION_TYPES.SET_TRANSIENT,
	payload: { isReady },
} );

/**
 * Transient. Changes the "saving" flag.
 *
 * @param {boolean} isSaving
 * @return {Action} The action.
 */
export const setIsSaving = ( isSaving ) => ( {
	type: ACTION_TYPES.SET_TRANSIENT,
	payload: { isSaving },
} );

/**
 * Transient. Changes the "manual connection is busy" flag.
 *
 * @param {boolean} isBusy
 * @return {Action} The action.
 */
export const setIsBusy = ( isBusy ) => ( {
	type: ACTION_TYPES.SET_TRANSIENT,
	payload: { isBusy },
} );

/**
 * Persistent. Sets the sandbox mode on or off.
 *
 * @param {boolean} useSandbox
 * @return {Action} The action.
 */
export const setSandboxMode = ( useSandbox ) => ( {
	type: ACTION_TYPES.SET_PERSISTENT,
	payload: { useSandbox },
} );

/**
 * Persistent. Toggles the "Manual Connection" mode on or off.
 *
 * @param {boolean} useManualConnection
 * @return {Action} The action.
 */
export const setManualConnectionMode = ( useManualConnection ) => ( {
	type: ACTION_TYPES.SET_PERSISTENT,
	payload: { useManualConnection },
} );

/**
 * Persistent. Changes the "client ID" value.
 *
 * @param {string} clientId
 * @return {Action} The action.
 */
export const setClientId = ( clientId ) => ( {
	type: ACTION_TYPES.SET_PERSISTENT,
	payload: { clientId },
} );

/**
 * Persistent. Changes the "client secret" value.
 *
 * @param {string} clientSecret
 * @return {Action} The action.
 */
export const setClientSecret = ( clientSecret ) => ( {
	type: ACTION_TYPES.SET_PERSISTENT,
	payload: { clientSecret },
} );

/**
 * Side effect. Saves the persistent details to the WP database.
 *
 * @return {Action} The action.
 */
export const persist = function* () {
	yield setIsBusy( true );
	yield {
		type: ACTION_TYPES.DO_PERSIST_DATA,
	};
	yield setIsBusy( false );
};
