/**
 * Name of the module-store in the main Redux store.
 * Helps to isolate data.
 *
 * Used by: Reducer, Selector, Index
 *
 * @type {string}
 */
export const STORE_KEY = 'onboarding';

/**
 * REST path to persist data of this module to the WP DB.
 *
 * Used by: Controls
 * See: OnboardingRestEndpoint.php
 *
 * @type {string}
 */
export const REST_PERSIST_PATH = 'onboarding';

/**
 * REST path to perform the manual connection check, using client ID and secret,
 *
 * Used by: Controls
 * See: ConnectManualRestEndpoint.php
 *
 * @type {string}
 */
export const REST_MANUAL_CONNECTION_PATH = 'connect_manual';
