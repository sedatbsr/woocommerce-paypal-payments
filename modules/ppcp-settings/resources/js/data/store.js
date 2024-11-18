import { createReduxStore, register, combineReducers } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';
import { STORE_NAME } from './constants';

// Import Redux modules.
import * as Onboarding from './onboarding';

const actions = {};
const selectors = {};
const resolvers = {};

[ Onboarding ].forEach( ( item ) => {
	Object.assign( actions, { ...( item.actions || {} ) } );
	Object.assign( selectors, { ...( item.selectors || {} ) } );
	Object.assign( resolvers, { ...( item.resolvers || {} ) } );
	Object.assign( controls, { ...( item.controls || {} ) } );
} );

const reducer = combineReducers( {
	[ Onboarding.STORE_KEY ]: Onboarding.reducer,
} );

export const initStore = () => {
	const store = createReduxStore( STORE_NAME, {
		reducer,
		controls,
		actions,
		selectors,
		resolvers,
	} );

	register( store );

	addDebugTools();
};

const addDebugTools = () => {
	const context = window.ppcpSettings;

	// Provide a debug tool to inspect the Redux store via the JS console.
	if ( ! context?.debug ) {
		return;
	}

	const getSelectors = () => wp.data.select( STORE_NAME );
	const getActions = () => wp.data.dispatch( STORE_NAME );

	context.dumpStore = () => {
		/* eslint-disable no-console */
		if ( ! console?.groupCollapsed ) {
			console.error( 'console.groupCollapsed is not supported.' );
			return;
		}

		const storeSelector = `wp.data.select('${ STORE_NAME }')`;
		console.group( `[STORE] ${ storeSelector }` );

		const select = getSelectors();
		Object.keys( selectors ).forEach( ( selector ) => {
			console.groupCollapsed( `[SELECTOR] .${ selector }()` );
			console.table( select[ selector ]() );
			console.groupEnd();
		} );

		console.groupEnd();
		/* eslint-enable no-console */
	};

	context.resetStore = () => {
		const dispatch = getActions();

		dispatch.resetOnboarding();
		dispatch.persist();
	};

	context.startOnboarding = () => {
		const dispatch = getActions();

		dispatch.setCompleted( false );
		dispatch.setOnboardingStep( 0 );
		dispatch.persist();
	};
};
