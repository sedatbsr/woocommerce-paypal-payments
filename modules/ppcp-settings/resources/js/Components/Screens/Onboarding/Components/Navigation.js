import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { OnboardingHooks } from '../../../../data';
import data from '../../../../utils/data';

const Navigation = ( {
	setStep,
	setCompleted,
	currentStep,
	stepperOrder,
	title,
} ) => {
	const isLastStep = () => currentStep + 1 === stepperOrder.length;
	const isFistStep = () => currentStep === 0;
	const navigateBy = ( stepDirection ) => {
		let newStep = currentStep + stepDirection;

		if ( isNaN( newStep ) || newStep < 0 ) {
			console.warn( 'Invalid next step:', newStep );
			newStep = 0;
		}

		if ( newStep >= stepperOrder.length ) {
			setCompleted( true );
		} else {
			setStep( newStep );
		}
	};

	const { products } = OnboardingHooks.useProducts();
	const { isCasualSeller } = OnboardingHooks.useBusiness();

	let disabled = false;

	switch ( currentStep ) {
		case 1:
			disabled = isCasualSeller === null;
			break;
		case 2:
			disabled = products.length < 1;
			break;
	}

	return (
		<div className="ppcp-r-navigation-container">
			<div className="ppcp-r-navigation">
				<div className="ppcp-r-navigation--left">
					<span>{ data().getImage( 'icon-arrow-left.svg' ) }</span>
					{ ! isFistStep() ? (
						<Button
							variant="tertiary"
							onClick={ () => navigateBy( -1 ) }
						>
							{ title }
						</Button>
					) : (
						<a
							className="ppcp-r-navigation--left__link"
							href={ global.ppcpSettings.wcPaymentsTabUrl }
							aria-label={ __(
								'Return to payments',
								'woocommerce-paypal-payments'
							) }
						>
							{ title }
						</a>
					) }
				</div>
				{ ! isFistStep() && (
					<div className="ppcp-r-navigation--right">
						<a
							href={ global.ppcpSettings.wcPaymentsTabUrl }
							aria-label={ __(
								'Return to payments',
								'woocommerce-paypal-payments'
							) }
						>
							{ __(
								'Save and exit',
								'woocommerce-paypal-payments'
							) }
						</a>
						{ ! isLastStep() && (
							<Button
								variant="primary"
								disabled={ disabled }
								onClick={ () => navigateBy( 1 ) }
							>
								{ __(
									'Continue',
									'woocommerce-paypal-payments'
								) }
							</Button>
						) }
					</div>
				) }
				<div
					className="ppcp-r-navigation--progress-bar"
					style={ {
						width: `${
							( currentStep / ( stepperOrder.length - 1 ) ) * 90
						}%`,
					} }
				></div>
			</div>
		</div>
	);
};

export default Navigation;
