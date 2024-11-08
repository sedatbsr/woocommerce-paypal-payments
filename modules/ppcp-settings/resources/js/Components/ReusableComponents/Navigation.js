import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {useOnboardingStepBusiness, useOnboardingStepProducts} from "../../data";
import data from "../../utils/data";

const Navigation = ( {
	setStep,
	setCompleted,
	currentStep,
	stepperOrder
} ) => {
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

    const { products, toggleProduct } = useOnboardingStepProducts();
    const { isCasualSeller, setIsCasualSeller } = useOnboardingStepBusiness();

    let navigationTitle = '';
    let disabled = false;

    switch ( currentStep ) {
        case 1:
            navigationTitle = __( 'Set up store type', 'woocommerce-paypal-payments' );
            disabled = isCasualSeller === null
            break;
        case 2:
            navigationTitle = __( 'Select product types', 'woocommerce-paypal-payments' );
            disabled = products.length < 1
            break;
        case 3:
            navigationTitle = __( 'Choose checkout options', 'woocommerce-paypal-payments' );
        case 4:
            navigationTitle = __( 'Connect your PayPal account', 'woocommerce-paypal-payments' );
            break;
        default:
            navigationTitle = __( 'PayPal Payments', 'woocommerce-paypal-payments' );
    }

	return (
        <div className="ppcp-r-navigation">
            <div className="ppcp-r-navigation--left">
                <Button variant="tertiary" onClick={ () => navigateBy( -1 ) }>
                    <span>{ data().getImage( 'icon-arrow-left.svg' ) }</span>{ navigationTitle }
                </Button>
            </div>
            { currentStep > 0 && (
                <div className="ppcp-r-navigation--right">
                    <a href="wp-admin/admin.php?page=wc-settings&amp;tab=checkout"
                       aria-label="Return to payments">{__('Save and exit', 'woocommerce-paypal-payments')}</a>
                    <Button
                        variant="primary"
                        disabled={ disabled }
                        onClick={ () => navigateBy( 1 ) }
                    >
                        { __('Continue', 'woocommerce-paypal-payments') }
                    </Button>
                </div>
            ) }
        </div>
    );
};

export default Navigation;
