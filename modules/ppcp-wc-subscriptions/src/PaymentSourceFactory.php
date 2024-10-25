<?php
/**
 * Payment source factory
 *
 * @package WooCommerce\PayPalCommerce\WcSubscriptions
 */

declare(strict_types=1);

namespace WooCommerce\PayPalCommerce\WcSubscriptions;

use Exception;
use WC_Order;
use WC_Payment_Tokens;
use WC_Subscription;
use WooCommerce\PayPalCommerce\ApiClient\Entity\PaymentSource;
use WooCommerce\PayPalCommerce\Vaulting\PaymentTokenApplePay;
use WooCommerce\PayPalCommerce\Vaulting\PaymentTokenVenmo;
use WooCommerce\PayPalCommerce\Vaulting\WooCommercePaymentTokens;
use WooCommerce\PayPalCommerce\WcGateway\Gateway\CreditCardGateway;
use WooCommerce\PayPalCommerce\WcGateway\Gateway\PayPalGateway;
use WooCommerce\PayPalCommerce\WcSubscriptions\Helper\SubscriptionHelper;

/**
 * Class PaymentSourceFactory
 */
class PaymentSourceFactory {

	/**
	 * WooCommerce payment tokens.
	 *
	 * @var WooCommercePaymentTokens
	 */
	private $wc_payment_tokens;

	/**
	 * Subscription helper.
	 *
	 * @var SubscriptionHelper
	 */
	private $subscription_helper;

	/**
	 * PaymentSourceFactory constructor.
	 *
	 * @param WooCommercePaymentTokens $wc_payment_tokens WooCommerce payment tokens.
	 * @param SubscriptionHelper       $subscription_helper Subscription helper.
	 */
	public function __construct(
		WooCommercePaymentTokens $wc_payment_tokens,
		SubscriptionHelper $subscription_helper
	) {
		$this->wc_payment_tokens   = $wc_payment_tokens;
		$this->subscription_helper = $subscription_helper;
	}

	/**
	 * @throws Exception
	 */
	public function payment_source( string $payment_method, int $user_id, WC_Order $wc_order ): PaymentSource {
		switch ( $payment_method ) {
			case PayPalGateway::ID:
				return $this->create_paypal_payment_source( $user_id );
			case CreditCardGateway::ID:
				return $this->create_card_payment_source( $user_id, $wc_order );
			default:
				throw new Exception( 'Could not create payment source' );
		}
	}

	/**
	 * @throws Exception
	 */
	private function create_paypal_payment_source( int $user_id ): PaymentSource {
		$wc_tokens     = WC_Payment_Tokens::get_customer_tokens( $user_id, PayPalGateway::ID );
		$paypal_tokens = $this->wc_payment_tokens->customer_tokens( $user_id );
		foreach ( $wc_tokens as $wc_token ) {
			foreach ( $paypal_tokens as $paypal_token ) {
				if ( $paypal_token['id'] === $wc_token->get_token() ) {
					$name       = 'paypal';
					$properties = array(
						'vault_id' => $wc_token->get_token(),
					);

					if ( $wc_token instanceof PaymentTokenVenmo ) {
						$name = 'venmo';
					}

					if ( $wc_token instanceof PaymentTokenApplePay ) {
						$name                            = 'apple_pay';
						$properties['stored_credential'] = array(
							'payment_initiator' => 'MERCHANT',
							'payment_type'      => 'RECURRING',
							'usage'             => 'SUBSEQUENT',
						);
					}

					return new PaymentSource(
						$name,
						(object) $properties
					);
				}
			}
		}

		throw new Exception( 'Could not create PayPal payment source.' );
	}

	/**
	 * @throws Exception
	 */
	private function create_card_payment_source( int $user_id, WC_Order $wc_order ): PaymentSource {
		$wc_tokens     = WC_Payment_Tokens::get_customer_tokens( $user_id, CreditCardGateway::ID );
		$subscriptions = wcs_get_subscriptions_for_renewal_order( $wc_order );
		$subscription  = end( $subscriptions );

		foreach ( $wc_tokens as $wc_token ) {
			$properties = array(
				'vault_id' => $wc_token->get_token(),
			);

			if ( $subscription ) {
				$tokens = $subscription->get_payment_tokens();
				if ( in_array( $wc_token->get_id(), $tokens, true ) ) {
					$properties = $this->add_previous_transaction( $subscription, $properties );
				}
			}

			return new PaymentSource(
				'card',
				(object) $properties
			);

		}

		throw new Exception( 'Could not create card payment source.' );
	}

	/**
	 * @param WC_Subscription $subscription
	 * @param array           $properties
	 * @return array
	 */
	private function add_previous_transaction( WC_Subscription $subscription, array $properties ): array {
		$transaction = $this->subscription_helper->previous_transaction( $subscription );
		if ( $transaction ) {
			$properties['stored_credential'] = array(
				'payment_initiator'              => 'MERCHANT',
				'payment_type'                   => 'RECURRING',
				'usage'                          => 'SUBSEQUENT',
				'previous_transaction_reference' => $transaction,
			);
		}

		return $properties;
	}
}
