import data from '../../utils/data';
import TitleBadge, {TITLE_BADGE_INFO} from "./TitleBadge";
import {__} from "@wordpress/i18n";

const BadgeBox = ( props ) => {
    const titleTag = props.titleTag ?? 'h3';
    const TitleTag = titleTag;
	return (
        <div className="ppcp-r-text-badge-box">
            <span className="ppcp-r-text-badge-box__title">
                {props.title}

                {props.imageBadge && (
                    <span className="ppcp-r-title-image-badge">
                        {props.imageBadge.map((badge) => data().getImage(badge))}
                    </span>
                )}

                {props.textBadge && (
                    <TitleBadge type={TITLE_BADGE_INFO} text={props.textBadge}/>
                )}
            </span>
            <div className="ppcp-r-text-badge-box__description">
                {props?.description && (
                    <p
                        className="ppcp-r-text-badge-box__description"
                        dangerouslySetInnerHTML={{
                            __html: props.description,
                        }}
                    ></p>
                )}
            </div>
        </div>
    );
};

export default BadgeBox;
