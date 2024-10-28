import { TabPanel } from '@wordpress/components';
import { useState } from '@wordpress/element';

const TabNavigation = ( { tabs } ) => {
	const initialPanel = tabs[ 0 ].name;
	const [ activePanel, setActivePanel ] = useState( initialPanel );

	const updatePanelUri = ( tabName ) => {
		setActivePanel( tabName );
	};

	return (
		<TabPanel
			className={ `ppcp-r-tabs ${ activePanel }` }
			initialTabName={ activePanel }
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
