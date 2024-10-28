const TitleBadge = ( { text, type } ) => {
	const className = 'ppcp-r-title-badge ' + `ppcp-r-title-badge--${ type }`;
	return <span className={ className }>{ text }</span>;
};

export const TITLE_BADGE_POSITIVE = 'positive';
export const TITLE_BADGE_NEGATIVE = 'negative';
export default TitleBadge;
