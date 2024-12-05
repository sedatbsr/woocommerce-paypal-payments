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

const useCommonConnectionLogic = () => {
	const { setCompleted } = OnboardingHooks.useSteps();
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );

	const handleServerError = ( res, genericMessage ) => {
		console.error( 'Connection error', res );
		createErrorNotice( res?.message ?? genericMessage );
	};

	const handleServerSuccess = () => {
		createSuccessNotice( MESSAGES.CONNECTED );
		return setCompleted( true );
	};

	return { handleServerError, handleServerSuccess, createErrorNotice };
};

export const useSandboxConnection = () => {
	const { connectToSandbox, isSandboxMode, setSandboxMode } =
		CommonHooks.useSandbox();
	const { handleServerError, createErrorNotice } = useCommonConnectionLogic();

	const handleSandboxConnect = async () => {
		const res = await connectToSandbox();

		if ( ! res.success || ! res.data ) {
			handleServerError( res, MESSAGES.SANDBOX_ERROR );
			return;
		}

		const connectionUrl = res.data;
		const popup = openPopup( connectionUrl );

		if ( ! popup ) {
			createErrorNotice( MESSAGES.POPUP_BLOCKED );
		}
	};

	return {
		handleSandboxConnect,
		isSandboxMode,
		setSandboxMode,
	};
};

export const useManualConnection = () => {
	const {
		connectViaIdAndSecret,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = CommonHooks.useManualConnection();
	const { handleServerError, handleServerSuccess, createErrorNotice } =
		useCommonConnectionLogic();

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
			await handleServerSuccess();
		} else {
			handleServerError( res, MESSAGES.MANUAL_ERROR );
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
