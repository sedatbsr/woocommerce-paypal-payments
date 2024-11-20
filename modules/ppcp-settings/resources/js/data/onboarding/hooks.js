/**
 * Hooks: Provide the main API for components to interact with the store.
 *
 * These encapsulate store interactions, offering a consistent interface.
 * Hooks simplify data access and manipulation for components.
 *
 * @file
 */

import { useSelect, useDispatch } from '@wordpress/data';

import { PRODUCT_TYPES } from '../constants';
import { STORE_NAME } from './constants';

const useTransient = ( key ) =>
	useSelect(
		( select ) => select( STORE_NAME ).transientData()?.[ key ],
		[ key ]
	);

const usePersistent = ( key ) =>
	useSelect(
		( select ) => select( STORE_NAME ).persistentData()?.[ key ],
		[ key ]
	);

const useOnboardingDetails = () => {
	const {
		persist,
		setStep,
		setCompleted,
		setSandboxMode,
		setManualConnectionMode,
		setClientId,
		setClientSecret,
		setIsCasualSeller,
		setProducts,
	} = useDispatch( STORE_NAME );

	// Read-only flags.
	const flags = useSelect( ( select ) => select( STORE_NAME ).flags(), [] );

	// Transient accessors.
	const isSaving = useTransient( 'isSaving' );
	const isReady = useTransient( 'isReady' );
	const isBusy = useTransient( 'isBusy' );

	// Persistent accessors.
	const step = usePersistent( 'step' );
	const completed = usePersistent( 'completed' );
	const clientId = usePersistent( 'clientId' );
	const clientSecret = usePersistent( 'clientSecret' );
	const isSandboxMode = usePersistent( 'useSandbox' );
	const isManualConnectionMode = usePersistent( 'useManualConnection' );
	const isCasualSeller = usePersistent( 'isCasualSeller' );
	const products = usePersistent( 'products' );

	const toggleProduct = ( list ) => {
		const validProducts = list.filter( ( item ) =>
			Object.values( PRODUCT_TYPES ).includes( item )
		);
		return setDetailAndPersist( setProducts, validProducts );
	};

	const setDetailAndPersist = async ( setter, value ) => {
		setter( value );
		await persist();
	};

	return {
		isSaving,
		isReady,
		isBusy,
		step,
		setStep: ( value ) => setDetailAndPersist( setStep, value ),
		completed,
		setCompleted: ( state ) => setDetailAndPersist( setCompleted, state ),
		isSandboxMode,
		setSandboxMode: ( state ) =>
			setDetailAndPersist( setSandboxMode, state ),
		isManualConnectionMode,
		setManualConnectionMode: ( state ) =>
			setDetailAndPersist( setManualConnectionMode, state ),
		clientId,
		setClientId: ( value ) => setDetailAndPersist( setClientId, value ),
		clientSecret,
		setClientSecret: ( value ) =>
			setDetailAndPersist( setClientSecret, value ),
		isCasualSeller,
		setIsCasualSeller: ( value ) =>
			setDetailAndPersist( setIsCasualSeller, value ),
		products,
		toggleProduct,
		flags,
	};
};

export const useConnection = () => {
	const {
		isSaving,
		isBusy,
		isSandboxMode,
		setSandboxMode,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = useOnboardingDetails();

	return {
		isSaving,
		isBusy,
		isSandboxMode,
		setSandboxMode,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	};
};

export const useBusiness = () => {
	const { isCasualSeller, setIsCasualSeller } = useOnboardingDetails();

	return { isCasualSeller, setIsCasualSeller };
};

export const useProducts = () => {
	const { products, toggleProduct } = useOnboardingDetails();

	return { products, toggleProduct };
};

export const useSteps = () => {
	const { isReady, step, setStep, completed, setCompleted, flags } =
		useOnboardingDetails();

	return { isReady, step, setStep, completed, setCompleted, flags };
};

export const useManualConnect = () => {
	const { connectViaIdAndSecret } = useDispatch( STORE_NAME );

	return {
		connectManual: connectViaIdAndSecret,
	};
};
