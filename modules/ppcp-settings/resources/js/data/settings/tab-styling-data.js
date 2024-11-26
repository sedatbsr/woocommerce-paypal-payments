import { __ } from '@wordpress/i18n';

const settings = {
	paymentMethods: [],
	buttonLayout: 'horizontal',
	shape: null,
	buttonLabel: 'paypal',
	buttonColor: 'gold',
	tagLine: [],
};

const cartAndExpressCheckoutSettings = {
	paymentMethods: [],
	shape: null,
	buttonLabel: 'paypal',
	buttonColor: 'gold',
};

export const defaultLocationSettings = {
	cart: {
		value: 'cart',
		label: __( 'Cart', 'woocommerce-paypal-payments' ),
		settings: { ...cartAndExpressCheckoutSettings },
	},
	'classic-checkout': {
		value: 'classic-checkout',
		label: __( 'Classic Checkout', 'woocommerce-paypal-payments' ),
		settings: { ...settings },
	},
	'express-checkout': {
		value: 'express-checkout',
		label: __( 'Express Checkout', 'woocommerce-paypal-payments' ),
		settings: { ...cartAndExpressCheckoutSettings },
	},
	'mini-cart': {
		value: 'mini-cart',
		label: __( 'Mini Cart', 'woocommerce-paypel-payements' ),
		settings: { ...settings },
	},
	'product-page': {
		value: 'product-page',
		label: __( 'Product Page', 'woocommerce-paypal-payments' ),
		settings: { ...settings },
	},
};

export const paymentMethodOptions = [
	{
		value: 'venmo',
		label: __( 'Venmo', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'pay-later',
		label: __( 'Pay Later', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'debit-or-credit-card',
		label: __( 'Debit or Credit Card', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'google-pay',
		label: __( 'Google Pay', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'apple-pay',
		label: __( 'Apple Pay', 'woocommerce-paypal-payments' ),
	},
];

export const buttonLabelOptions = [
	{
		value: 'paypal',
		label: __( 'PayPal', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'checkout',
		label: __( 'Checkout', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'paypal-buy-now',
		label: __( 'PayPal Buy Now', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'pay-with-paypal',
		label: __( 'Pay with PayPal', 'woocommerce-paypal-payments' ),
	},
];

export const colorOptions = [
	{
		value: 'gold',
		label: __( 'Gold (Recommended)', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'blue',
		label: __( 'Blue', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'silver',
		label: __( 'Silver', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'black',
		label: __( 'Black', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'white',
		label: __( 'White', 'woocommerce-paypal-payments' ),
	},
];

export const buttonLayoutOptions = [
	{
		label: __( 'Vertical', 'woocommerce-paypal-payments' ),
		value: 'vertical',
	},
	{
		label: __( 'Horizontal', 'woocommerce-paypal-payments' ),
		value: 'horizontal',
	},
];

export const shapeOptions = [
	{
		value: 'pill',
		label: __( 'Pill', 'woocommerce-paypal-payments' ),
	},
	{
		value: 'rectangle',
		label: __( 'Rectangle', 'woocommerce-paypal-payments' ),
	},
];
