import Container from '../../ReusableComponents/Container';
import StepWelcome from './StepWelcome';
import StepBusiness from './StepBusiness';
import StepProducts from './StepProducts';
import { useOnboardingStep } from '../../../data';

const Onboarding = () => {
	const { step, setStep, setCompleted } = useOnboardingStep();

	return (
		<Container page="onboarding">
			<div className="ppcp-r-card">
				<OnboardingStep
					currentStep={ step }
					setStep={ setStep }
					setCompleted={ setCompleted }
				/>
			</div>
		</Container>
	);
};

const OnboardingStep = ( { currentStep, setStep, setCompleted } ) => {
	const stepperOrder = [ StepWelcome, StepBusiness, StepProducts ];

	const isValidStep = ( step ) =>
		typeof step === 'number' &&
		Number.isInteger( step ) &&
		step >= 0 &&
		step < stepperOrder.length;

	const safeCurrentStep = isValidStep( currentStep ) ? currentStep : 0;

	const CurrentStepComponent = stepperOrder[ safeCurrentStep ];

	return (
		<CurrentStepComponent
			setStep={ setStep }
			currentStep={ safeCurrentStep }
			setCompleted={ setCompleted }
			stepperOrder={ stepperOrder }
		/>
	);
};

export default Onboarding;
