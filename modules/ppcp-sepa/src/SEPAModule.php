<?php
/**
 * The SEPA module.
 *
 * @package WooCommerce\PayPalCommerce\SEPA
 */

declare(strict_types=1);

namespace WooCommerce\PayPalCommerce\SEPA;

use WC_Payment_Gateway;
use WooCommerce\PayPalCommerce\Vendor\Inpsyde\Modularity\Module\ExecutableModule;
use WooCommerce\PayPalCommerce\Vendor\Inpsyde\Modularity\Module\ExtendingModule;
use WooCommerce\PayPalCommerce\Vendor\Inpsyde\Modularity\Module\ModuleClassNameIdTrait;
use WooCommerce\PayPalCommerce\Vendor\Inpsyde\Modularity\Module\ServiceModule;
use WooCommerce\PayPalCommerce\Vendor\Psr\Container\ContainerInterface;

/**
 * Class LocalAlternativePaymentMethodsModule
 */
class SEPAModule implements ServiceModule, ExtendingModule, ExecutableModule {
	use ModuleClassNameIdTrait;

	/**
	 * {@inheritDoc}
	 */
	public function services() : array {
		return require __DIR__ . '/../services.php';
	}

	/**
	 * {@inheritDoc}
	 */
	public function extensions() : array {
		return require __DIR__ . '/../extensions.php';
	}

	/**
	 * {@inheritDoc}
	 */
	public function run( ContainerInterface $c ): bool {
		add_filter(
			'woocommerce_payment_gateways',
			/**
			 * Param types removed to avoid third-party issues.
			 *
			 * @psalm-suppress MissingClosureParamType
			 */
			static function ( $methods ) use ( $c ): array {
				if ( ! is_array( $methods ) ) {
					return $methods;
				}

				$sepa_gateway = $c->get( 'sepa.wc-gateway' );
				assert( $sepa_gateway instanceof WC_Payment_Gateway );

				$methods[] = $sepa_gateway;

				return $methods;
			}
		);

		return true;
	}
}
