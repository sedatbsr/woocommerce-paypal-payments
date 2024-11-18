import { createReducer, createSetters } from '../utils';
import ACTION_TYPES from './action-types';

// Store structure.

const defaultTransient = {
	isReady: false,
	isSaving: false,
	isManualConnectionBusy: false,

	// Read only values, provided by the server.
	flags: {
		canUseCasualSelling: false,
		canUseVaulting: false,
		canUseCardPayments: false,
	},
};

const defaultPersistent = {
	completed: false,
	step: 0,
	useSandbox: false,
	useManualConnection: false,
	clientId: '',
	clientSecret: '',
	isCasualSeller: null, // null value will uncheck both options in the UI.
	products: [],
};

// Reducer logic.

const [ setTransient, setPersistent ] = createSetters(
	defaultTransient,
	defaultPersistent
);

const defaultState = {
	...defaultTransient,
	data: { ...defaultPersistent },
};

export const onboardingReducer = (
	state = defaultState,
	{ type, ...action }
) => {
	switch ( type ) {
		// Reset store to initial state.
		case ACTION_TYPES.RESET_ONBOARDING:
			return setPersistent( defaultState.data );

		// Transient data.
		case ACTION_TYPES.SET_ONBOARDING_IS_READY:
			return setTransient( { isReady: action.isReady } );

		case ACTION_TYPES.SET_IS_SAVING_ONBOARDING:
			return setTransient( { isSaving: action.isSaving } );

		case ACTION_TYPES.SET_MANUAL_CONNECTION_BUSY:
			return setTransient( { isManualConnectionBusy: action.isBusy } );

		// Persistent data.
		case ACTION_TYPES.SET_ONBOARDING_DETAILS:
			const newState = setPersistent( action.payload.data );

			if ( action.payload.flags ) {
				newState.flags = { ...newState.flags, ...action.payload.flags };
			}

			return newState;

		case ACTION_TYPES.SET_ONBOARDING_COMPLETED:
			return setPersistent( { completed: action.completed } );

		case ACTION_TYPES.SET_CLIENT_ID:
			return setPersistent( { clientId: action.clientId } );

		case ACTION_TYPES.SET_CLIENT_SECRET:
			return setPersistent( { clientSecret: action.clientSecret } );

		case ACTION_TYPES.SET_ONBOARDING_STEP:
			return setPersistent( { step: action.step } );

		case ACTION_TYPES.SET_SANDBOX_MODE:
			return setPersistent( { useSandbox: action.useSandbox } );

		case ACTION_TYPES.SET_MANUAL_CONNECTION_MODE:
			return setPersistent( {
				useManualConnection: action.useManualConnection,
			} );

		case ACTION_TYPES.SET_IS_CASUAL_SELLER:
			return setPersistent( { isCasualSeller: action.isCasualSeller } );

		case ACTION_TYPES.SET_PRODUCTS:
			return setPersistent( { products: action.products } );

		default:
			return state;
	}
};

export default onboardingReducer;
