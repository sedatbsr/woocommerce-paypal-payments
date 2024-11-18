/**
 * Name of the module-store in the main Redux store.
 *
 * Helps to isolate data, used by reducer and selectors.
 *
 * @type {string}
 */
export const STORE_KEY = 'common';

/**
 * REST path to hydrate data of this module by loading data from the WP DB..
 *
 * Used by resolvers.
 *
 * @type {string}
 */
export const REST_HYDRATE_PATH = 'common';

/**
 * REST path to persist data of this module to the WP DB.
 *
 * Used by controls.
 *
 * @type {string}
 */
export const REST_PERSIST_PATH = 'common';
