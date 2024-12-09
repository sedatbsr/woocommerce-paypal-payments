import {
	Children,
	isValidElement,
	cloneElement,
	useMemo,
} from '@wordpress/element';
import classNames from 'classnames';

import { CommonHooks } from '../../data';
import SpinnerOverlay from './SpinnerOverlay';

/**
 * Wraps interactive child elements and modifies their behavior based on the global `isBusy` state.
 * Allows custom processing of child props via the `onBusy` callback.
 *
 * @param {Object}   props           - Component properties.
 * @param {Children} props.children  - Child components to wrap.
 * @param {boolean}  props.enabled   - Enables or disables the busy-state logic.
 * @param {string}   props.className - Additional class names for the wrapper.
 * @param {Function} props.onBusy    - Callback to process child props when busy.
 */
const BusyStateWrapper = ( {
	children,
	enabled = true,
	className = '',
	onBusy = () => ( { disabled: true } ),
} ) => {
	const { isBusy } = CommonHooks.useBusyState();

	const markAsBusy = isBusy && enabled;

	const wrapperClassName = classNames( 'ppcp-r-busy-wrapper', className, {
		'ppcp--is-loading': markAsBusy,
	} );

	const memoizedChildren = useMemo(
		() =>
			Children.map( children, ( child ) =>
				isValidElement( child )
					? cloneElement(
							child,
							markAsBusy ? onBusy( child.props ) : {}
					  )
					: child
			),
		[ children, markAsBusy, onBusy ]
	);

	return (
		<div className={ wrapperClassName }>
			{ markAsBusy && <SpinnerOverlay /> }
			{ memoizedChildren }
		</div>
	);
};

export default BusyStateWrapper;
