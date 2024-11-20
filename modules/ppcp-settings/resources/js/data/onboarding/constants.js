/**
 * Name of the Redux store module.
 *
 * Used by: Reducer, Selector, Index
 *
 * @type {string}
 */
export const STORE_NAME = 'wc/paypal/onboarding';

/**
 * REST path to hydrate data of this module by loading data from the WP DB..
 *
 * Used by: Resolvers
 * See: OnboardingRestEndpoint.php
 *
 * @type {string}
 */
export const REST_HYDRATE_PATH = 'onboarding';

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
