import { Button, ToggleControl, SelectControl } from '@wordpress/components';
import data from '../../utils/data';
import { useState } from '@wordpress/element';

export const SETTINGS_BLOCK_TYPE_EMPTY = 'empty';
export const SETTINGS_BLOCK_TYPE_TOGGLE = 'toggle';
export const SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT = 'toggle-content';
export const SETTINGS_BLOCK_TYPE_INPUT = 'input';
export const SETTINGS_BLOCK_TYPE_BUTTON = 'button';
export const SETTINGS_BLOCK_TYPE_SELECT = 'select';

export const SETTINGS_BLOCK_STYLING_TYPE_PRIMARY = 'primary';
export const SETTINGS_BLOCK_STYLING_TYPE_SECONDARY = 'secondary';
export const SETTINGS_BLOCK_STYLING_TYPE_TERTIARY = 'tertiary';

const SettingsBlock = ( {
	className,
	title,
	description,
	children,
	style,
	actionProps,
	tag,
} ) => {
	const [ toggleContentVisible, setToggleContentVisible ] = useState(
		actionProps?.type !== SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT
	);

	const toggleContent = () => {
		if ( actionProps?.type !== SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT ) {
			return;
		}
		setToggleContentVisible( ! toggleContentVisible );
	};

	const blockClassName = [ 'ppcp-r-settings-block' ];

	blockClassName.push( 'ppcp-r-settings-block--' + style );
	blockClassName.push( 'ppcp-r-settings-block--' + actionProps?.type );

	if ( className ) {
		blockClassName.push( className );
	}

	if (
		toggleContentVisible &&
		actionProps?.type === SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT
	) {
		blockClassName.push( 'ppcp-r-settings-block--content-visible' );
	}

	return (
		<div className={ blockClassName.join( ' ' ) }>
			<div
				className="ppcp-r-settings-block__header"
				onClick={ () => toggleContent() }
			>
				<div className="ppcp-r-settings-block__header-inner">
					<span className="ppcp-r-settings-block__title">
						{ title }
						{ tag && tag }
					</span>
					<p
						className="ppcp-r-settings-block__description"
						dangerouslySetInnerHTML={ { __html: description } }
					/>
				</div>
				<div className="ppcp-r-settings-block__action">
					{ actionProps?.type === SETTINGS_BLOCK_TYPE_TOGGLE && (
						<ToggleControl
							className="ppcp-r-settings-block__toggle"
							__nextHasNoMarginBottom={ true }
							checked={ actionProps?.value }
							onChange={ ( newValue ) =>
								actionProps?.callback(
									actionProps?.key,
									newValue
								)
							}
						/>
					) }
					{ actionProps?.type === SETTINGS_BLOCK_TYPE_INPUT && (
						<div>
							<input
								placeholder={ actionProps?.placeholder }
								type="text"
								value={ actionProps?.value }
								onInput={ ( e ) =>
									actionProps?.callback(
										actionProps?.key,
										e.target.value
									)
								}
							/>
						</div>
					) }
					{ actionProps?.type === SETTINGS_BLOCK_TYPE_BUTTON && (
						<Button
							variant={ actionProps.buttonType }
							onClick={
								actionProps?.callback
									? () => actionProps.callback()
									: undefined
							}
						>
							{ actionProps.value }
						</Button>
					) }
					{ actionProps?.type ===
						SETTINGS_BLOCK_TYPE_TOGGLE_CONTENT && (
						<div className="ppcp-r-settings-block__toggle-content">
							{ data().getImage( 'icon-arrow-down.svg' ) }
						</div>
					) }
					{ actionProps?.type === SETTINGS_BLOCK_TYPE_SELECT && (
						<SelectControl
							className={
								actionProps.value === '' &&
								'ppcp-r-select-no-value-assigned'
							}
							value={ actionProps.value }
							options={ actionProps?.options }
							multiple={ true }
							onChange={ ( newValue ) =>
								actionProps?.callback &&
								actionProps.callback(
									actionProps?.key,
									newValue
								)
							}
						/>
					) }
				</div>
			</div>
			{ children && toggleContentVisible && (
				<div className="ppcp-r-settings-block__content">
					{ children }
				</div>
			) }
		</div>
	);
};

export default SettingsBlock;
