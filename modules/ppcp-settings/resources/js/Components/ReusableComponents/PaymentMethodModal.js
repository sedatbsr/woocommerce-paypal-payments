import { Modal } from '@wordpress/components';
import PaymentMethodIcon from './PaymentMethodIcon';

const PaymentMethodModal = ( props ) => {
	let className = 'ppcp-r-modal';

	if ( props?.className ) {
		className += ' ' + props.className;
	}
	return (
		<Modal
			className={ className }
			onRequestClose={ () => props.setModalIsVisible( false ) }
		>
			<div className="ppcp-r-modal__header">
				<PaymentMethodIcon
					icons={ [ props.icon ] }
					type={ props.icon }
				/>
				<span className="ppcp-r-modal__title">{ props.title }</span>
			</div>
			<div className="ppcp-r-modal__content">{ props.children }</div>
		</Modal>
	);
};

export default PaymentMethodModal;
