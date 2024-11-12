import OnboardingHeader from '../../ReusableComponents/OnboardingHeader';
import { __, sprintf } from '@wordpress/i18n';
import { Button, TextControl } from '@wordpress/components';
import PaymentMethodIcons from '../../ReusableComponents/PaymentMethodIcons';
import SettingsToggleBlock from '../../ReusableComponents/SettingsToggleBlock';
import Separator from '../../ReusableComponents/Separator';
import { useOnboardingStepWelcome, useManualConnect } from '../../../data';
import WelcomeDocs from '../../ReusableComponents/WelcomeDocs';
import DataStoreControl from '../../ReusableComponents/DataStoreControl';

const StepWelcome = ( { setStep, currentStep, setCompleted } ) => {
	return (
        <div className="ppcp-r-page-welcome">
            <OnboardingHeader
                title={__(
                    'Welcome to PayPal Payments',
                    'woocommerce-paypal-payments'
                )}
                description={__(
                    'Your all-in-one integration for PayPal checkout solutions that enable buyers<br/> to pay via PayPal, Pay Later, all major credit/debit cards, Apple Pay, Google Pay, and more.',
                    'woocommerce-paypal-payments'
                )}
            />
            <div className="ppcp-r-inner-container">
                <WelcomeFeatures/>
                <PaymentMethodIcons icons="all"/>
                <p className="ppcp-r-button__description">{__(
                    `Click the button below to be guided through connecting your existing PayPal account or creating a new one.You will be able to choose the payment options that are right for your store.`,
                    'woocommerce-paypal-payments'
                )}
                </p>
                <Button
                    className="ppcp-r-button-activate-paypal"
                    variant="primary"
                    onClick={() => setStep(currentStep + 1)}
                >
                    {__(
                        'Activate PayPal Payments',
                        'woocommerce-paypal-payments'
                    )}
                </Button>
            </div>
            <Separator className="ppcp-r-page-welcome-mode-separator"/>
            <WelcomeDocs/>
            <WelcomeForm setCompleted={setCompleted}/>
        </div>
    );
};

const WelcomeFeatures = () => {
	return (
		<div className="ppcp-r-welcome-features">
			<div className="ppcp-r-welcome-features__col">
				<span>{ __( 'Deposits', 'woocommerce-paypal-payments' ) }</span>
				<p>{ __( 'Instant', 'woocommerce-paypal-payments' ) }</p>
			</div>
			<div className="ppcp-r-welcome-features__col">
				<span>
					{ __( 'Payment Capture', 'woocommerce-paypal-payments' ) }
				</span>
				<p>
					{ __(
						'Authorize only or Capture',
						'woocommerce-paypal-payments'
					) }
				</p>
			</div>
			<div className="ppcp-r-welcome-features__col">
				<span>
					{ __(
						'Recurring payments',
						'woocommerce-paypal-payments'
					) }
				</span>
                <p>{ __( 'Supported', 'woocommerce-paypal-payments' ) }</p>
            </div>
        </div>
    );
};

const WelcomeForm = ( { setCompleted } ) => {
	const {
		isSandboxMode,
		setSandboxMode,
		isManualConnectionMode,
		setManualConnectionMode,
		clientId,
		setClientId,
		clientSecret,
		setClientSecret,
	} = useOnboardingStepWelcome();

	const { connectManual } = useManualConnect();

	const handleConnect = async () => {
		try {
			const res = await connectManual(
				clientId,
				clientSecret,
				isSandboxMode
			);
			if ( ! res.success ) {
				throw new Error( 'Request failed.' );
			}

            console.log(`Merchant ID: ${res.merchantId}, email: ${res.email}`);

			setCompleted( true );
		} catch ( exc ) {
			console.error( exc );
			alert( 'Connection failed.' );
		}
	};

	const advancedUsersDescription = sprintf(
		// translators: %s: Link to PayPal REST application guide
		__(
			'For advanced users: Connect a custom PayPal REST app for full control over your integration. For more information on creating a PayPal REST application, <a target="_blank" href="%s">click here</a>.',
			'woocommerce-paypal-payments'
		),
		'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
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
			>
				<Button variant="secondary">
					{ __( 'Connect Account', 'woocommerce-paypal-payments' ) }
				</Button>
			</SettingsToggleBlock>
			<Separator className="ppcp-r-page-welcome-mode-separator" />
			<SettingsToggleBlock
				label={ __(
					'Manually Connect',
					'woocommerce-paypal-payments'
				) }
				description={ advancedUsersDescription }
				isToggled={ !! isManualConnectionMode }
				setToggled={ setManualConnectionMode }
			>
				<DataStoreControl
					control={ TextControl }
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

export default StepWelcome;
