import Onboarding from './Onboarding/Onboarding';
import { useState } from '@wordpress/element';
import Dashboard from './Dashboard/Dashboard';
import { getSettingsTabs } from './tabs';

const Settings = () => {
	const [ onboarded, setOnboarded ] = useState( true );
	const tabs = getSettingsTabs();

	return <>{ onboarded ? <Onboarding /> : <Dashboard /> }</>;
};

export default Settings;
