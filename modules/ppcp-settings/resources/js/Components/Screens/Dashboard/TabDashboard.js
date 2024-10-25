import SettingsCard from '../../ReusableComponents/SettingsCard';
import { __ } from '@wordpress/i18n';
import {
	PayPalCheckbox,
	handleCheckboxState,
} from '../../ReusableComponents/Fields';
import { useState } from '@wordpress/element';
import data from '../../../utils/data';
import { Button, TextControl } from '@wordpress/components';

const TabDashboard = () => {
	const [ todos, setTodos ] = useState( [] );
	const [ todosData, setTodosData ] = useState( todosDataDefault );

	return (
		<div className="ppcp-r-tab-dashboard">
			<SettingsCard
				className="ppcp-r-tab-dashboard-todo"
				icon="icon-dashboard-list.svg"
				title={ __(
					'Things to do next',
					'woocommerce-paypal-payments'
				) }
				description={ __(
					'Complete these tasks to keep your store updated with the latest products and services.',
					'woocommerce-paypal-payments'
				) }
			>
				<div className="ppcp-r-todo-items">
					{ todosData.map( ( todo ) => (
						<TodoItem
							name="todo_items"
							key={ todo.value }
							value={ todo.value }
							currentValue={ todos }
							changeCallback={ setTodos }
							description={ todo.description }
							changeTodos={ setTodosData }
							todosData={ todosData }
						/>
					) ) }
				</div>
			</SettingsCard>
			<SettingsCard
				className="ppcp-r-tab-dashboard-support"
				icon="icon-dashboard-support.svg"
				title={ __( 'Status', 'woocommerce-paypal-payments' ) }
				description={ __(
					'Your PayPal account connection details, along with available products and features.',
					'woocommerce-paypal-payments'
				) }
			>
				{ featuresDefault.map( ( feature ) => {
					return (
						<FeatureItem
							key={ feature.id }
							title={ feature.title }
							description={ feature.description }
							buttons={ feature.buttons }
						/>
					);
				} ) }
			</SettingsCard>
		</div>
	);
};

const TodoItem = ( props ) => {
	return (
		<div className="ppcp-r-todo-item">
			<div className="ppcp-r-todo-item__inner">
				<PayPalCheckbox
					{ ...{
						...props,
						handleCheckboxState,
					} }
				/>{ ' ' }
				<p>{ props.description }</p>
			</div>
			<div
				className="ppcp-r-todo-item__close"
				onClick={ () =>
					removeTodo(
						props.value,
						props.todosData,
						props.changeTodos
					)
				}
			>
				{ data().getImage( 'icon-close.svg' ) }
			</div>
		</div>
	);
};

const FeatureItem = ( props ) => {
	return (
		<div className="ppcp-r-feature-item">
			<span className="ppcp-r-feature-item__title">
				{ props.title }
				{ props.status && (
					<span className="ppcp-r_feature-item__status">
						{ props.status }
					</span>
				) }
			</span>
			<p className="ppcp-r-feature-item__description">
				{ props.description }
			</p>
			<div className="ppcp-r-feature-item__buttons">
				{ props.buttons.map( ( button ) => {
					console.log( button );
					return (
						<Button key={ button.text } variant={ button.type }>
							{ button.text }
						</Button>
					);
				} ) }
			</div>
		</div>
	);
};

const removeTodo = ( todoValue, todosData, changeTodos ) => {
	changeTodos( todosData.filter( ( todo ) => todo.value !== todoValue ) );
};

const todosDataDefault = [
	{
		value: 'paypal_later_messaging',
		description: __(
			'Enable Pay Later messaging',
			'woocommerce-paypal-payments'
		),
	},
	{
		value: 'capture_authorized_payments',
		description: __(
			'Capture authorized payments',
			'woocommerce-paypal-payments'
		),
	},
	{
		value: 'enable_google_pay',
		description: __( 'Enable Google Pay', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'paypal_shortcut',
		description: __(
			'Add PayPal shortcut to the Cart page',
			'woocommerce-paypal-payments'
		),
	},
	{
		value: 'advanced_cards',
		description: __(
			'Add Advanced Cards to Blocks Checkout',
			'woocommerce-paypal-payments'
		),
	},
];

const featuresDefault = [
	{
		id: 'save_paypal_and_venmo',
		title: __( 'Save PayPal and Venmo', 'woocommerce-paypal-payments' ),
		description: __(
			'Securely save PayPal and Venmo payment methods for subscriptions or return buyers.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __( 'Configure', 'woocommerce-paypal-payments' ),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
	{
		id: 'advanced_credit_and_debit_cards',
		title: __(
			'Advanced Credit and Debit Cards',
			'woocommerce-paypal-payments'
		),
		description: __(
			'Process major credit and debit cards including Visa, Mastercard, American Express and Discover.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __( 'Configure', 'woocommerce-paypal-payments' ),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
	{
		id: 'alternative_payment_methods',
		title: __(
			'Alternative Payment Methods',
			'woocommerce-paypal-payments'
		),
		description: __(
			'Offer global, country-specific payment options for your customers.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __( 'Apply', 'woocommerce-paypal-payments' ),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
	{
		id: 'google_pay',
		title: __( 'Google Pay', 'woocommerce-paypal-payments' ),
		description: __(
			'Let customers pay using their Google Pay wallet.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __( 'Configure', 'woocommerce-paypal-payments' ),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
	{
		id: 'apple_pay',
		title: __( 'Apple Pay', 'woocommerce-paypal-payments' ),
		description: __(
			'Let customers pay using their Apple Pay wallet.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __(
					'Domain registration',
					'woocommerce-paypal-payments'
				),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
	{
		id: 'pay_later_messaging',
		title: __( 'Pay Later Messaging', 'woocommerce-paypal-payments' ),
		description: __(
			'Let customers know they can buy now and pay later with PayPal. Adding this messaging can boost conversion rates and increase cart sizes by 39%¹, with no extra cost to you—plus, you get paid up front.',
			'woocommerce-paypal-payments'
		),
		buttons: [
			{
				type: 'primary',
				text: __( 'Configure', 'woocommerce-paypal-payments' ),
			},
			{
				type: 'secondary',
				text: __( 'Learn more', 'woocommerce-paypal-payments' ),
			},
		],
		notes: [ __( '', 'woocommerce-paypal-payments' ) ],
	},
];
export default TabDashboard;
