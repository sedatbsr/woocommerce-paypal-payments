<?php
/**
 * The FraudProcessorResponse object.
 *
 * @package WooCommerce\PayPalCommerce\ApiClient\Entity
 */

declare(strict_types=1);

namespace WooCommerce\PayPalCommerce\ApiClient\Entity;

/**
 * Class FraudProcessorResponse
 */
class FraudProcessorResponse {

	/**
	 * The AVS response code.
	 *
	 * @var string
	 */
	protected string $avs_code;

	/**
	 * The CVV response code.
	 *
	 * @var string
	 */
	protected string $cvv2_code;

	/**
	 * FraudProcessorResponse constructor.
	 *
	 * @param string|null $avs_code The AVS response code.
	 * @param string|null $cvv2_code The CVV response code.
	 */
	public function __construct( ?string $avs_code, ?string $cvv2_code ) {
		$this->avs_code  = (string) $avs_code;
		$this->cvv2_code = (string) $cvv2_code;
	}

	/**
	 * Returns the AVS response code.
	 *
	 * @return string
	 */
	public function avs_code(): ?string {
		return $this->avs_code;
	}

	/**
	 * Returns the CVV response code.
	 *
	 * @return string
	 */
	public function cvv_code(): ?string {
		return $this->cvv2_code;
	}

	/**
	 * Returns the object as array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		return array(
			'avs_code'  => $this->avs_code(),
			'cvv2_code' => $this->cvv_code(),
		);
	}

	/**
	 * Retrieves the AVS (Address Verification System) code messages based on the AVS response code.
	 *
	 * Provides human-readable descriptions for various AVS response codes
	 * and returns the corresponding message for the given code.
	 *
	 * @return string The AVS response code message. If the code is not found, an error message is returned.
	 */
	public function get_avs_code_messages(): string {
		if ( $this->avs_code() ) {
			return '';
		}
		$messages = array(
			/* Visa, Mastercard, Discover, American Express */
			'A' => __( 'A: Address - Address only (no ZIP code)', 'woocommerce-paypal-payments' ),
			'B' => __( 'B: International "A" - Address only (no ZIP code)', 'woocommerce-paypal-payments' ),
			'C' => __( 'C: International "N" - None. The transaction is declined.', 'woocommerce-paypal-payments' ),
			'D' => __( 'D: International "X" - Address and Postal Code', 'woocommerce-paypal-payments' ),
			'E' => __( 'E: Not allowed for MOTO (Internet/Phone) transactions - Not applicable. The transaction is declined.', 'woocommerce-paypal-payments' ),
			'F' => __( 'F: UK-specific "X" - Address and Postal Code', 'woocommerce-paypal-payments' ),
			'G' => __( 'G: Global Unavailable - Not applicable', 'woocommerce-paypal-payments' ),
			'I' => __( 'I: International Unavailable - Not applicable', 'woocommerce-paypal-payments' ),
			'M' => __( 'M: Address - Address and Postal Code', 'woocommerce-paypal-payments' ),
			'N' => __( 'N: No - None. The transaction is declined.', 'woocommerce-paypal-payments' ),
			'P' => __( 'P: Postal (International "Z") - Postal Code only (no Address)', 'woocommerce-paypal-payments' ),
			'R' => __( 'R: Retry - Not applicable', 'woocommerce-paypal-payments' ),
			'S' => __( 'S: Service not Supported - Not applicable', 'woocommerce-paypal-payments' ),
			'U' => __( 'U: Unavailable / Address not checked, or acquirer had no response. Service not available.', 'woocommerce-paypal-payments' ),
			'W' => __( 'W: Whole ZIP - Nine-digit ZIP code (no Address)', 'woocommerce-paypal-payments' ),
			'X' => __( 'X: Exact match - Address and nine-digit ZIP code)', 'woocommerce-paypal-payments' ),
			'Y' => __( 'Y: Yes - Address and five-digit ZIP', 'woocommerce-paypal-payments' ),
			'Z' => __( 'Z: ZIP - Five-digit ZIP code (no Address)', 'woocommerce-paypal-payments' ),
			/* Maestro */
			'0' => __( '0: All the address information matched.', 'woocommerce-paypal-payments' ),
			'1' => __( '1: None of the address information matched. The transaction is declined.', 'woocommerce-paypal-payments' ),
			'2' => __( '2: Part of the address information matched.', 'woocommerce-paypal-payments' ),
			'3' => __( '3: The merchant did not provide AVS information. Not processed.', 'woocommerce-paypal-payments' ),
			'4' => __( '4: Address not checked, or acquirer had no response. Service not available.', 'woocommerce-paypal-payments' ),
		);

		/**
		 * Psalm suppress
		 *
		 * @psalm-suppress PossiblyNullArrayOffset
		 * @psalm-suppress PossiblyNullArgument
		 */
		/* translators: %s is fraud AVS code */
		return $messages[ $this->avs_code() ] ?? sprintf( __( '%s: Error', 'woocommerce-paypal-payments' ), $this->avs_code() );
	}

	/**
	 * Retrieves the CVV2 code message based on the CVV code provided.
	 *
	 * This method maps CVV response codes to their corresponding descriptive messages.
	 *
	 * @return string The descriptive message corresponding to the CVV2 code, or a formatted error message if the code is unrecognized.
	 */
	public function get_cvv2_code_messages(): string {
		if ( $this->cvv_code() ) {
			return '';
		}
		$messages = array(
			/* Visa, Mastercard, Discover, American Express */
			'E' => __( 'E: Error - Unrecognized or Unknown response', 'woocommerce-paypal-payments' ),
			'I' => __( 'I: Invalid or Null', 'woocommerce-paypal-payments' ),
			'M' => __( 'M: Match or CSC', 'woocommerce-paypal-payments' ),
			'N' => __( 'N: No match', 'woocommerce-paypal-payments' ),
			'P' => __( 'P: Not processed', 'woocommerce-paypal-payments' ),
			'S' => __( 'S: Service not supported', 'woocommerce-paypal-payments' ),
			'U' => __( 'U: Unknown - Issuer is not certified', 'woocommerce-paypal-payments' ),
			'X' => __( 'X: No response / Service not available', 'woocommerce-paypal-payments' ),
			/* Maestro */
			'0' => __( '0: Matched CVV2', 'woocommerce-paypal-payments' ),
			'1' => __( '1: No match', 'woocommerce-paypal-payments' ),
			'2' => __( '2: The merchant has not implemented CVV2 code handling', 'woocommerce-paypal-payments' ),
			'3' => __( '3: Merchant has indicated that CVV2 is not present on card', 'woocommerce-paypal-payments' ),
			'4' => __( '4: Service not available', 'woocommerce-paypal-payments' ),
		);

		/**
		 * Psalm suppress
		 *
		 * @psalm-suppress PossiblyNullArrayOffset
		 * @psalm-suppress PossiblyNullArgument
		 */
		/* translators: %s is fraud CVV2 code */
		return $messages[ $this->cvv_code() ] ?? sprintf( __( '%s: Error', 'woocommerce-paypal-payments' ), $this->cvv_code() );
	}
}
