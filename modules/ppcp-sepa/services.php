<?php
/**
 * The SEPA module services.
 *
 * @package WooCommerce\PayPalCommerce\SEPA
 */

declare(strict_types=1);

namespace WooCommerce\PayPalCommerce\LocalAlternativePaymentMethods;

use WooCommerce\PayPalCommerce\SEPA\SEPAGateway;
use WooCommerce\PayPalCommerce\Vendor\Psr\Container\ContainerInterface;

return array(
	'sepa.wc-gateway' => static function ( ContainerInterface $container ): SEPAGateway {
		return new SEPAGateway(
			$container->get( 'wcgateway.order-processor' ),
			$container->get( 'api.factory.paypal-checkout-url' ),
			$container->get( 'wcgateway.processor.refunds' ),
			$container->get( 'wcgateway.transaction-url-provider' ),
			$container->get( 'session.handler' ),
			$container->get( 'woocommerce.logger.woocommerce' )
		);
	},
);
