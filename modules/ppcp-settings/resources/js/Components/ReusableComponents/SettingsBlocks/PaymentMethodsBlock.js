import SettingsBlock from './SettingsBlock';
import PaymentMethodItemBlock from './PaymentMethodItemBlock';

const PaymentMethodsBlock = ( { paymentMethods, className = '' } ) => {
	if ( paymentMethods.length === 0 ) {
		return null;
	}

	return (
		<SettingsBlock
			className={ `ppcp-r-settings-block__payment-methods ${ className }` }
			components={ [
				() => (
					<>
						{ paymentMethods.map( ( paymentMethod ) => (
							<PaymentMethodItemBlock
								key={ paymentMethod.id }
								{ ...paymentMethod }
							/>
						) ) }
					</>
				),
			] }
		/>
	);
};

export default PaymentMethodsBlock;
