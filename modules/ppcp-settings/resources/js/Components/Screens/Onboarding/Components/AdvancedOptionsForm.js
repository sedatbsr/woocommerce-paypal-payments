import { __, sprintf } from '@wordpress/i18n';
import { Button, TextControl } from '@wordpress/components';
import { useRef, useState, useEffect } from '@wordpress/element';

import classNames from 'classnames';

import SettingsToggleBlock from '../../../ReusableComponents/SettingsToggleBlock';
import Separator from '../../../ReusableComponents/Separator';
import DataStoreControl from '../../../ReusableComponents/DataStoreControl';
import { CommonHooks } from '../../../../data';
import {
	useSandboxConnection,
	useManualConnection,
} from '../../../../hooks/useHandleConnections';

import ConnectionButton from './ConnectionButton';

const FORM_ERRORS = {
	noClientId: __(
		'Please enter your Client ID',
		'woocommerce-paypal-payments'
	),
	noClientSecret: __(
		'Please enter your Secret Key',
		'woocommerce-paypal-payments'
	),
	invalidClientId: __(
		'Please enter a valid Client ID',
		'woocommerce-paypal-payments'
	),
};

const AdvancedOptionsForm = () => {
	const [ clientValid, setClientValid ] = useState( false );
	const [ secretValid, setSecretValid ] = useState( false );
	const [ clientIdLabel, setClientIdLabel ] = useState( '' );
	const [ secretKeyLabel, setSecretKeyLabel ] = useState( '' );

	const { isBusy } = CommonHooks.useBusyState();
	const { isSandboxMode, setSandboxMode } = useSandboxConnection();
	const {
		handleConnectViaIdAndSecret,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = useManualConnection();

	const refClientId = useRef( null );
	const refClientSecret = useRef( null );

	const validateManualConnectionForm = () => {
		const checks = [
			{
				ref: refClientId,
				valid: () => clientId,
				errorMessage: FORM_ERRORS.noClientId,
			},
			{
				ref: refClientId,
				valid: () => clientValid,
				errorMessage: FORM_ERRORS.invalidClientId,
			},
			{
				ref: refClientSecret,
				valid: () => clientSecret && secretValid,
				errorMessage: FORM_ERRORS.noClientSecret,
			},
		];

		for ( const { ref, valid, errorMessage } of checks ) {
			if ( valid() ) {
				continue;
			}

			ref?.current?.focus();
			throw new Error( errorMessage );
		}
	};

	const handleManualConnect = () =>
		handleConnectViaIdAndSecret( {
			validation: validateManualConnectionForm,
		} );

	useEffect( () => {
		setClientValid( ! clientId || /^A[\w-]{79}$/.test( clientId ) );
		setSecretValid( clientSecret && clientSecret.length > 0 );
	}, [ clientId, clientSecret ] );

	useEffect( () => {
		setClientIdLabel(
			isSandboxMode
				? __( 'Sandbox Client ID', 'woocommerce-paypal-payments' )
				: __( 'Live Client ID', 'woocommerce-paypal-payments' )
		);
		setSecretKeyLabel(
			isSandboxMode
				? __( 'Sandbox Secret Key', 'woocommerce-paypal-payments' )
				: __( 'Live Secret Key', 'woocommerce-paypal-payments' )
		);
	}, [ isSandboxMode ] );

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
				<ConnectionButton
					title={ __(
						'Connect Account',
						'woocommerce-paypal-payments'
					) }
					showIcon={ false }
					variant="secondary"
					isSandbox={
						true /* This button always connects to sandbox */
					}
				/>
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
					label={ clientIdLabel }
					value={ clientId }
					onChange={ setClientId }
					className={ classNames( {
						'has-error': ! clientValid,
					} ) }
				/>
				{ clientValid || (
					<p className="client-id-error">
						{ FORM_ERRORS.invalidClientId }
					</p>
				) }
				<DataStoreControl
					control={ TextControl }
					ref={ refClientSecret }
					label={ secretKeyLabel }
					value={ clientSecret }
					onChange={ setClientSecret }
					type="password"
				/>
				<Button variant="secondary" onClick={ handleManualConnect }>
					{ __( 'Connect Account', 'woocommerce-paypal-payments' ) }
				</Button>
			</SettingsToggleBlock>
		</>
	);
};

export default AdvancedOptionsForm;
