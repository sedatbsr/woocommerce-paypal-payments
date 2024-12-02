import Container from '../../ReusableComponents/Container';
import { OnboardingHooks } from '../../../data';

import { getSteps, getCurrentStep } from './availableSteps';
import Navigation from './Components/Navigation';

const Onboarding = () => {
	const { step, setStep, setCompleted, flags } = OnboardingHooks.useSteps();

	const Steps = getSteps( flags );
	const CurrentStepComponent = getCurrentStep( step, Steps );

	return (
		<>
			<Navigation
				setStep={ setStep }
				currentStep={ step }
				setCompleted={ setCompleted }
				stepperOrder={ Steps }
			/>
			<Container page="onboarding">
				<div className="ppcp-r-card">
					<CurrentStepComponent
						setStep={ setStep }
						currentStep={ step }
						setCompleted={ setCompleted }
						stepperOrder={ Steps }
					/>
				</div>
			</Container>
		</>
	);
};

export default Onboarding;
