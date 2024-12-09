import { Button } from '@wordpress/components';

import classNames from 'classnames';

import { CommonHooks } from '../../../../data';
import { openSignup } from '../../../ReusableComponents/Icons';
import {
	useProductionConnection,
	useSandboxConnection,
} from '../../../../hooks/useHandleConnections';
import BusyStateWrapper from '../../../ReusableComponents/BusyStateWrapper';

const ConnectionButton = ( {
	title,
	isSandbox = false,
	variant = 'primary',
	showIcon = true,
} ) => {
	const { handleSandboxConnect } = useSandboxConnection();
	const { handleProductionConnect } = useProductionConnection();
	const className = classNames( 'ppcp-r-connection-button', {
		'sandbox-mode': isSandbox,
		'live-mode': ! isSandbox,
	} );

	const handleConnectClick = async () => {
		if ( isSandbox ) {
			await handleSandboxConnect();
		} else {
			await handleProductionConnect();
		}
	};

	return (
		<BusyStateWrapper>
			<Button
				className={ className }
				variant={ variant }
				icon={ showIcon ? openSignup : null }
				onClick={ handleConnectClick }
			>
				<span className="button-title">{ title }</span>
			</Button>
		</BusyStateWrapper>
	);
};

export default ConnectionButton;
