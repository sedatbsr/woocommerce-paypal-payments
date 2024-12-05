/**
 * Reducer: Defines store structure and state updates for this module.
 *
 * Manages both transient (temporary) and persistent (saved) state.
 * The initial state must define all properties, as dynamic additions are not supported.
 *
 * @file
 */

import { createReducer, createSetters } from '../utils';
import ACTION_TYPES from './action-types';

// Store structure.

const defaultTransient = {
	isReady: false,
	isBusy: false,

	// Read only values, provided by the server via hydrate.
	wooSettings: {
		storeCountry: '',
		storeCurrency: '',
	},
};

const defaultPersistent = {
	useSandbox: false,
	useManualConnection: false,
	clientId: '',
	clientSecret: '',
};

// Reducer logic.

const [ setTransient, setPersistent ] = createSetters(
	defaultTransient,
	defaultPersistent
);

const commonReducer = createReducer( defaultTransient, defaultPersistent, {
	[ ACTION_TYPES.SET_TRANSIENT ]: ( state, action ) =>
		setTransient( state, action ),

	[ ACTION_TYPES.SET_PERSISTENT ]: ( state, action ) =>
		setPersistent( state, action ),

	[ ACTION_TYPES.RESET ]: ( state ) => {
		const cleanState = setTransient(
			setPersistent( state, defaultPersistent ),
			defaultTransient
		);

		// Keep "read-only" details and initialization flags.
		cleanState.wooSettings = { ...state.wooSettings };
		cleanState.isReady = true;

		return cleanState;
	},

	[ ACTION_TYPES.HYDRATE ]: ( state, payload ) => {
		const newState = setPersistent( state, payload.data );

		if ( payload.wooSettings ) {
			newState.wooSettings = {
				...newState.wooSettings,
				...payload.wooSettings,
			};
		}

		return newState;
	},
} );

export default commonReducer;
