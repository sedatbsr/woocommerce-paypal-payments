<?php
/**
 * REST endpoint to manage the onboarding module.
 *
 * @package WooCommerce\PayPalCommerce\Settings\Endpoint
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Settings\Endpoint;

use WooCommerce\PayPalCommerce\Webhooks\Status\WebhookSimulation;
use WooCommerce\PayPalCommerce\Webhooks\WebhookRegistrar;
use WP_REST_Response;
use WP_REST_Server;

class WebhookSettingsEndpoint extends RestEndpoint {
	protected $rest_base = 'webhook_settings';
	protected string $rest_simulate_base = 'webhook_simulate';

	private array $webhooksData;
	private WebhookRegistrar $webhookRegistrar;
	private WebhookSimulation $webhookSimulation;

	public function __construct(array $webhooksData, WebhookRegistrar $webhookRegistrar, WebhookSimulation $webhookSimulation)
	{
		$this->webhooksData = $webhooksData;
		$this->webhookRegistrar = $webhookRegistrar;
		$this->webhookSimulation = $webhookSimulation;
	}

	/**
	 * Configure REST API routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_webhooks' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
				array(
					'methods' => WP_REST_Server::CREATABLE,
					'callback' => array($this, 'resubscribe_webhooks'),
					'permission_callback' => array($this, 'check_permission')
				)
			)
		);

		register_rest_route(
			$this->namespace,
			'/' .  $this->rest_simulate_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'check_simulated_webhook_state' ),
					'permission_callback' => array( $this, 'check_permission' ),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'simulate_webhooks_start' ),
					'permission_callback' => array( $this, 'check_permission' ),
				)
			)
		);
	}

	public function get_webhooks(): WP_REST_Response{
		return $this->return_success( ["webhooks" => $this->webhooksData['data'][0]] );
	}

	public function resubscribe_webhooks(): WP_REST_Response{
		if ( ! $this->webhookRegistrar->register() ) {
			return $this->return_error('Webhook subscription failed.');
		}
		return $this->return_success(["webhooks" => $this->webhooksData['data'][0]]);
	}

	public function simulate_webhooks_start(): WP_REST_Response{
		try {
			$this->webhookSimulation->start();
			return $this->return_success([]);
		} catch ( \Exception $error ) {
			return $this->return_error($error->getMessage());
		}
	}

	public function check_simulated_webhook_state(): WP_REST_Response
	{
		try {
			$state = $this->webhookSimulation->get_state();

			return $this->return_success(array(
				'state' => $state
			));

		} catch ( \Exception $error ) {
			return $this->return_error($error->getMessage());
		}
	}
}
