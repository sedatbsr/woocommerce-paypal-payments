import TabNavigation from '../ReusableComponents/TabNavigation';
import { getSettingsTabs } from './tabs';

const Settings = () => {
	const tabs = getSettingsTabs();

	return <TabNavigation tabs={ tabs }></TabNavigation>;
};

export default Settings;
