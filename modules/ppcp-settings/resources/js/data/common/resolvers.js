/**
 * Resolvers: Handle asynchronous data fetching for the store.
 *
 * These functions update store state with data from external sources.
 * Each resolver corresponds to a specific selector but must have a unique name.
 * Resolvers are called automatically when selectors request unavailable data.
 *
 * @file
 */

import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { apiFetch } from '@wordpress/data-controls';

import { NAMESPACE } from '../constants';
import { setIsReady, setCommonDetails } from './actions';
import { REST_HYDRATE_PATH } from './constants';

/**
 * Retrieve settings from the site's REST API.
 */
export function* commonPersistentData() {
	const path = `${ NAMESPACE }/${ REST_HYDRATE_PATH }`;

	try {
		const result = yield apiFetch( { path } );
		yield setCommonDetails( result );
		yield setIsReady( true );
	} catch ( e ) {
		yield dispatch( 'core/notices' ).createErrorNotice(
			__(
				'Error retrieving plugin details.',
				'woocommerce-paypal-payments'
			)
		);
	}
}
