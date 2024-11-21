import PaymentMethodModal from '../../../ReusableComponents/PaymentMethodModal';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import {
	PayPalRdb,
	PayPalRdbWithContent,
} from '../../../ReusableComponents/Fields';
import { useState } from '@wordpress/element';

const THREED_SECURE_GROUP_NAME = 'threed-secure';
const ModalAcdc = ( { setModalIsVisible } ) => {
	const [ threeDSecure, setThreeDSecure ] = useState( 'no-3d-secure' );

	return (
		<PaymentMethodModal
			setModalIsVisible={ setModalIsVisible }
			icon="payment-method-cards"
			title={ __(
				'Advanced Credit and Debit Card Payments',
				'woocommerce-paypal-payments'
			) }
		>
			<strong className="ppcp-r-modal__content-title">
				{ __( '3D Secure', 'woocommerce-paypal-payments' ) }
			</strong>
			<p className="ppcp-r-modal__description">
				{ __(
					'Authenticate cardholders through their card issuers to reduce fraud and improve transaction security. Successful 3D Secure authentication can shift liability for fraudulent chargebacks to the card issuer.',
					'woocommerce-paypal-payments'
				) }
			</p>
			<div className="ppcp-r-modal__field-rows ppcp-r-modal__field-rows--acdc">
				<PayPalRdbWithContent
					id="no-3d-secure"
					name={ THREED_SECURE_GROUP_NAME }
					value="no-3d-secure"
					currentValue={ threeDSecure }
					handleRdbState={ setThreeDSecure }
					label={ __(
						'No 3D Secure',
						'woocommerce-paypal-payments'
					) }
				/>
				<PayPalRdbWithContent
					id="only-required-3d-secure"
					name={ THREED_SECURE_GROUP_NAME }
					value="only-required-3d-secure"
					currentValue={ threeDSecure }
					handleRdbState={ setThreeDSecure }
					label={ __(
						'Only when required',
						'woocommerce-paypal-payments'
					) }
				/>

				<PayPalRdbWithContent
					id="always-3d-secure"
					name={ THREED_SECURE_GROUP_NAME }
					value="always-3d-secure"
					currentValue={ threeDSecure }
					handleRdbState={ setThreeDSecure }
					label={ __(
						'Always require 3D Secure',
						'woocommerce-paypal-payments'
					) }
				/>
			</div>
			<div className="ppcp-r-modal__field-rows">
				<div className="ppcp-r-modal__field-row ppcp-r-modal__field-row--save">
					<Button variant="primary">
						{ __( 'Save changes', 'woocommerce-paypal-payments' ) }
					</Button>
				</div>
			</div>
		</PaymentMethodModal>
	);
};

export default ModalAcdc;
