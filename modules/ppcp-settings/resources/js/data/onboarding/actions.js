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
 * @typedef {Object} Action An action object that is handled by a reducer or control.
 * @property {string}  type    - The action type.
 * @property {Object?} payload - Optional payload for the action.
 */

/**
 * Special. Resets all values in the onboarding store to initial defaults.
 *
 * @return {Action} The action.
 */
export const resetOnboarding = () => {
	return { type: ACTION_TYPES.RESET };
};

/**
 * Transient. Marks the onboarding details as "ready", i.e., fully initialized.
 *
 * @param {boolean} isReady
 * @return {Action} The action.
 */
export const setIsReady = ( isReady ) => {
	return {
		type: ACTION_TYPES.SET_TRANSIENT,
		payload: { isReady },
	};
};

/**
 * Transient. Changes the "saving" flag.
 *
 * @param {boolean} isSaving
 * @return {Action} The action.
 */
export const setIsSaving = ( isSaving ) => {
	return {
		type: ACTION_TYPES.SET_TRANSIENT,
		payload: { isSaving },
	};
};

/**
 * Transient. Changes the "manual connection is busy" flag.
 *
 * @param {boolean} isBusy
 * @return {Action} The action.
 */
export const setManualConnectionIsBusy = ( isBusy ) => {
	return {
		type: ACTION_TYPES.SET_TRANSIENT,
		payload: { isBusy },
	};
};

/**
 * Persistent. Set the full onboarding details, usually during app initialization.
 *
 * @param {{data: {}, flags?: {}}} payload
 * @return {Action} The action.
 */
export const hydrateOnboardingDetails = ( payload ) => {
	return {
		type: ACTION_TYPES.HYDRATE,
		payload,
	};
};

/**
 * Persistent.Set the "onboarding completed" flag which shows or hides the wizard.
 *
 * @param {boolean} completed
 * @return {Action} The action.
 */
export const setCompleted = ( completed ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { completed },
	};
};

/**
 * Persistent. Sets the onboarding wizard to a new step.
 *
 * @param {number} step
 * @return {Action} The action.
 */
export const setOnboardingStep = ( step ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { step },
	};
};

/**
 * Persistent. Sets the sandbox mode on or off.
 *
 * @param {boolean} useSandbox
 * @return {Action} The action.
 */
export const setSandboxMode = ( useSandbox ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { useSandbox },
	};
};

/**
 * Persistent. Toggles the "Manual Connection" mode on or off.
 *
 * @param {boolean} useManualConnection
 * @return {Action} The action.
 */
export const setManualConnectionMode = ( useManualConnection ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { useManualConnection },
	};
};

/**
 * Persistent. Changes the "client ID" value.
 *
 * @param {string} clientId
 * @return {Action} The action.
 */
export const setClientId = ( clientId ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { clientId },
	};
};

/**
 * Persistent. Changes the "client secret" value.
 *
 * @param {string} clientSecret
 * @return {Action} The action.
 */
export const setClientSecret = ( clientSecret ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { clientSecret },
	};
};

/**
 * Persistent. Sets the "isCasualSeller" value.
 *
 * @param {boolean} isCasualSeller
 * @return {Action} The action.
 */
export const setIsCasualSeller = ( isCasualSeller ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { isCasualSeller },
	};
};

/**
 * Persistent. Sets the "products" array.
 *
 * @param {string[]} products
 * @return {Action} The action.
 */
export const setProducts = ( products ) => {
	return {
		type: ACTION_TYPES.SET_PERSISTENT,
		payload: { products },
	};
};

/**
 * Side effect. Triggers the persistence of onboarding data to the server.
 *
 * @return {Action} The action.
 */
export const persist = () => {
	return {
		type: ACTION_TYPES.DO_PERSIST_DATA,
	};
};

/**
 * Side effect. Initiates a manual connection attempt using the provided client ID and secret.
 *
 * @return {Action} The action.
 */
export const connectViaIdAndSecret = () => {
	return {
		type: ACTION_TYPES.DO_MANUAL_CONNECTION,
	};
};
