import { Button } from '@wordpress/components';

import classNames from 'classnames';

import { CommonHooks } from '../../../../data';
import { openSignup } from '../../../ReusableComponents/Icons';
import {
	useProductionConnection,
	useSandboxConnection,
} from '../../../../hooks/useHandleConnections';

const ConnectionButton = ( {
	title,
	isSandbox = false,
	variant = 'primary',
	showIcon = true,
} ) => {
	const { isBusy } = CommonHooks.useBusyState();
	const { handleSandboxConnect } = useSandboxConnection();
	const { handleProductionConnect } = useProductionConnection();
	const className = classNames( 'ppcp-r-connection-button', {
		'sandbox-mode': isSandbox,
		'live-mode': ! isSandbox,
		'ppcp--is-loading': isBusy,
	} );

	const handleConnectClick = async () => {
		if ( isSandbox ) {
			await handleSandboxConnect();
		} else {
			await handleProductionConnect();
		}
	};

	return (
		<Button
			className={ className }
			variant={ variant }
			icon={ showIcon ? openSignup : null }
			onClick={ handleConnectClick }
			disabled={ isBusy }
		>
			<span className="button-title">{ title }</span>
		</Button>
	);
};

export default ConnectionButton;
