import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { openSignup } from '../../../ReusableComponents/Icons';
import { useSandboxConnection } from '../../../../hooks/useHandleConnections';

const ConnectionButton = ( {
	title,
	isSandbox = false,
	variant = 'primary',
	showIcon = true,
} ) => {
	const className = 'ppcp-r-connection-button';
	const { handleSandboxConnect } = useSandboxConnection();

	const handleConnectClick = () => {
		if ( isSandbox ) {
			handleSandboxConnect();
		} else {
			// Handle live connection logic here
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
