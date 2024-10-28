import { useSelect, useDispatch } from '@wordpress/data';
import { STORE_NAME } from '../constants';

export const useOnboardingDetails = () => {
	const {
		persist,
		setSandboxMode,
		setManualConnectionMode,
		setClientId,
		setClientSecret,
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
