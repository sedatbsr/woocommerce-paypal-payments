import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { REST_WEBHOOKS_SIMULATE } from '../../../../../../data/common/constants';
import { __ } from '@wordpress/i18n';
import { ButtonSettingsBlock } from '../../../../../ReusableComponents/SettingsBlocks';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const SimulationBlock = () => {
	const {
		createSuccessNotice,
		createInfoNotice,
		createErrorNotice,
		removeNotice,
	} = useDispatch( noticesStore );

	const [ simulating, setSimulating ] = useState( false );

	const sleep = ( ms ) => {
		return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
	};

	const startWebhookSimulation = async () => {
		return apiFetch( {
			method: 'POST',
			path: REST_WEBHOOKS_SIMULATE,
		} );
	};

	const checkWebhookSimulationState = async () => {
		return apiFetch( {
			path: REST_WEBHOOKS_SIMULATE,
		} );
	};

	const startSimulation = async ( maxRetries ) => {
		const simulationStartNoticeId =
			'paypal-webhook-simulation-start-notice';
		const statusCheckNoticeId = 'paypal-webhook-status-check-notice';

		const stopSimulation = () => {
			removeNotice( statusCheckNoticeId );
			removeNotice( simulationStartNoticeId );
			setSimulating( false );
		};

		setSimulating( true );

		createInfoNotice(
			__(
				'Waiting for the webhook to arrive…',
				'woocommerce-paypal-payments'
			),
			{
				id: simulationStartNoticeId,
			}
		);

		try {
			await startWebhookSimulation();
		} catch ( error ) {
			setSimulating( false );
			createErrorNotice(
				__(
					'Operation failed. Check WooCommerce logs for more details.',
					'woocommerce-paypal-payments'
				),
				{
					icon: '❌',
				}
			);
			return;
		}

		for ( let i = 0; i < maxRetries; i++ ) {
			await sleep( 2000 );

			const simulationStateResponse = await checkWebhookSimulationState();
			try {
				if ( ! simulationStateResponse.success ) {
					console.error(
						'Simulation state query failed: ' +
							simulationStateResponse?.data
					);
					continue;
				}

				if ( simulationStateResponse?.data?.state === 'received' ) {
					createSuccessNotice(
						__(
							'The webhook was received successfully.',
							'woocommerce-paypal-payments'
						),
						{
							icon: '✔️',
						}
					);
					stopSimulation();
					return;
				}
				removeNotice( statusCheckNoticeId );
				createInfoNotice(
					__(
						'Webhook status check: ',
						'woocommerce-paypal-payments'
					) +
						( i + 1 ) +
						' / ' +
						maxRetries,
					{
						id: statusCheckNoticeId,
					}
				);
			} catch ( error ) {
				console.error( error );
			}
		}
		stopSimulation();
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
					isBusy: simulating,
					callback: () => startSimulation( 30 ),
					value: __(
						'Simulate webhooks',
						'woocommerce-paypal-payments'
					),
				} }
			/>
		</>
	);
};
export default SimulationBlock;
