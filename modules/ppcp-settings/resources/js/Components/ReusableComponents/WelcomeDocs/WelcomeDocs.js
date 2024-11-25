import { __, sprintf } from '@wordpress/i18n';
import AcdcFlow from "./AcdcFlow";
import BcdcFlow from "./BcdcFlow";
import {Button} from "@wordpress/components";

const WelcomeDocs = ( { useAcdc, isFastlane, isPayLater, storeCountry, storeCurrency } ) => {
    const pricesBasedDescription = sprintf(
        // translators: %s: Link to PayPal REST application guide
        __(
            '<sup>1</sup>Prices based on domestic transactions as of October 25th, 2024. <a target="_blank" href="%s">Click here</a> for full pricing details.',
            'woocommerce-paypal-payments'
        ),
        'https://woocommerce.com/document/woocommerce-paypal-payments/#manual-credential-input '
    );

    const countryPriceInfo = {
        "us" : {
            "currencySymbol" : "$",
            "fixedFee" : 0.49,
            "checkout" : 3.49,
            "ccf" : 2.59,
            "dw" : 2.59,
            "apm" : 2.59,
            "standardCardFields" : 2.99,
        },
        "uk" : {
            "currencySymbol" : "£",
            "fixedFee" : 0.30,
            "checkout" : 2.90,
            "ccf" : 1.20,
            "dw" : 1.20,
            "apm" : 1.20,
            "standardCardFields" : 1.20,
        },
        "ca" : {
            "currencySymbol" : "$",
            "fixedFee" : 0.30,
            "checkout" : 2.90,
            "ccf" : 2.70,
            "dw" : 2.70,
            "apm" : 2.90,
            "standardCardFields" : 2.90,
        },
        "au" : {
            "currencySymbol" : "$",
            "fixedFee" : 0.30,
            "checkout" : 2.60,
            "ccf" : 1.75,
            "dw" : 1.75,
            "apm" : 2.60,
            "standardCardFields" : 2.60,
        },
        "fr" : {
            "currencySymbol" : "€",
            "fixedFee" : 0.35,
            "checkout" : 2.90,
            "ccf" : 1.20,
            "dw" : 1.20,
            "apm" : 1.20,
            "standardCardFields" : 1.20,
        },
        "it" : {
            "currencySymbol" : "€",
            "fixedFee" : 0.35,
            "checkout" : 3.40,
            "ccf" : 1.20,
            "dw" : 1.20,
            "apm" : 1.20,
            "standardCardFields" : 1.20,
        },
        "de" : {
            "currencySymbol" : "€",
            "fixedFee" : 0.39,
            "checkout" : 2.99,
            "ccf" : 2.99,
            "dw" : 2.99,
            "apm" : 2.99,
            "standardCardFields" : 2.99,
        },
        "es" : {
            "currencySymbol" : "€",
            "fixedFee" : 0.35,
            "checkout" : 2.90,
            "ccf" : 1.20,
            "dw" : 1.20,
            "apm" : 1.20,
            "standardCardFields" : 1.20,
        }
    }

    return (
        <div className="ppcp-r-welcome-docs">
            <h2 className="ppcp-r-welcome-docs__title">{__(`Want to know more about PayPal Payments?`, 'woocommerce-paypal-payments')}</h2>
            {useAcdc ? (
                <AcdcFlow
                    isFastlane={ isFastlane }
                    isPayLater={ isPayLater }
                    storeCountry={ storeCountry }
                    storeCurrency={ storeCurrency }
                    countryPriceInfo={ countryPriceInfo } />
            ) : (
                <BcdcFlow
                    isPayLater={ isPayLater }
                    storeCountry={ storeCountry }
                    storeCurrency={ storeCurrency }
                    countryPriceInfo={ countryPriceInfo } />
            )}
            <p
                className="ppcp-r-welcome-docs__description"
                dangerouslySetInnerHTML={{__html: pricesBasedDescription,}}
            ></p>
        </div>
    );
};

export default WelcomeDocs;
