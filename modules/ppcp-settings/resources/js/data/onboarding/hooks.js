import { useSelect, useDispatch } from '@wordpress/data';
import { PRODUCT_TYPES, STORE_NAME } from '../constants';

export const useOnboardingDetails = () => {
	const {
		persist,
		setSandboxMode,
		setManualConnectionMode,
		setClientId,
		setClientSecret,
		setIsCasualSeller,
		setProducts,
	} = useDispatch( STORE_NAME );

	// Transient accessors.
	const isSaving = useSelect( ( select ) => {
		return select( STORE_NAME ).getTransientData().isSaving;
	}, [] );

	// Persistent accessors.
	const clientId = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().clientId;
	}, [] );

	const clientSecret = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().clientSecret;
	}, [] );

	const isSandboxMode = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().useSandbox;
	}, [] );

	const isManualConnectionMode = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().useManualConnection;
	}, [] );

	const isCasualSeller = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().isCasualSeller;
	}, [] );

	const products = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().products || [];
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
		isSandboxMode,
		isManualConnectionMode,
		clientId,
		setClientId: ( value ) => setDetailAndPersist( setClientId, value ),
		clientSecret,
		setClientSecret: ( value ) =>
			setDetailAndPersist( setClientSecret, value ),
		setSandboxMode: ( state ) =>
			setDetailAndPersist( setSandboxMode, state ),
		setManualConnectionMode: ( state ) =>
			setDetailAndPersist( setManualConnectionMode, state ),
		isCasualSeller,
		setIsCasualSeller: ( value ) =>
			setDetailAndPersist( setIsCasualSeller, value ),
		products,
		toggleProduct,
	};
};

export const useOnboardingStep = () => {
	const { persist, setOnboardingStep, setCompleted } =
		useDispatch( STORE_NAME );

	const isReady = useSelect( ( select ) => {
		return select( STORE_NAME ).getTransientData().isReady;
	} );

	const step = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().step || 0;
	} );

	const completed = useSelect( ( select ) => {
		return select( STORE_NAME ).getPersistentData().completed;
	} );

	const setDetailAndPersist = async ( setter, value ) => {
		setter( value );
		await persist();
	};

	return {
		isReady,
		step,
		setStep: ( value ) => setDetailAndPersist( setOnboardingStep, value ),
		completed,
		setCompleted: ( state ) => setDetailAndPersist( setCompleted, state ),
	};
};
