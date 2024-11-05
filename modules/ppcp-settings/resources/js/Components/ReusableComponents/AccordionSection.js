import React, { useState } from 'react';
import data from '../../utils/data';

const Accordion = ( { title, initiallyOpen, children } ) => {
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

	return (
		<div className={ `ppcp-r-accordion ${ isOpen ? 'open' : '' }` }>
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
