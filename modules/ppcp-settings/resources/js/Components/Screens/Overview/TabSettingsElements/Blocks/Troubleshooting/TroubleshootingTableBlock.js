import { __ } from '@wordpress/i18n';

const TroubleshootingTableBlock = ( { webhooks } ) => {
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
					<td className="ppcp-r-table__hooks-url">
						{ webhooks?.[ 0 ] }
					</td>
					<td
						className="ppcp-r-table__hooks-events"
						dangerouslySetInnerHTML={ { __html: webhooks?.[ 1 ] } }
					></td>
				</tr>
			</tbody>
		</table>
	);
};

export default TroubleshootingTableBlock;
