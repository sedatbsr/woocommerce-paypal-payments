/**
 * Internal dependencies
 */
import { test as setup } from '../../utils';
import { products } from '../../resources';

setup(
	'Setup WooCommerce Subscription',
	async ( { utils, wooCommerceUtils } ) => {
		await utils.activateWcSubscriptionsPlugin();

		// create subscription test product
		const product = products.subscription10;
		const createdProduct = await wooCommerceUtils.createProduct( product );

		// store created products as CART_ITEMS env var
		const cartItems = JSON.parse( process.env.PRODUCTS || '{}' );
		cartItems[ product.slug ] = { id: createdProduct.id };
		process.env.PRODUCTS = JSON.stringify( cartItems );
	}
);
