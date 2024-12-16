import { useState } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import SettingsBlock from './SettingsBlock';
import PaymentMethodIcon from '../PaymentMethodIcon';
import data from '../../../utils/data';

const PaymentMethodItemBlock = ( props ) => {
	const [ paymentMethodState, setPaymentMethodState ] = useState();
	const [ modalIsVisible, setModalIsVisible ] = useState( false );
	const Modal = props?.modal;

	const handleCheckboxState = ( checked ) => {
		setPaymentMethodState( checked ? props.id : null );
	};

	return (
		<>
			<SettingsBlock
				className="ppcp-r-settings-block__payment-methods__item"
				components={ [
					() => (
						<div className="ppcp-r-settings-block__payment-methods__item__inner">
							<div className="ppcp-r-settings-block__payment-methods__item__title-wrapper">
								<PaymentMethodIcon
									icons={ [ props.icon ] }
									type={ props.icon }
								/>
								<span className="ppcp-r-settings-block__payment-methods__item__title">
									{ props.title }
								</span>
							</div>
							<p className="ppcp-r-settings-block__payment-methods__item__description">
								{ props.description }
							</p>
							<div className="ppcp-r-settings-block__payment-methods__item__footer">
								<ToggleControl
									__nextHasNoMarginBottom={ true }
									checked={ props.id === paymentMethodState }
									onChange={ handleCheckboxState }
								/>
								{ Modal && (
									<div
										className="ppcp-r-settings-block__payment-methods__item__settings"
										onClick={ () =>
											setModalIsVisible( true )
										}
									>
										{ data().getImage(
											'icon-settings.svg'
										) }
									</div>
								) }
							</div>
						</div>
					),
				] }
			/>
			{ Modal && modalIsVisible && (
				<Modal setModalIsVisible={ setModalIsVisible } />
			) }
		</>
	);
};

export default PaymentMethodItemBlock;
