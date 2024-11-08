const checkApplePayAvailability = () => {
	// Check if ApplePaySession exists and can make payments
	if (
		! window.ApplePaySession ||
		! window.ApplePaySession.canMakePayments()
	) {
		return false;
	}

	// Create a temporary button to check if it's hidden
	const tempButton = document.createElement( 'apple-pay-button' );
	tempButton.setAttribute( 'buttonstyle', 'black' );
	tempButton.setAttribute( 'type', 'pay' );
	tempButton.setAttribute( 'locale', 'en' );

	// Check if the button is marked as hidden
	const isHidden = tempButton.getAttribute( 'aria-hidden' ) === 'true';

	return ! isHidden;
};

export default checkApplePayAvailability;
