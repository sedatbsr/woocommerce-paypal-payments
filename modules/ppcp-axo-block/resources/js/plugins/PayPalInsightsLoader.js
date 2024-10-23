import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import PayPalInsights from '../../../../ppcp-axo/resources/js/Insights/PayPalInsights';

const PayPalInsightsLoader = () => {

	// Subscribe to checkout store data
	const checkoutData = useSelect( ( select ) => {
		return {
			paymentMethod: select( 'wc/store/checkout' ).getPaymentMethod(),
			orderTotal: select( 'wc/store/checkout' ).getOrderTotal(),
			// Add other data points you need
		};
	} );

	// Watch for changes and trigger analytics events
	useEffect( () => {
		if ( isScriptLoaded && window.YourAnalyticsObject ) {
			// Example tracking calls
			window.YourAnalyticsObject.track( 'checkout_updated', {
				payment_method: checkoutData.paymentMethod,
				order_total: checkoutData.orderTotal,
			} );
		}
	}, [ isScriptLoaded, checkoutData ] );

	return null; // This component doesn't render anything
};

// Register the plugin to run with the checkout block
registerPlugin( 'wc-ppcp-paypal-insights', {
	render: PayPalInsightsLoader,
	scope: 'woocommerce-checkout',
} );
