import { TabPanel } from '@wordpress/components';
import { getQuery, updateQueryString } from '@woocommerce/navigation';
import { useEffect, useState } from '@wordpress/element';

const TabNavigation = ( { tabs } ) => {
	const initialPanel = getQuery()?.panel ?? tabs[ 0 ].name;
	const [ activePanel, setActivePanel ] = useState( initialPanel );

	const updatePanelUri = ( tabName ) => {
		setActivePanel( tabName );
	};

	useEffect( () => {
		updateQueryString( { panel: activePanel }, '/', getQuery() );
	}, [ activePanel ] );

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
