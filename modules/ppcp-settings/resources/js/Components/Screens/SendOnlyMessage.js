const SendOnlyMessage = () => {
	return (
		<p>
			Your current WooCommerce store location is in a "send-only" country,
			according to PayPal's policies. Sellers in these countries are
			unable to receive payments via PayPal. Since receiving payments is
			essential for using the PayPal Payments extension, you will not be
			able to connect your PayPal account while operating from a
			"send-only" country. To activate PayPal, please update your
			WooCommerce store location to a supported region and connect a
			PayPal account eligible for receiving payments.
		</p>
	);
};

export default SendOnlyMessage;
