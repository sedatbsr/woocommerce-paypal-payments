import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { apiFetch } from '@wordpress/data-controls';

import { NAMESPACE } from '../constants';
import { REST_HYDRATE_PATH } from './constants';
import { setIsReady, hydrateOnboardingDetails } from './actions';

/**
 * Retrieve settings from the site's REST API.
 */
export function* onboardingPersistentData() {
	const path = `${ NAMESPACE }/${ REST_HYDRATE_PATH }`;

	try {
		const result = yield apiFetch( { path } );
		yield hydrateOnboardingDetails( result );
		yield setIsReady( true );
	} catch ( e ) {
		yield dispatch( 'core/notices' ).createErrorNotice(
			__(
				'Error retrieving onboarding details.',
				'woocommerce-paypal-payments'
			)
		);
	}
}
