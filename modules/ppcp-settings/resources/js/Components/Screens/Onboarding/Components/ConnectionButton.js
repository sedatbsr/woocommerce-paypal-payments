import { Button } from '@wordpress/components';

import classNames from 'classnames';

import { openSignup } from '../../../ReusableComponents/Icons';
import { useSandboxConnection } from '../../../../hooks/useHandleConnections';

const ConnectionButton = ( {
	title,
	isSandbox = false,
	variant = 'primary',
	showIcon = true,
} ) => {
	const { handleSandboxConnect } = useSandboxConnection();
	const className = classNames( 'ppcp-r-connection-button', {
		'sandbox-mode': isSandbox,
		'live-mode': ! isSandbox,
	} );

	const handleConnectClick = async () => {
		if ( isSandbox ) {
			await handleSandboxConnect();
		} else {
			console.warn( 'Live connection not implemented yet' );
		}
	};

	return (
		<Button
			className={ className }
			variant={ variant }
			icon={ showIcon ? openSignup : null }
			onClick={ handleConnectClick }
		>
			<span className="button-title">{ title }</span>
		</Button>
	);
};

export default ConnectionButton;
