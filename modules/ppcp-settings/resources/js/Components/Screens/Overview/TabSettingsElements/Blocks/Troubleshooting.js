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

const Troubleshooting = ( { updateFormValue, settings } ) => {
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
			<SettingsBlock>
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
				<HooksTable data={ hooksExampleData() } />
			</SettingsBlock>

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
					callback: () =>
						console.log(
							'Resubscribe webhooks',
							'woocommerce-paypal-payments'
						),
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
					callback: () =>
						console.log(
							'Simulate webhooks',
							'woocommerce-paypal-payments'
						),
					value: __(
						'Simulate webhooks',
						'woocommerce-paypal-payments'
					),
				} }
			/>
		</AccordionSettingsBlock>
	);
};

const hooksExampleData = () => {
	return {
		url: 'https://www.rt3.tech/wordpress/paypal-ux-testin/index.php?rest_route=/paypal/v1/incoming',
		hooks: [
			'billing plan pricing-change activated',
			'billing plan updated',
			'billing subscription cancelled',
			'catalog product updated',
			'checkout order approved',
			'checkout order completed',
			'checkout payment-approval reversed',
			'payment authorization voided',
			'payment capture completed',
			'payment capture denied',
			'payment capture pending',
			'payment capture refunded',
			'payment capture reversed',
			'payment order cancelled',
			'payment sale completed',
			'payment sale refunded',
			'vault payment-token created',
			'vault payment-token deleted',
		],
	};
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
					<td className="ppcp-r-table__hooks-url">{ data?.url }</td>
					<td className="ppcp-r-table__hooks-events">
						{ data.hooks.map( ( hook, index ) => (
							<span key={ hook }>
								{ hook }{ ' ' }
								{ index !== data.hooks.length - 1 && ',' }
							</span>
						) ) }
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Troubleshooting;
