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
		foreach ( $this->settings_map as $settings_map ) {
			if ( in_array( $old_key, $settings_map->get_map(), true ) ) {
				return true;
			}
		}

		return false;
	}
}
