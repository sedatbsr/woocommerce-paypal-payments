import { Button, Icon } from '@wordpress/components';
import { chevronLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { OnboardingHooks } from '../../../../data';

const Navigation = ( { stepDetails, onNext, onPrev, onExit } ) => {
	const { title, isFirst, percentage, showNext, canProceed } = stepDetails;

	const state = OnboardingHooks.useNavigationState();
	const isDisabled = ! canProceed( state );

	return (
		<div className="ppcp-r-navigation-container">
			<div className="ppcp-r-navigation">
				<div className="ppcp-r-navigation--left">
					<Icon icon={ chevronLeft } />
					<Button
						variant="tertiary"
						onClick={ isFirst ? onExit : onPrev }
					>
						{ title }
					</Button>
				</div>
				{ ! isFirst &&
					NextButton( { showNext, isDisabled, onNext, onExit } ) }
				<ProgressBar percent={ percentage } />
			</div>
		</div>
	);
};

const NextButton = ( { showNext, isDisabled, onNext, onExit } ) => {
	return (
		<div className="ppcp-r-navigation--right">
			<Button onClick={ onExit }>
				{ __( 'Save and exit', 'woocommerce-paypal-payments' ) }
			</Button>
			{ showNext && (
				<Button
					variant="primary"
					disabled={ isDisabled }
					onClick={ onNext }
				>
					{ __( 'Continue', 'woocommerce-paypal-payments' ) }
				</Button>
			) }
		</div>
	);
};

const ProgressBar = ( { percent } ) => {
	percent = Math.min( Math.max( percent, 0 ), 100 );

	return (
		<div
			className="ppcp-r-navigation--progress-bar"
			style={ { width: `${ percent * 0.9 }%` } }
		/>
	);
};

export default Navigation;
