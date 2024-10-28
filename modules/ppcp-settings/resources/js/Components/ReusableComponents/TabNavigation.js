import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import TabDashboard from '../Screens/Dashboard/TabDashboard';
import TabPaymentMethods from '../Screens/Dashboard/TabPaymentMethods';
import TabSettings from '../Screens/Dashboard/TabSettings';
import TabStyling from '../Screens/Dashboard/TabStyling';

const TAB_DASHBOARD = 'TabDashboard';
const TAB_PAYMENT_METHODS = 'TabPaymentMethods';
const TAB_SETTINGS = 'TabSettings';
const TAB_STYLING = 'TabStyling';

const TabNavigation = () => {
	const tabComponents = {
		[ TAB_DASHBOARD ]: TabDashboard,
		[ TAB_PAYMENT_METHODS ]: TabPaymentMethods,
		[ TAB_SETTINGS ]: TabSettings,
		[ TAB_STYLING ]: TabStyling,
	};

	return (
		<TabPanel
			className="my-tab-panel"
			activeClass="active-tab"
			tabs={ [
				{
					name: TAB_DASHBOARD,
					title: __( 'Dashboard', 'woocommerce-paypal-payments' ),
					className: 'ppcp-r-tab-dashboard',
				},
				{
					name: TAB_PAYMENT_METHODS,
					title: __(
						'Payment Methods',
						'woocommerce-paypal-payments'
					),
					className: 'ppcp-r-tab-payment-methods',
				},
				{
					name: TAB_SETTINGS,
					title: __( 'Settings', 'woocommerce-paypal-payments' ),
					className: 'ppcp-r-tab-settings',
				},
				{
					name: TAB_STYLING,
					title: __( 'Styling', 'woocommerce-paypal-payments' ),
					className: 'ppcp-r-tab-styling',
				},
			] }
		>
			{ ( tab ) => {
				const Component = tabComponents[ tab.name ];
				return <Component />;
			} }
		</TabPanel>
	);
};

export default TabNavigation;
