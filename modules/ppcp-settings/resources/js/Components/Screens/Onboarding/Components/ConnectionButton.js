import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import classNames from 'classnames';
import { openSignup } from '../../../ReusableComponents/Icons';
import { useHandleOnboardingButton } from '../../../../hooks/useHandleConnections';
import BusyStateWrapper from '../../../ReusableComponents/BusyStateWrapper';

/**
 * Button component that outputs a placeholder button when no onboardingUrl is present yet - the
 * placeholder button looks identical to the working button, but has no href, target, or
 * custom connection attributes.
 *
 * @param {Object}  props
 * @param {string}  props.className
 * @param {string}  props.variant
 * @param {boolean} props.showIcon
 * @param {?string} props.href
 * @param {Element} props.children
 */
const ButtonOrPlaceholder = ( {
	className,
	variant,
	showIcon,
	href,
	children,
} ) => {
	if ( ! href ) {
		return (
			<Button
				className={ className }
				variant={ variant }
				icon={ showIcon ? openSignup : null }
			>
				{ children }
			</Button>
		);
	}

	return (
		<Button
			className={ className }
			variant={ variant }
			icon={ showIcon ? openSignup : null }
			href={ href }
			target={ 'PPFrame' }
			{ ...{
				'data-paypal-button': 'true',
				'data-paypal-onboard-complete': 'onOnboardComplete',
				'data-paypal-onboard-button': 'true',
			} }
		>
			{ children }
		</Button>
	);
};

const ConnectionButton = ( {
	title,
	isSandbox = false,
	variant = 'primary',
	showIcon = true,
	className = '',
} ) => {
	const { onboardingUrl, scriptLoaded } =
		useHandleOnboardingButton( isSandbox );
	const buttonClassName = classNames( 'ppcp-r-connection-button', className, {
		'sandbox-mode': isSandbox,
		'live-mode': ! isSandbox,
	} );

	useEffect( () => {
		if ( scriptLoaded && onboardingUrl ) {
			window.PAYPAL.apps.Signup.render();
		}
	}, [ scriptLoaded, onboardingUrl ] );

	return (
		<BusyStateWrapper isBusy={ ! onboardingUrl }>
			<ButtonOrPlaceholder
				className={ buttonClassName }
				variant={ variant }
				showIcon={ showIcon }
				href={ onboardingUrl }
			>
				<span className="button-title">{ title }</span>
			</ButtonOrPlaceholder>
		</BusyStateWrapper>
	);
};

export default ConnectionButton;
