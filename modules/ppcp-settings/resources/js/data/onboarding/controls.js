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
import { REST_PERSIST_PATH, REST_MANUAL_CONNECTION_PATH } from './constants';
import ACTION_TYPES from './action-types';
import { setIsSaving, setManualConnectionIsBusy } from './actions';

export const controls = {
	[ ACTION_TYPES.DO_PERSIST_DATA ]: async ( { dispatch } ) => {
		let error = null;

		try {
			const path = `${ NAMESPACE }/${ REST_PERSIST_PATH }`;
			const data = select( STORE_NAME ).onboardingPersistentData();

			dispatch( setIsSaving( true ) );

			await apiFetch( {
				path,
				method: 'post',
				data,
			} );
		} catch ( e ) {
			error = e;
			console.error( 'Error saving progress.', e );
		} finally {
			dispatch( setIsSaving( false ) );
		}

		return error === null;
	},

	[ ACTION_TYPES.DO_MANUAL_CONNECTION ]: async ( { dispatch } ) => {
		let result = null;

		try {
			const path = `${ NAMESPACE }/${ REST_MANUAL_CONNECTION_PATH }`;
			const { clientId, clientSecret, useSandbox } =
				select( STORE_NAME ).onboardingPersistentData();

			dispatch( setManualConnectionIsBusy( true ) );

			result = await apiFetch( {
				path,
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
		} finally {
			dispatch( setManualConnectionIsBusy( false ) );
		}

		return result;
	},
};
