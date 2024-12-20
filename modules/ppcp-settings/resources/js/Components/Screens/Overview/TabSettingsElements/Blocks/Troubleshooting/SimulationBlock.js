import { useCallback, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { REST_WEBHOOKS_SIMULATE } from '../../../../../../data/common/constants';
import { __ } from '@wordpress/i18n';
import { ButtonSettingsBlock } from '../../../../../ReusableComponents/SettingsBlocks';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const SimulationBlock = () => {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );

	const [ simulating, setSimulating ] = useState( false );

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
		const retriesBeforeErrorMessage = 15;
		const maxRetries = 30;

		setSimulating( true );

		createSuccessNotice(
			__(
				'Waiting for the webhook to arrive…',
				'woocommerce-paypal-payments'
			)
		);

		try {
			await startWebhookSimulation();
		} catch ( error ) {
			setSimulating( false );
			createErrorNotice(
				__(
					'Operation failed. Check WooCommerce logs for more details.',
					'woocommerce-paypal-payments'
				)
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

				const state = simulationStateResponse?.data?.state;
				if ( state === 'received' ) {
					setSimulating( false );
					createSuccessNotice(
						'✔️ ' +
							__(
								'The webhook was received successfully.',
								'woocommerce-paypal-payments'
							)
					);
					return;
				}
			} catch ( exc ) {
				console.error( exc );
			}

			if ( i === retriesBeforeErrorMessage ) {
				createErrorNotice(
					__(
						'Looks like the webhook cannot be received. Check that your website is accessible from the internet.',
						'woocommerce-paypal-payments'
					)
				);
			}
		}

		setSimulating( false );
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
export default SimulationBlock;
