import { useState } from '@wordpress/element';
import data from '../../../utils/data';
import SettingsBlock from './SettingsBlock';
import {
	Header,
	Title,
	Action,
	Description,
	TitleWrapper,
} from './SettingsBlockElements';

const AccordionSettingsBlock = ( { title, description, ...props } ) => {
	const [ isVisible, setIsVisible ] = useState( false );

	return (
		<SettingsBlock
			{ ...props }
			className={ `ppcp-r-settings-block__accordion ${
				isVisible ? 'ppcp-r-settings-block--content-visible' : ''
			}` }
			components={ [
				() => (
					<>
						<Header className="ppcp-r-settings-block--accordion__header">
							<TitleWrapper>
								<Title className="ppcp-r-settings-block--accordion__title">
									{ title }
								</Title>
								<Action>
									<div
										className="ppcp-r-settings-block__toggle-content"
										onClick={ () =>
											setIsVisible( ! isVisible )
										}
									>
										{ data().getImage(
											'icon-arrow-down.svg'
										) }
									</div>
								</Action>
							</TitleWrapper>
							<Description className="ppcp-r-settings-block--accordion__description">
								{ description }
							</Description>
						</Header>
						{ isVisible && props.children && (
							<>{ props.children }</>
						) }
					</>
				),
			] }
		/>
	);
};

export default AccordionSettingsBlock;
