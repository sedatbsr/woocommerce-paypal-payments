import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ButtonSettingsBlock } from '../../../../../ReusableComponents/SettingsBlocks';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { CommonHooks } from '../../../../../../data';

const SimulationBlock = () => {
	const {
		createSuccessNotice,
		createInfoNotice,
		createErrorNotice,
		removeNotice,
	} = useDispatch( noticesStore );
	const { startWebhookSimulation, checkWebhookSimulationState } =
		CommonHooks.useWebhooks();
	const [ simulating, setSimulating ] = useState( false );
	const sleep = ( ms ) => {
		return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
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
			console.error( error );
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
