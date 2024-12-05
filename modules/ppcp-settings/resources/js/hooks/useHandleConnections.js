import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import { CommonHooks, OnboardingHooks } from '../data';
import { openPopup } from '../utils/window';

const MESSAGES = {
	CONNECTED: __( 'Connected to PayPal', 'woocommerce-paypal-payments' ),
	POPUP_BLOCKED: __(
		'Popup blocked. Please allow popups for this site to connect to PayPal.',
		'woocommerce-paypal-payments'
	),
	SANDBOX_ERROR: __(
		'Could not generate a Sandbox login link.',
		'woocommerce-paypal-payments'
	),
	PRODUCTION_ERROR: __(
		'Could not generate a login link.',
		'woocommerce-paypal-payments'
	),
	MANUAL_ERROR: __(
		'Could not connect to PayPal. Please make sure your Client ID and Secret Key are correct.',
		'woocommerce-paypal-payments'
	),
};

const handlePopupWithCompletion = ( url, onError ) => {
	return new Promise( ( resolve ) => {
		const popup = openPopup( url );

		if ( ! popup ) {
			onError( MESSAGES.POPUP_BLOCKED );
			resolve( false );
			return;
		}

		// Check popup state every 500ms
		const checkPopup = setInterval( () => {
			if ( popup.closed ) {
				clearInterval( checkPopup );
				resolve( true );
			}
		}, 500 );

		return () => {
			clearInterval( checkPopup );

			if ( popup && ! popup.closed ) {
				popup.close();
			}
		};
	} );
};

const useConnectionBase = () => {
	const { setCompleted } = OnboardingHooks.useSteps();
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );

	return {
		handleError: ( res, genericMessage ) => {
			console.error( 'Connection error', res );
			createErrorNotice( res?.message ?? genericMessage );
		},
		handleSuccess: async () => {
			createSuccessNotice( MESSAGES.CONNECTED );

			// TODO: Contact the plugin to confirm onboarding is completed.
			return setCompleted( true );
		},
		createErrorNotice,
	};
};

const useConnectionAttempt = ( connectFn, errorMessage ) => {
	const { handleError, createErrorNotice, handleSuccess } =
		useConnectionBase();

	return async ( ...args ) => {
		const res = await connectFn( ...args );

		if ( ! res.success || ! res.data ) {
			handleError( res, errorMessage );
			return false;
		}

		const popupClosed = await handlePopupWithCompletion(
			res.data,
			createErrorNotice
		);

		if ( popupClosed ) {
			await handleSuccess();
		}

		return popupClosed;
	};
};

export const useSandboxConnection = () => {
	const { connectToSandbox, isSandboxMode, setSandboxMode } =
		CommonHooks.useSandbox();
	const handleSandboxConnect = useConnectionAttempt(
		connectToSandbox,
		MESSAGES.SANDBOX_ERROR
	);

	return {
		handleSandboxConnect,
		isSandboxMode,
		setSandboxMode,
	};
};

export const useProductionConnection = () => {
	const { connectToProduction } = CommonHooks.useProduction();
	const products = OnboardingHooks.useDetermineProducts();
	const handleProductionConnect = useConnectionAttempt(
		() => connectToProduction( products ),
		MESSAGES.PRODUCTION_ERROR
	);

	return { handleProductionConnect };
};

export const useManualConnection = () => {
	const { handleError, handleSuccess, createErrorNotice } =
		useConnectionBase();
	const {
		connectViaIdAndSecret,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = CommonHooks.useManualConnection();

	const handleConnectViaIdAndSecret = async ( { validation } = {} ) => {
		if ( 'function' === typeof validation ) {
			try {
				validation();
			} catch ( exception ) {
				createErrorNotice( exception.message );
				return;
			}
		}

		const res = await connectViaIdAndSecret();

		if ( res.success ) {
			await handleSuccess();
		} else {
			handleError( res, MESSAGES.MANUAL_ERROR );
		}
	};

	return {
		handleConnectViaIdAndSecret,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	};
};
