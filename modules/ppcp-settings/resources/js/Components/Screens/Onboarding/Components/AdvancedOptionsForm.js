import { __, sprintf } from '@wordpress/i18n';
import { Button, TextControl } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import SettingsToggleBlock from '../../../ReusableComponents/SettingsToggleBlock';
import Separator from '../../../ReusableComponents/Separator';
import DataStoreControl from '../../../ReusableComponents/DataStoreControl';
import { CommonHooks } from '../../../../data';

const AdvancedOptionsForm = ( { setCompleted } ) => {
	const { isBusy } = CommonHooks.useBusyState();
	const { isSandboxMode, setSandboxMode, connectViaSandbox } =
		CommonHooks.useSandbox();
	const {
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
		connectViaIdAndSecret,
	} = CommonHooks.useManualConnection();

	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );
	const refClientId = useRef( null );
	const refClientSecret = useRef( null );

	const handleFormValidation = () => {
		const fields = [
			{
				ref: refClientId,
				value: clientId,
				errorMessage: __(
					'Please enter your Client ID',
					'woocommerce-paypal-payments'
				),
			},
			{
				ref: refClientSecret,
				value: clientSecret,
				errorMessage: __(
					'Please enter your Secret Key',
					'woocommerce-paypal-payments'
				),
			},
		];

		for ( const { ref, value, errorMessage } of fields ) {
			if ( value ) {
				continue;
			}

			ref?.current?.focus();
			createErrorNotice( errorMessage );
			return false;
		}

		return true;
	};

	const handleServerError = ( res, genericMessage ) => {
		console.error( 'Connection error', res );
		createErrorNotice( res?.message ?? genericMessage );
	};

	const handleServerSuccess = () => {
		createSuccessNotice(
			__( 'Connected to PayPal', 'woocommerce-paypal-payments' )
		);

		setCompleted( true );
	};

	const handleSandboxConnect = async () => {
		const res = await connectViaSandbox();

		if ( ! res.success || ! res.data ) {
			handleServerError(
				res,
				__(
					'Could not generate a Sandbox login link.',
					'woocommerce-paypal-payments'
				)
			);
			return;
		}
	};

	const handleConnect = async () => {
		if ( ! handleFormValidation() ) {
			return;
		}

		const res = await connectViaIdAndSecret();

		if ( res.success ) {
			handleServerSuccess();
		} else {
			handleServerError(
				res,
				__(
					'Could not connect to PayPal. Please make sure your Client ID and Secret Key are correct.',
					'woocommerce-paypal-payments'
				)
			);
		}
	};

	const advancedUsersDescription = sprintf(
		// translators: %s: Link to PayPal REST application guide
		__(
			'For advanced users: Connect a custom PayPal REST app for full control over your integration. For more information on creating a PayPal REST application, <a target="_blank" href="%s">click here</a>.',
			'woocommerce-paypal-payments'
		),
		'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input'
	);

	return (
		<>
			<SettingsToggleBlock
				label={ __(
					'Enable Sandbox Mode',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Activate Sandbox mode to safely test PayPal with sample data. Once your store is ready to go live, you can easily switch to your production account.',
					'woocommerce-paypal-payments'
				) }
				isToggled={ !! isSandboxMode }
				setToggled={ setSandboxMode }
				isLoading={ isBusy }
			>
				<Button onClick={ handleSandboxConnect } variant="secondary">
					{ __( 'Connect Account', 'woocommerce-paypal-payments' ) }
				</Button>
			</SettingsToggleBlock>
			<Separator withLine={ false } />
			<SettingsToggleBlock
				label={
					__( 'Manually Connect', 'woocommerce-paypal-payments' ) +
					( isBusy ? ' ...' : '' )
				}
				description={ advancedUsersDescription }
				isToggled={ !! isManualConnectionMode }
				setToggled={ setManualConnectionMode }
				isLoading={ isBusy }
			>
				<DataStoreControl
					control={ TextControl }
					ref={ refClientId }
					label={
						isSandboxMode
							? __(
									'Sandbox Client ID',
									'woocommerce-paypal-payments'
							  )
							: __(
									'Live Client ID',
									'woocommerce-paypal-payments'
							  )
					}
					value={ clientId }
					onChange={ setClientId }
				/>
				<DataStoreControl
					control={ TextControl }
					ref={ refClientSecret }
					label={
						isSandboxMode
							? __(
									'Sandbox Secret Key',
									'woocommerce-paypal-payments'
							  )
							: __(
									'Live Secret Key',
									'woocommerce-paypal-payments'
							  )
					}
					value={ clientSecret }
					onChange={ setClientSecret }
					type="password"
				/>
				<Button variant="secondary" onClick={ handleConnect }>
					{ __( 'Connect Account', 'woocommerce-paypal-payments' ) }
				</Button>
			</SettingsToggleBlock>
		</>
	);
};

export default AdvancedOptionsForm;
