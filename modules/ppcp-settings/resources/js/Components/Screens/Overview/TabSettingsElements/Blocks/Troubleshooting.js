import { __ } from '@wordpress/i18n';
import {
	Header,
	Title,
	Description,
	AccordionSettingsBlock,
	ToggleSettingsBlock,
	ButtonSettingsBlock,
} from '../../../../ReusableComponents/SettingsBlocks';
import SettingsBlock from '../../../../ReusableComponents/SettingsBlocks/SettingsBlock';
import { CommonHooks } from '../../../../../data';
import { useState } from '@wordpress/element';

const Troubleshooting = ( { updateFormValue, settings } ) => {
	const { webhooks, registerWebhooks, simulateWebhooks } =
		CommonHooks.useWebhooks();

	const [ resubscribing, setResubscribing ] = useState( false );

	const resubscribeWebhooks = async () => {
		setResubscribing( true );
		await registerWebhooks();
		setResubscribing( false );
	};

	return (
		<AccordionSettingsBlock
			className="ppcp-r-settings-block--troubleshooting"
			title={ __( 'Troubleshooting', 'woocommerce-paypal-payments' ) }
			description={ __(
				'Access tools to help debug and resolve issues.',
				'woocommerce-paypal-payments'
			) }
			actionProps={ {
				callback: updateFormValue,
				key: 'payNowExperience',
				value: settings.payNowExperience,
			} }
		>
			<ToggleSettingsBlock
				title={ __( 'Logging', 'woocommerce-paypal-payments' ) }
				description={ __(
					'Log additional debugging information in the WooCommerce logs that can assist technical staff to determine issues.',
					'woocommerce-paypal-payments'
				) }
				actionProps={ {
					callback: updateFormValue,
					key: 'logging',
					value: settings.logging,
				} }
			/>
			<SettingsBlock
				components={ [
					() => (
						<>
							<Header>
								<Title>
									{ __(
										'Subscribed PayPal webhooks',
										'woocommerce-paypal-payments'
									) }
								</Title>
								<Description>
									{ __(
										'The following PayPal webhooks are subscribed. More information about the webhooks is available in the',
										'woocommerce-paypal-payments'
									) }{ ' ' }
									<a href="https://woocommerce.com/document/woocommerce-paypal-payments/#webhook-status">
										{ __(
											'Webhook Status documentation',
											'woocommerce-paypal-payments'
										) }
									</a>
									.
								</Description>
							</Header>
							<HooksTable data={ webhooks } />
						</>
					),
				] }
			/>

			<ButtonSettingsBlock
				title={ __(
					'Resubscribe webhooks',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Click to remove the current webhook subscription and subscribe again, for example, if the website domain or URL structure changed.',
					'woocommerce-paypal-payments'
				) }
				actionProps={ {
					buttonType: 'secondary',
					isBusy: resubscribing,
					callback: () => resubscribeWebhooks(),
					value: __(
						'Resubscribe webhooks',
						'woocommerce-paypal-payments'
					),
				} }
			/>

			<ButtonSettingsBlock
				title={ __(
					'Simulate webhooks',
					'woocommerce-paypal-payments'
				) }
				actionProps={ {
					buttonType: 'secondary',
					callback: () => simulateWebhooks(),
					value: __(
						'Simulate webhooks',
						'woocommerce-paypal-payments'
					),
				} }
			/>
		</AccordionSettingsBlock>
	);
};

const HooksTable = ( { data } ) => {
	return (
		<table className="ppcp-r-table">
			<thead>
				<tr>
					<th className="ppcp-r-table__hooks-url">
						{ __( 'URL', 'woocommerce-paypal-payments' ) }
					</th>
					<th className="ppcp-r-table__hooks-events">
						{ __(
							'Tracked events',
							'woocommerce-paypal-payments'
						) }
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="ppcp-r-table__hooks-url">{ data?.[ 0 ] }</td>
					<td
						className="ppcp-r-table__hooks-events"
						dangerouslySetInnerHTML={ { __html: data?.[ 1 ] } }
					></td>
				</tr>
			</tbody>
		</table>
	);
};

export default Troubleshooting;
