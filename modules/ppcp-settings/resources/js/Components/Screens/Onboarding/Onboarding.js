import Container from '../../ReusableComponents/Container';
import { useOnboardingStep } from '../../../data';
import { getSteps } from './availableSteps';

const Onboarding = () => {
	const { step, setStep, setCompleted, flags } = useOnboardingStep();

	return (
		<Container page="onboarding">
			<div className="ppcp-r-card">
				<OnboardingStep
					currentStep={ step }
					setStep={ setStep }
					setCompleted={ setCompleted }
					flags={ flags }
				/>
			</div>
		</Container>
	);
};

const OnboardingStep = ( { currentStep, setStep, setCompleted, flags } ) => {
	const stepperOrder = getSteps( flags );

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
