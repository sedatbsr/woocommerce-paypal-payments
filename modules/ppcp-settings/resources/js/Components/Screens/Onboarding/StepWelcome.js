import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

import OnboardingHeader from '../../ReusableComponents/OnboardingHeader';
import PaymentMethodIcons from '../../ReusableComponents/PaymentMethodIcons';
import Separator from '../../ReusableComponents/Separator';
import AdvancedOptionsForm from './Components/AdvancedOptionsForm';

const StepWelcome = ( { setStep, currentStep, setCompleted } ) => {
	return (
		<div className="ppcp-r-page-welcome">
			<OnboardingHeader
				title={ __(
					'Welcome to PayPal Payments',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Your all-in-one checkout solution with PayPal, Venmo, Pay Later, all major credit/debit cards, Apple Pay, Google Pay, and more.',
					'woocommerce-paypal-payments'
				) }
			/>
			<div className="ppcp-r-inner-container">
				<PaymentMethodIcons icons="all" />
				<WelcomeFeatures />
				<Button
					className="ppcp-r-button-activate-paypal"
					variant="primary"
					onClick={ () => setStep( currentStep + 1 ) }
				>
					{ __(
						'Activate PayPal Payments',
						'woocommerce-paypal-payments'
					) }
				</Button>
				<Separator
					className="ppcp-r-page-welcome-or-separator"
					text={ __( 'or', 'woocommerce-paypal-payments' ) }
				/>
				<AdvancedOptionsForm setCompleted={ setCompleted } />
			</div>
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

export default StepWelcome;
