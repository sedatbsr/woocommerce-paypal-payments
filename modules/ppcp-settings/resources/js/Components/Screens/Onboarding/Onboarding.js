import Container, {
	PAGE_ONBOARDING,
} from '../../ReusableComponents/Container.js';
import StepWelcome from './StepWelcome.js';
import StepBusiness from './StepBusiness.js';
import StepProducts from './StepProducts.js';
import { useOnboardingStep } from '../../../data';

const Onboarding = () => {
	const { step, setStep, setCompleted } = useOnboardingStep();

	return (
		<Container page={ PAGE_ONBOARDING }>
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
