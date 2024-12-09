const SettingsBlock = ( { className, components = [] } ) => {
	const blockClassName = [ 'ppcp-r-settings-block', className ].filter(
		Boolean
	);

	return (
		<div className={ blockClassName.join( ' ' ) }>
			{ components.map( ( Component, index ) => (
				<Component key={ index } />
			) ) }
		</div>
	);
};

export default SettingsBlock;
