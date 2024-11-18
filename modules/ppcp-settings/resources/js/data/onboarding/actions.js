import ACTION_TYPES from './action-types';

/**
 * @typedef {Object} Action An action object that is handled by a reducer or control.
 * @property {string}  type    - The action type.
 * @property {Object?} payload - Optional payload for the action.
 */

/**
 * Special. Resets all values in the onboarding store to initial defaults.
 *
 * @return {{type: string}} The action.
 */
export const resetOnboarding = () => {
	return { type: ACTION_TYPES.RESET_ONBOARDING };
};

/**
 * Non-persistent. Marks the onboarding details as "ready", i.e., fully initialized.
 *
 * @param {boolean} isReady
 * @return {{type: string, isReady}} The action.
 */
export const setIsReady = ( isReady ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_IS_READY,
		isReady,
	};
};

/**
 * Non-persistent. Changes the "saving" flag.
 *
 * @param {boolean} isSaving
 * @return {{type: string, isSaving}} The action.
 */
export const setIsSaving = ( isSaving ) => {
	return {
		type: ACTION_TYPES.SET_IS_SAVING_ONBOARDING,
		isSaving,
	};
};

/**
 * Non-persistent. Changes the "manual connection is busy" flag.
 *
 * @param {boolean} isBusy
 * @return {{type: string, isBusy}} The action.
 */
export const setManualConnectionIsBusy = ( isBusy ) => {
	return {
		type: ACTION_TYPES.SET_MANUAL_CONNECTION_BUSY,
		isBusy,
	};
};

/**
 * Persistent. Set the full onboarding details, usually during app initialization.
 *
 * @param {{data: {}, flags?: {}}} payload
 * @return {{type: string, payload}} The action.
 */
export const setOnboardingDetails = ( payload ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_DETAILS,
		payload,
	};
};

/**
 * Persistent.Set the "onboarding completed" flag which shows or hides the wizard.
 *
 * @param {boolean} completed
 * @return {{type: string, payload}} The action.
 */
export const setCompleted = ( completed ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_COMPLETED,
		completed,
	};
};

/**
 * Persistent. Sets the onboarding wizard to a new step.
 *
 * @param {number} step
 * @return {{type: string, step}} An action.
 */
export const setOnboardingStep = ( step ) => {
	return {
		type: ACTION_TYPES.SET_ONBOARDING_STEP,
		step,
	};
};

/**
 * Persistent. Sets the sandbox mode on or off.
 *
 * @param {boolean} sandboxMode
 * @return {{type: string, useSandbox}} An action.
 */
export const setSandboxMode = ( sandboxMode ) => {
	return {
		type: ACTION_TYPES.SET_SANDBOX_MODE,
		useSandbox: sandboxMode,
	};
};

/**
 * Persistent. Toggles the "Manual Connection" mode on or off.
 *
 * @param {boolean} manualConnectionMode
 * @return {{type: string, useManualConnection}} An action.
 */
export const setManualConnectionMode = ( manualConnectionMode ) => {
	return {
		type: ACTION_TYPES.SET_MANUAL_CONNECTION_MODE,
		useManualConnection: manualConnectionMode,
	};
};

/**
 * Persistent. Changes the "client ID" value.
 *
 * @param {string} clientId
 * @return {{type: string, clientId}} The action.
 */
export const setClientId = ( clientId ) => {
	return {
		type: ACTION_TYPES.SET_CLIENT_ID,
		clientId,
	};
};

/**
 * Persistent. Changes the "client secret" value.
 *
 * @param {string} clientSecret
 * @return {{type: string, clientSecret}} The action.
 */
export const setClientSecret = ( clientSecret ) => {
	return {
		type: ACTION_TYPES.SET_CLIENT_SECRET,
		clientSecret,
	};
};

/**
 * Persistent. Sets the "isCasualSeller" value.
 *
 * @param {boolean} isCasualSeller
 * @return {{type: string, isCasualSeller}} The action.
 */
export const setIsCasualSeller = ( isCasualSeller ) => {
	return {
		type: ACTION_TYPES.SET_IS_CASUAL_SELLER,
		isCasualSeller,
	};
};

/**
 * Persistent. Sets the "products" array.
 *
 * @param {string[]} products
 * @return {{type: string, products}} The action.
 */
export const setProducts = ( products ) => {
	return {
		type: ACTION_TYPES.SET_PRODUCTS,
		products,
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
