/**
 * Hooks: Provide the main API for components to interact with the store.
 *
 * These encapsulate store interactions, offering a consistent interface.
 * Hooks simplify data access and manipulation for components.
 * Exported hooks must have unique names across all store modules.
 *
 * @file
 */

import { useSelect, useDispatch } from '@wordpress/data';

import { PRODUCT_TYPES, STORE_NAME } from '../constants';

const useOnboardingDetails = () => {
	const {
		persist,
		setOnboardingStep,
		setCompleted,
		setSandboxMode,
		setManualConnectionMode,
		setClientId,
		setClientSecret,
		setIsCasualSeller,
		setProducts,
	} = useDispatch( STORE_NAME );

	const transientData = ( select ) =>
		select( STORE_NAME ).onboardingTransientData();
	const persistentData = ( select ) =>
		select( STORE_NAME ).onboardingPersistentData();

	// Read-only flags.
	const flags = useSelect( ( select ) => {
		return select( STORE_NAME ).onboardingFlags();
	} );

	// Transient accessors.
	const isSaving = useSelect( ( select ) => {
		return transientData( select ).isSaving;
	}, [] );

	const isReady = useSelect( ( select ) => {
		return transientData( select ).isReady;
	} );

	const isManualConnectionBusy = useSelect( ( select ) => {
		return transientData( select ).isManualConnectionBusy;
	}, [] );

	// Persistent accessors.
	const step = useSelect( ( select ) => {
		return persistentData( select ).step || 0;
	} );

	const completed = useSelect( ( select ) => {
		return persistentData( select ).completed;
	} );

	const clientId = useSelect( ( select ) => {
		return persistentData( select ).clientId;
	}, [] );

	const clientSecret = useSelect( ( select ) => {
		return persistentData( select ).clientSecret;
	}, [] );

	const isSandboxMode = useSelect( ( select ) => {
		return persistentData( select ).useSandbox;
	}, [] );

	const isManualConnectionMode = useSelect( ( select ) => {
		return persistentData( select ).useManualConnection;
	}, [] );

	const isCasualSeller = useSelect( ( select ) => {
		return persistentData( select ).isCasualSeller;
	}, [] );

	const products = useSelect( ( select ) => {
		return persistentData( select ).products || [];
	}, [] );

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
		isManualConnectionBusy,
		step,
		setStep: ( value ) => setDetailAndPersist( setOnboardingStep, value ),
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

export const useOnboardingStepWelcome = () => {
	const {
		isSaving,
		isManualConnectionBusy,
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
		isManualConnectionBusy,
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

export const useOnboardingStepBusiness = () => {
	const { isCasualSeller, setIsCasualSeller } = useOnboardingDetails();

	return { isCasualSeller, setIsCasualSeller };
};

export const useOnboardingStepProducts = () => {
	const { products, toggleProduct } = useOnboardingDetails();

	return { products, toggleProduct };
};

export const useOnboardingStep = () => {
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
