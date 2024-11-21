/**
 * Hooks: Provide the main API for components to interact with the store.
 *
 * These encapsulate store interactions, offering a consistent interface.
 * Hooks simplify data access and manipulation for components.
 *
 * @file
 */

import { useSelect } from '@wordpress/data';

import { STORE_NAME } from './constants';

const useTransient = ( key ) =>
	useSelect(
		( select ) => select( STORE_NAME ).transientData()?.[ key ],
		[ key ]
	);

const usePersistent = ( key ) =>
	useSelect(
		( select ) => select( STORE_NAME ).persistentData()?.[ key ],
		[ key ]
	);

export const useBusyState = () => {
	const { setIsBusy } = useDispatch( STORE_NAME );
	const isBusy = useTransient( 'isBusy' );

	return {
		isBusy,
		setIsBusy: useCallback( ( busy ) => setIsBusy( busy ), [ setIsBusy ] ),
	};
};
