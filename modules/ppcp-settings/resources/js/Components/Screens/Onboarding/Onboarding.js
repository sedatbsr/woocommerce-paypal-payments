import Container from '../../ReusableComponents/Container';
import { OnboardingHooks } from '../../../data';

import { getSteps, getCurrentStep } from './availableSteps';
import Navigation from './Components/Navigation';

const Onboarding = () => {
	const { step, setStep, setCompleted, flags } = OnboardingHooks.useSteps();

	const Steps = getSteps( flags );
	const { StepComponent, title } = getCurrentStep( step, Steps );

	return (
		<>
			<Navigation
				setStep={ setStep }
				currentStep={ step }
				setCompleted={ setCompleted }
				stepperOrder={ Steps }
				title={ title }
			/>
			<Container page="onboarding">
				<div className="ppcp-r-card">
					<StepComponent
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
