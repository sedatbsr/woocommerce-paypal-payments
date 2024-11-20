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
};
