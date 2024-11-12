import BadgeBox, { BADGE_BOX_TITLE_BIG } from "./BadgeBox";
import { __, sprintf } from '@wordpress/i18n';
import Separator from './Separator';

const WelcomeDocs = ( props ) => {
    const pricesBasedDescription = sprintf(
        // translators: %s: Link to PayPal REST application guide
        __(
            '<sup>1</sup>Prices based on domestic transactions as of October 25th, 2024. <a target="_blank" href="%s">Click here</a> for full pricing details.',
            'woocommerce-paypal-payments'
        ),
        'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
    )

    return (
        <div className="ppcp-r-welcome-docs">
            <h2 className="ppcp-r-welcome-docs__title">{ __( `Want to know more about PayPal Payments?`, 'woocommerce-paypal-payments' ) }</h2>
            <div className="ppcp-r-welcome-docs__wrapper">
                <div className="ppcp-r-welcome-docs__col">
                    <BadgeBox
                        title={ __( 'PayPal Checkout', 'woocommerce-paypal-payments' ) }
                        titleType={ BADGE_BOX_TITLE_BIG }
                        textBadge={ __( 'from 3.49% + $0.49 USD<sup>1</sup>', 'woocommerce-paypal-payments' ) }
                        description={ __(
                            'Our all-in-one checkout solution lets you offer PayPal, Venmo, Pay Later options, and more to help maximise conversion',
                            'woocommerce-paypal-payments'
                        ) }
                    />
                    <BadgeBox
                        title={ __( 'Included in PayPal Checkout', 'woocommerce-paypal-payments' ) }
                        titleType={ BADGE_BOX_TITLE_BIG }/>
                    <BadgeBox
                        title={ __( 'Pay with PayPal', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-button-paypal.svg' ] }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Our brand recognition helps give customers the confidence to buy. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( 'Pay Later', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-payment-method-paypal-small.svg' ] }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Offer installment payment options and get paid upfront - at no extra cost to you. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( 'Venmo', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-button-venmo.svg' ] }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Automatically offer Venmo checkout to millions of active users. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( 'Crypto', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-payment-method-crypto.svg' ] }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Let customers checkout with Crypto while you get paid in cash. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                </div>
                <div className="ppcp-r-welcome-docs__col">
                    <BadgeBox
                        title={ __( 'Optional payment methods', 'woocommerce-paypal-payments' ) }
                        titleType={ BADGE_BOX_TITLE_BIG }
                        description={ __( 'with additional application', 'woocommerce-paypal-payments' ) }
                    />
                    <BadgeBox
                        title={ __( 'Custom Card Fields', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-button-visa.svg', 'icon-button-mastercard.svg', 'icon-button-amex.svg', 'icon-button-discover.svg' ] }
                        textBadge={ __( 'from 2.59% + $0.49 USD<sup>1</sup>', 'woocommerce-paypal-payments' ) }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Style the credit card fields to match your own style. Includes advanced processing with risk management, 3D Secure, fraud protection options, and chargeback protection. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( 'Digital Wallets', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-button-apple-pay.svg', 'icon-button-google-pay.svg' ] }
                        textBadge={ __( 'from 2.59% + $0.49 USD<sup>1</sup>', 'woocommerce-paypal-payments' ) }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Accept Apple Pay on eligible devices and Google Pay through mobile and web. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( 'Alternative Payment Methods', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-button-sepa.svg', 'icon-button-ideal.svg', 'icon-button-blik.svg', 'icon-button-bancontact.svg' ] }
                        textBadge={ __( 'from 3.49% + $0.49 USD<sup>1</sup>', 'woocommerce-paypal-payments' ) }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Seamless payments for customers across the globe using their preferred payment methods. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                    <Separator className="ppcp-r-page-welcome-mode-separator"/>
                    <BadgeBox
                        title={ __( '', 'woocommerce-paypal-payments' ) }
                        imageBadge={ [ 'icon-payment-method-fastlane-small.svg' ] }
                        textBadge={ __( 'from 2.59% + $0.49 USD<sup>1</sup>', 'woocommerce-paypal-payments' ) }
                        description={ sprintf(
                            // translators: %s: Link to PayPal REST application guide
                            __(
                                'Speed up guest checkout with Fatslane. Link a customer\'s email address to their payment details. <a target="_blank" href="%s">Learn more</a>',
                                'woocommerce-paypal-payments'
                            ),
                            'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
                        ) }
                    />
                </div>
            </div>
            <p
                className="ppcp-r-welcome-docs__description"
                dangerouslySetInnerHTML={ { __html: pricesBasedDescription, } }
            ></p>
        </div>
    );
};

export default WelcomeDocs;
