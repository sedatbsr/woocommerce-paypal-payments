/**
 * Controls: Implement side effects, typically asynchronous operations.
 *
 * Controls use ACTION_TYPES keys as identifiers.
 * They are triggered by corresponding actions and handle external interactions.
 *
 * @file
 */

import { select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import {
	STORE_NAME,
	REST_PERSIST_PATH,
	REST_MANUAL_CONNECTION_PATH,
} from './constants';
import ACTION_TYPES from './action-types';

export const controls = {
	async [ ACTION_TYPES.DO_PERSIST_DATA ]( { data } ) {
		console.log( 'Do PERSIST: ', data );
		try {
			await apiFetch( {
				path: REST_PERSIST_PATH,
				method: 'POST',
				data,
			} );
		} catch ( e ) {
			console.error( 'Error saving progress.', e );
		}
	},

	async [ ACTION_TYPES.DO_MANUAL_CONNECTION ]( {
		clientId,
		clientSecret,
		useSandbox,
	} ) {
		let result = null;

		try {
			result = await apiFetch( {
				path: REST_MANUAL_CONNECTION_PATH,
				method: 'POST',
				data: {
					clientId,
					clientSecret,
					useSandbox,
				},
			} );
		} catch ( e ) {
			result = {
				success: false,
				error: e,
			};
		}

		return result;
	},
};
