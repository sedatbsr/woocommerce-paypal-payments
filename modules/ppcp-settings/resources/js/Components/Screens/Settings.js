import { useEffect } from '@wordpress/element';

import { OnboardingHooks } from '../../data';
import Onboarding from './Onboarding/Onboarding';
import SettingsScreen from './SettingsScreen';

const Settings = () => {
	const onboardingProgress = OnboardingHooks.useSteps();

	// Disable the "Changes you made might not be saved" browser warning.
	useEffect( () => {
		const suppressBeforeUnload = ( event ) => {
			event.stopImmediatePropagation();
			return undefined;
		};

		window.addEventListener( 'beforeunload', suppressBeforeUnload );

		return () => {
			window.removeEventListener( 'beforeunload', suppressBeforeUnload );
		};
	}, [] );

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
