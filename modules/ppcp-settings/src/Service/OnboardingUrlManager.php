<?php
/**
 * Manages (generates, returns) Onboarding URL instances.
 *
 * @package WooCommerce\PayPalCommerce\Settings\Service
 */

declare( strict_types = 1 );

namespace WooCommerce\PayPalCommerce\Settings\Service;

use WooCommerce\PayPalCommerce\ApiClient\Helper\Cache;

// TODO: Replace the OnboardingUrl with a new implementation for this module.
use WooCommerce\PayPalCommerce\Onboarding\Helper\OnboardingUrl;

/**
 * Manages (generates, returns) Onboarding URL instances.
 *
 * Those instances cannot be generated during boot time, as some details - like
 * the user-ID - are not available at that time. This manager allows accessing
 * Onboarding URL features at a later point.
 *
 * It's also a helper to transition from the legacy OnboardingURL to a new class
 * without having to re-write all token-related details just yet.
 */
class OnboardingUrlManager {
	/**
	 * Returns a new Onboarding Url instance.
	 *
	 * @param Cache  $cache            The cache object to store the URL.
	 * @param string $cache_key_prefix The prefix for the cache entry.
	 * @param int    $user_id          User ID to associate the link with.
	 *
	 * @return OnboardingUrl
	 */
	public function get( Cache $cache, string $cache_key_prefix, int $user_id ) : OnboardingUrl {
		return new OnboardingUrl( $cache, $cache_key_prefix, $user_id );
	}
}
