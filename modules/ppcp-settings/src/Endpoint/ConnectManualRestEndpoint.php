<?php
/**
 * REST controller for connection via manual credentials input.
 *
 * @package WooCommerce\PayPalCommerce\Settings\Endpoint
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Settings\Endpoint;

use WP_REST_Server;
use WP_REST_Response;
use WP_REST_Request;

/**
 * REST controller for connection via manual credentials input.
 */
class ConnectManualRestEndpoint extends RestEndpoint {
	/**
	 * The base path for this REST controller.
	 *
	 * @var string
	 */
	protected $rest_base = 'connect_manual';

	/**
	 * Field mapping for request.
	 *
	 * @var array
	 */
	private array $field_map = array(
		'client_id'     => array(
			'js_name'  => 'clientId',
			'sanitize' => 'sanitize_text_field',
		),
		'client_secret' => array(
			'js_name'  => 'clientSecret',
			'sanitize' => 'sanitize_text_field',
		),
		'use_sandbox'   => array(
			'js_name'  => 'useSandbox',
			'sanitize' => 'to_boolean',
		),
	);

	/**
	 * Configure REST API routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'connect_manual' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
			)
		);
	}

	/**
	 * Retrieves merchantId and email.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function connect_manual( WP_REST_Request $request ) : WP_REST_Response {
		$data = $this->sanitize_for_wordpress(
			$request->get_params(),
			$this->field_map
		);

		if ( ! isset( $data['client_id'] ) || empty( $data['client_id'] )
		|| ! isset( $data['client_secret'] ) || empty( $data['client_secret'] ) ) {
			return rest_ensure_response(
				array(
					'success' => false,
				)
			);
		}

		$result = array(
			'merchantId' => 'bt_us@woocommerce.com',
			'email'      => 'AT45V2DGMKLRY',
			'success'    => true,
		);

		return rest_ensure_response( $result );
	}
}
