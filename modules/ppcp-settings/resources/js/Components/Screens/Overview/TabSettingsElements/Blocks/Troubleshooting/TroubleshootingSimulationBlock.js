import { useCallback, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { REST_WEBHOOKS_SIMULATE } from '../../../../../../data/common/constants';
import { __ } from '@wordpress/i18n';
import { ButtonSettingsBlock } from '../../../../../ReusableComponents/SettingsBlocks';

const TroubleshootingSimulationBlock = () => {
	const [ simulationState, setSimulationState ] = useState( {
		simulating: false,
		message: '',
		status: '',
	} );

	function sleep( ms ) {
		return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
	}

	const startWebhookSimulation = useCallback( async () => {
		return apiFetch( {
			method: 'POST',
			path: REST_WEBHOOKS_SIMULATE,
		} );
	}, [] );

	const checkWebhookSimulationState = useCallback( async () => {
		return apiFetch( {
			path: REST_WEBHOOKS_SIMULATE,
		} );
	}, [] );

	const startSimulation = async () => {
		const delay = 2000;
		const retriesBeforeErrorMessage = 15;
		const maxRetries = 30;

		setSimulationState( ( prevState ) => ( {
			...prevState,
			simulating: true,
			message: __(
				'Waiting for the webhook to arrive…',
				'woocommerce-paypal-payments'
			),
		} ) );

		try {
			await startWebhookSimulation();
		} catch ( error ) {
			setSimulationState( ( prevState ) => ( {
				...prevState,
				simulating: false,
				message: __(
					'Operation failed. Check WooCommerce logs for more details.',
					'woocommerce-paypal-payments'
				),
			} ) );
			return;
		}

		for ( let i = 0; i < maxRetries; i++ ) {
			await sleep( delay );

			const simulationStateResponse = await checkWebhookSimulationState();
			try {
				if ( ! simulationStateResponse.success ) {
					console.error(
						'Simulation state query failed: ' +
							simulationStateResponse?.data
					);
					continue;
				}

				const state = simulationStateResponse?.data?.state;
				if ( state === 'received' ) {
					setSimulationState( ( prevState ) => ( {
						...prevState,
						...{
							message:
								'✔️ ' +
								__(
									'The webhook was received successfully.',
									'woocommerce-paypal-payments'
								),
							simulating: false,
						},
					} ) );
					return;
				}
			} catch ( exc ) {
				console.error( exc );
			}

			if ( i === retriesBeforeErrorMessage ) {
				setSimulationState( ( prevState ) => ( {
					...prevState,
					...{
						message: __(
							'Looks like the webhook cannot be received. Check that your website is accessible from the internet.',
							'woocommerce-paypal-payments'
						),
						status: STATUS_ERROR,
					},
				} ) );
			}
		}

		setSimulationState( { ...simulationState, ...{ simulating: false } } );
	};

	return (
		<>
			<ButtonSettingsBlock
				title={ __(
					'Simulate webhooks',
					'woocommerce-paypal-payments'
				) }
				actionProps={ {
					buttonType: 'secondary',
					isBusy: simulationState.simulating,
					message: simulationState.message,
					callback: () => startSimulation(),
					value: __(
						'Simulate webhooks',
						'woocommerce-paypal-payments'
					),
				} }
			/>
		</>
	);
};
export default TroubleshootingSimulationBlock;
