<?php
/**
 * Handles connection-requests, that connect the current site to a PayPal
 * merchant account.
 *
 * @package WooCommerce\PayPalCommerce\Settings\Handler
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Settings\Handler;

use WooCommerce\PayPalCommerce\Settings\Data\CommonSettings;
use WooCommerce\PayPalCommerce\Settings\Service\OnboardingUrlManager;

class ConnectionHandler {
	/**
	 * ID of the current settings page; empty if not on a PayPal settings page.
	 *
	 * @var string
	 */
	private string $settings_page_id;

	/**
	 * Access to connection settings.
	 *
	 * @var CommonSettings
	 */
	private CommonSettings $settings;

	/**
	 * Access to the onboarding URL manager.
	 *
	 * @var OnboardingUrlManager
	 */
	private OnboardingUrlManager $url_manager;

	/**
	 * ID of the current user, set by the process() method.
	 *
	 * @var int
	 */
	private int $user_id;

	/**
	 * Prepare the instance.
	 *
	 * @param string               $settings_page_id Current plugin settings page ID.
	 * @param CommonSettings       $settings         Access to saved connection details.
	 * @param OnboardingUrlManager $url_manager      Get OnboardingURL instances.
	 */
	public function __construct( string $settings_page_id, CommonSettings $settings, OnboardingUrlManager $url_manager ) {
		$this->settings_page_id = $settings_page_id;
		$this->settings         = $settings;
		$this->url_manager      = $url_manager;

		// Initialize as "guest", the real ID is provided via process().
		$this->user_id = 0;
	}

	/**
	 * Process the request data, and extract connection details, if present.
	 *
	 * @param int   $user_id The current user ID.
	 * @param array $request Request details to process.
	 */
	public function process( int $user_id, array $request ) : void {
		$this->user_id = $user_id;

		if ( ! $this->is_valid_request( $request ) ) {
			return;
		}

		$data = $this->extract_data( $request );
		$this->store_data(
			$data['use_sandbox'],
			$data['merchant_id'],
			$data['merchant_email']
		);
	}

	/**
	 * Determine, if the request details contain connection data that should be
	 * extracted and stored.
	 *
	 * @param array $request Request details to verify.
	 *
	 * @return bool True, if the request contains valid connection details.
	 */
	protected function is_valid_request( array $request ) : bool {
		if ( $this->user_id < 1 || ! $this->settings_page_id ) {
			return false;
		}

		if ( ! user_can( $this->user_id, 'manage_woocommerce' ) ) {
			return false;
		}

		// Requirement 3: The params are present and not empty - 'merchantIdInPayPal' - 'merchantId' - 'ppcpToken'

		return true;
	}

	/**
	 * Checks, if the connection token is valid.
	 *
	 * If the token is valid, it is *instantly invalidated* by this check: It's
	 * not possible to verify the same token twice.
	 *
	 * @param string $token The token to verify.
	 *
	 * @return bool True, if the token is valid.
	 */
	protected function is_token_valid( string $token ) : bool {

		// $valid = OnboardingUrl::validate_token_and_delete( $this->cache, $token, $user_id )
		//          OR OnboardingUrl::validate_previous_token( $this->cache, $token, $user_id )

		return true;
	}

	protected function extract_data( array $request ) : array {
		// $merchant_id: $request['merchantIdInPayPal'] (!), sanitize: sanitize_text_field( wp_unslash() )
		// $merchant_email: $request['merchantId'] (!), sanitize: $this->sanitize_merchant_email()

		return array(
			'is_sandbox'     => $this->settings->get_sandbox(),
			'merchant_id'    => $merchant_id,
			'merchant_email' => $merchant_email,
		);
	}

	/**
	 * Sanitizes the merchant's email address for processing.
	 *
	 * @param string $email The plain email.
	 *
	 * @return string
	 */
	private function sanitize_merchant_email( string $email ) : string {
		return sanitize_text_field( str_replace( ' ', '+', $email ) );
	}

	/**
	 * Persist the merchant details to the database.
	 *
	 * @param bool   $is_sandbox
	 * @param string $merchant_id
	 * @param string $merchant_email
	 */
	protected function store_data( bool $is_sandbox, string $merchant_id, string $merchant_email ) : void {
		$this->settings->set_merchant_data( $is_sandbox, $merchant_id, $merchant_email );
		$this->settings->save();
	}
}
