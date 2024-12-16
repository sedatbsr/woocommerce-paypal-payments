const SettingsBlock = ( { className, components = [], children } ) => {
	const blockClassName = [ 'ppcp-r-settings-block', className ].filter(
		Boolean
	);

	return (
		<div className={ blockClassName.join( ' ' ) }>
			{ children ||
				components.map( ( Component, index ) => (
					<Component key={ index } />
				) ) }
		</div>
	);
};

export default SettingsBlock;
