import { TabPanel } from '@wordpress/components';

const TabNavigation = ( { tabs } ) => {

	const updatePanelUri = ( tabName ) => {
	};

	return (
		<TabPanel
			className={ `ppcp-r-tabs ${ panel }` }
			onSelect={ updatePanelUri }
			tabs={ tabs }
		>
			{ ( tab ) => {
				return tab.component || <>{ tab.title ?? tab.name }</>;
			} }
		</TabPanel>
	);
};

export default TabNavigation;
