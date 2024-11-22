import { useOnboardingStep } from '../../data';
import Onboarding from './Onboarding/Onboarding';
import SettingsScreen from './SettingsScreen';

const Settings = () => {
	const onboardingProgress = useOnboardingStep();

	if ( ! onboardingProgress.isReady ) {
		// TODO: Use better loading state indicator.
		return <div>Loading...</div>;
	}

	if ( ! onboardingProgress.completed ) {
		return <Onboarding />;
	}

	return <SettingsScreen />;
};

export default Settings;
