import OnboardingHeader from '../../ReusableComponents/OnboardingHeader';
import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';

const StepCompleteSetup = ( {
	setStep,
	currentStep,
	stepperOrder,
	setCompleted,
} ) => {
	const ButtonIcon = () => <Icon icon="external" />;

	return (
		<div className="ppcp-r-page-products">
			<OnboardingHeader
				title={ __(
					'Complete Your Payment Setup',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'To finalize your payment setup, please log in to PayPal. If you don’t have an account yet, don’t worry - we’ll guide you through the easy process of creating one.',
					'woocommerce-paypal-payments'
				) }
			/>
			<div className="ppcp-r-inner-container">
				<div className="ppcp-r-onboarding-header__description">
					<Button
						variant="primary"
						icon={ ButtonIcon }
						onClick={ () => {} }
					>
						{ __(
							'Connect to PayPal',
							'woocommerce-paypal-payments'
						) }
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StepCompleteSetup;
