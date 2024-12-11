<?php
/**
 * A helper for mapping the new/old settings.
 *
 * @package WooCommerce\PayPalCommerce\Compat
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Compat;

/**
 * A helper class to manage the transition between legacy and new settings.
 *
 * This utility provides mapping from old setting keys to new ones and retrieves
 * their corresponding values from the appropriate models. The class uses lazy
 * loading and caching to optimize performance during runtime.
 */
class SettingsMapHelper {

	/**
	 * A list of settings maps containing mapping definitions.
	 *
	 * @var SettingsMap[]
	 */
	protected array $settings_map;

	/**
	 * Indexed map for faster lookups, initialized lazily.
	 *
	 * @var array|null Associative array where old keys map to metadata.
	 */
	protected ?array $key_to_model = null;

	/**
	 * Constructor.
	 *
	 * @param SettingsMap[] $settings_map A list of settings maps containing key definitions.
	 */
	public function __construct( array $settings_map ) {
		$this->settings_map = $settings_map;
	}

	/**
	 * Retrieves the value of a mapped key from the new settings.
	 *
	 * @param string $old_key The key from the legacy settings.
	 *
	 * @return mixed|null The value of the mapped setting, or null if not found.
	 */
	public function mapped_value( string $old_key ) {
		if ( ! $this->has_mapped_key( $old_key ) ) {
			return null;
		}

		foreach ( $this->settings_map as $settings_map ) {
			$mapped_key   = array_search( $old_key, $settings_map->get_map(), true );
			$new_settings = $settings_map->get_model()->to_array();

			if ( ! empty( $new_settings[ $mapped_key ] ) ) {
				return $new_settings[ $mapped_key ];
			}
		}

		return null;
	}

	/**
	 * Determines if a given legacy key exists in the new settings.
	 *
	 * @param string $old_key The key from the legacy settings.
	 *
	 * @return bool True if the key exists in the new settings, false otherwise.
	 */
	public function has_mapped_key( string $old_key ) : bool {
		$this->ensure_map_initialized();

		return isset( $this->key_to_model[ $old_key ] );
	}

	/**
	 * Ensures the map of old-to-new settings is initialized.
	 *
	 * This method initializes the `key_to_model` array lazily to improve performance.
	 *
	 * @return void
	 */
	protected function ensure_map_initialized() : void {
		if ( $this->key_to_model === null ) {
			$this->initialize_key_map();
		}
	}

	/**
	 * Initializes the indexed map of old-to-new settings keys.
	 *
	 * This method processes the provided settings maps and indexes the legacy
	 * keys to their corresponding metadata for efficient lookup.
	 *
	 * @return void
	 */
	protected function initialize_key_map() : void {
		$this->key_to_model = array();

		foreach ( $this->settings_map as $settings_map_instance ) {
			foreach ( $settings_map_instance->get_map() as $old_key => $new_key ) {
				$this->key_to_model[ $old_key ] = array(
					'new_key' => $new_key,
					'model'   => $settings_map_instance->get_model(),
				);
			}
		}
	}
}
