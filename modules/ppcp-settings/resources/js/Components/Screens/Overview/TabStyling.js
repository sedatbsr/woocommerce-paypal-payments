import { __, sprintf } from '@wordpress/i18n';
import { SelectControl, RadioControl } from '@wordpress/components';
import { PayPalCheckboxGroup } from '../../ReusableComponents/Fields';
import { useState, useMemo, useEffect } from '@wordpress/element';
import {
	defaultLocationSettings,
	paymentMethodOptions,
	colorOptions,
	shapeOptions,
	buttonLayoutOptions,
	buttonLabelOptions,
} from '../../../data/settings/tab-styling-data';
import Renderer from '../../../utils/renderer';

const TabStyling = () => {
	useEffect( () => {
		generatePreview();
	}, [] );

	const [ location, setLocation ] = useState( 'cart' );
	const [ locationSettings, setLocationSettings ] = useState( {
		...defaultLocationSettings,
	} );

	const currentLocationSettings = useMemo( () => {
		return locationSettings[ location ];
	}, [ location, locationSettings ] );

	const locationOptions = useMemo( () => {
		return Object.keys( locationSettings ).reduce(
			( locationOptionsData, key ) => {
				locationOptionsData.push( {
					value: locationSettings[ key ].value,
					label: locationSettings[ key ].label,
				} );

				return locationOptionsData;
			},
			[]
		);
	}, [] );

	const updateButtonSettings = ( key, value ) => {
		const updatedLocationSettings = { ...currentLocationSettings };

		updatedLocationSettings.settings = {
			...updatedLocationSettings.settings,
			...{ [ key ]: value },
		};

		setLocationSettings( {
			...locationSettings,
			[ location ]: { ...updatedLocationSettings },
		} );
	};

	return (
		<div className="ppcp-r-styling">
			<div className="ppcp-r-styling__settings">
				<SectionIntro />
				<TabStylingSection className="ppcp-r-styling__section--rc">
					<SelectControl
						className="ppcp-r-styling__select"
						value={ location }
						onChange={ ( newLocation ) =>
							setLocation( newLocation )
						}
						label={ __(
							'Locations',
							'woocommerce-paypal-payments'
						) }
						options={ locationOptions }
					/>
				</TabStylingSection>
				<TabStylingSection
					title={ __(
						'Payment Methods',
						'woocommerce-paypal-payments'
					) }
					className="ppcp-r-styling__section--rc"
				>
					<div className="ppcp-r-styling__payment-method-checkboxes">
						<PayPalCheckboxGroup
							value={ paymentMethodOptions }
							changeCallback={ ( newValue ) =>
								updateButtonSettings(
									'paymentMethods',
									newValue
								)
							}
							currentValue={
								currentLocationSettings.settings.paymentMethods
							}
						/>
					</div>
				</TabStylingSection>
				{ currentLocationSettings.settings?.buttonLayout && (
					<TabStylingSection
						className="ppcp-r-styling__section--rc"
						title={ __(
							'Button Layout',
							'woocommerce-paypal-payments'
						) }
					>
						<RadioControl
							className="ppcp-r__horizontal-control"
							onChange={ ( newValue ) =>
								updateButtonSettings( 'buttonLayout', newValue )
							}
							selected={
								currentLocationSettings.settings.buttonLayout
							}
							options={ buttonLayoutOptions }
						/>
					</TabStylingSection>
				) }
				<TabStylingSection
					title={ __( 'Shape', 'woocommerce-paypal-payments' ) }
					className="ppcp-r-styling__section--rc"
				>
					<RadioControl
						className="ppcp-r__horizontal-control"
						onChange={ ( newValue ) =>
							updateButtonSettings( 'shape', newValue )
						}
						selected={ currentLocationSettings.settings.shape }
						options={ shapeOptions }
					/>
				</TabStylingSection>
				<TabStylingSection>
					<SelectControl
						className="ppcp-r-styling__select"
						onChange={ ( newValue ) =>
							updateButtonSettings( 'buttonLabel', newValue )
						}
						selected={
							currentLocationSettings.settings.buttonLabel
						}
						label={ __(
							'Button Label',
							'woocommerce-paypal-payments'
						) }
						options={ buttonLabelOptions }
					/>
				</TabStylingSection>
				<TabStylingSection>
					<SelectControl
						className="ppcp-r-styling__select"
						label={ __(
							'Button Color',
							'woocommerce-paypal-payments'
						) }
						options={ colorOptions }
					/>
				</TabStylingSection>
				{ currentLocationSettings.settings?.tagLine && (
					<TabStylingSection
						title={ __( 'Tagline', 'woocommerce-paypal-payments' ) }
						className="ppcp-r-styling__section--rc"
					>
						<PayPalCheckboxGroup
							value={ [
								{
									value: 'enable-tagline',
									label: __(
										'Enable Tagline',
										'woocommerce-paypal-payments'
									),
								},
							] }
							changeCallback={ ( newValue ) =>
								updateButtonSettings( 'tagLine', newValue )
							}
							currentValue={
								currentLocationSettings.settings.tagLine
							}
						/>
					</TabStylingSection>
				) }
			</div>
			<div
				id="ppcp-r-styling-preview"
				className="ppcp-r-styling__preview"
			>
				<div className="ppcp-preview"></div>
			</div>
		</div>
	);
};

const TabStylingSection = ( props ) => {
	let sectionTitleClassName = 'ppcp-r-styling__section';

	if ( props?.className ) {
		sectionTitleClassName += ` ${ props.className }`;
	}

	return (
		<div className={ sectionTitleClassName }>
			<span className="ppcp-r-styling__title">{ props.title }</span>
			{ props?.description && (
				<p
					dangerouslySetInnerHTML={ {
						__html: props.description,
					} }
					className="ppcp-r-styling__description"
				/>
			) }
			{ props.children }
		</div>
	);
};

const SectionIntro = () => {
	const buttonStyleDescription = sprintf(
		// translators: %s: Link to Classic checkout page
		__(
			'Customize the appearance of the PayPal smart buttons on the <a href="%s">[MISSING LINK]Classic Checkout page</a>. Checkout Buttons must be enabled to display the PayPal gateway on the Checkout page.'
		),
		'#'
	);
	return (
		<TabStylingSection
			className="ppcp-r-styling__section--rc ppcp-r-styling__section--empty"
			title={ __( 'Button Styling', 'wooocommerce-paypal-payments' ) }
			description={ buttonStyleDescription }
		></TabStylingSection>
	);
};

const generatePreview = () => {
	const settings = {
		button: {
			wrapper: '#ppcp-r-styling-preview',
			style: {
				color: 'gold',
				shape: 'rect',
				label: 'paypal',
				tagline: false,
				layout: 'horizontal',
			},
		},
		separate_buttons: {},
	};
	const renderer = new Renderer(
		null,
		settings,
		( data, actions ) => actions.reject(),
		null
	);
	jQuery( document ).trigger( 'ppcp_paypal_render_preview', settings );

	renderer.render( {} );
};

export default TabStyling;
