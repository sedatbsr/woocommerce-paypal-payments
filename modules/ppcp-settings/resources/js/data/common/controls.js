/**
 * Controls: Implement side effects, typically asynchronous operations.
 *
 * Controls use ACTION_TYPES keys as identifiers to ensure uniqueness.
 * They are triggered by corresponding actions and handle external interactions.
 *
 * @file
 */

import { select } from '@wordpress/data';
import { apiFetch } from '@wordpress/api-fetch';

import { NAMESPACE, STORE_NAME } from '../constants';
import { REST_PERSIST_PATH } from './constants';
import ACTION_TYPES from './action-types';
export const controls = {
	[ ACTION_TYPES.DO_PERSIST_DATA ]: async () => {
		const path = `${ NAMESPACE }/${ REST_PERSIST_PATH }`;
		const data = select( STORE_NAME ).getPersistentData();

		try {
			return await apiFetch( {
				path,
				method: 'post',
				data,
			} );
		} catch ( error ) {
			console.error( 'Error saving progress.', error );
			throw error;
		}
	},
};
