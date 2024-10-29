import { Button } from '@wordpress/components';
import PaymentMethodIcon from './PaymentMethodIcon';
import { PayPalCheckbox } from './Fields';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const PaymentMethodItem = ( props ) => {
	const [ paymentMethodState, setPaymentMethodState ] = useState();
	const [ modalIsVisible, setModalIsVisible ] = useState( false );
	const handleCheckboxState = ( checked ) => {
		if ( checked ) {
			setPaymentMethodState( props.payment_method_id );
		} else {
			setPaymentMethodState( null );
		}
	};
	return (
		<>
			<div className="ppcp-r-payment-method-item">
				<div className="ppcp-r-payment-method-item__checkbox-wrap">
					<PayPalCheckbox
						currentValue={ [ paymentMethodState ] }
						name="payment_method_status"
						value={ props.payment_method_id }
						handleCheckboxState={ handleCheckboxState }
					/>
					<div className="ppcp-r-payment-method-item__icon-wrap">
						<PaymentMethodIcon
							icons={ [ props.icon ] }
							type={ props.icon }
						/>
					</div>
					<div className="ppcp-r-payment-method-item__content">
						<span className="ppcp-r-payment-method-item__title">
							{ props.title }
						</span>
						<p>{ props.description }</p>
					</div>
				</div>
				{ props.modal && (
					<Button
						variant="secondary"
						onClick={ () => {
							setModalIsVisible( true );
						} }
					>
						{ __( 'Modify', 'woocommerce-paypal-payments' ) }
					</Button>
				) }
			</div>
			{ modalIsVisible && props.modal( setModalIsVisible ) }
		</>
	);
};

export default PaymentMethodItem;
