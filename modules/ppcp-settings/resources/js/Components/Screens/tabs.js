import { __ } from '@wordpress/i18n';
import Dashboard from './Dashboard/Dashboard';
import Onboarding from './Onboarding/Onboarding';

export const getSettingsTabs = () => {
	const tabs = [];

	// TODO: Use the store to find out if onboarding is complete

	if ( 0 ) {
		tabs.push( {
			name: 'onboarding',
			component: <Onboarding />,
		} );
	}

	if ( 1 ) {
		tabs.push( {
			name: 'dashboard',
			title: __( 'Dashboard', 'woocommerce-paypal-payments' ),
			component: <Dashboard />,
		} );

		tabs.push( {
			name: 'payment-methods',
			title: __( 'Payment Methods', 'woocommerce-paypal-payments' ),
			component: <Dashboard />,
		} );

		tabs.push( {
			name: 'settings',
			title: __( 'Settings', 'woocommerce-paypal-payments' ),
		} );

		tabs.push( {
			name: 'styling',
			title: __( 'Styling', 'woocommerce-paypal-payments' ),
		} );
	}

	return tabs;
};
