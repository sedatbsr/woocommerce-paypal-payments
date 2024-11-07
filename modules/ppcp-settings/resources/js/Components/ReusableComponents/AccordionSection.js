import React, { useState } from 'react';
import data from '../../utils/data';

const Accordion = ( {
	title,
	initiallyOpen = false,
	className = '',
	children,
} ) => {
	const [ isOpen, setIsOpen ] = useState( initiallyOpen );

	const toggleOpen = ( ev ) => {
		setIsOpen( ! isOpen );
		ev?.preventDefault();
		return false;
	};

	const iconChevron = data().getImage(
		'icon-arrow-down.svg',
		'ppcp-r-accordion--icon'
	);

	const wrapperClasses = [ 'ppcp-r-accordion' ];
	if ( className ) {
		wrapperClasses.push( className );
	}
	if ( isOpen ) {
		wrapperClasses.push( 'open' );
	}

	return (
		<div className={ wrapperClasses.join( ' ' ) }>
			<button
				onClick={ toggleOpen }
				className="ppcp-r-accordion--title"
				type="button"
			>
				{ title }
				{ iconChevron }
			</button>
			{ isOpen && (
				<div className="ppcp-r-accordion--content">{ children }</div>
			) }
		</div>
	);
};

export default Accordion;
