const { test, expect } = require( '@playwright/test' );
const { loginAsCustomer, loginAsAdmin } = require( './utils/user' );

async function createSubscription( page ) {
	await page.click( 'text=Debit & Credit Cards' );

	const creditCardNumber = await page
		.frameLocator( '[title="paypal_card_number_field"]' )
		.locator( '.card-field-number' );
	await creditCardNumber.fill( '4005519200000004' );

	const expirationDate = await page
		.frameLocator( 'iframe[title="paypal_card_expiry_field"]' )
		.locator( 'input.card-field-expiry' );
	await expirationDate.click();
	await page.keyboard.type( '12/25' );

	const cvv = await page
		.frameLocator( '[title="paypal_card_cvv_field"]' )
		.locator( '.card-field-cvv' );
	await cvv.fill( '123' );

	await page.getByRole( 'button', { name: 'Sign up now' } ).click();
}

test( 'Purchase and renewal subscription', async ( { page } ) => {
	await loginAsCustomer( page );

	await page.goto( '/classic-checkout?add-to-cart=14' );
	await createSubscription( page );

	//await loginAsAdmin( page );
} );
