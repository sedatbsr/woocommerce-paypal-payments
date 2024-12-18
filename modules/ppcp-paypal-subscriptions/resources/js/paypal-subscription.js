import { __ } from '@wordpress/i18n';
document.addEventListener( 'DOMContentLoaded', () => {

	const disableFields = ( productId ) => {
        const variations = document.querySelector( '.woocommerce_variations' );
		if ( variations ) {
			const children = variations.children;
			for ( let i = 0; i < children.length; i++ ) {
				const variableId = children[ i ]
					.querySelector( 'h3' )
					.getElementsByClassName( 'variable_post_id' )[ 0 ].value;
				if ( parseInt( variableId ) === productId ) {
					children[ i ]
						.querySelector( '.woocommerce_variable_attributes' )
						.getElementsByClassName(
							'wc_input_subscription_period_interval'
						)[ 0 ]
						.setAttribute( 'disabled', 'disabled' );
					children[ i ]
						.querySelector( '.woocommerce_variable_attributes' )
						.getElementsByClassName(
							'wc_input_subscription_period'
						)[ 0 ]
						.setAttribute( 'disabled', 'disabled' );
					children[ i ]
						.querySelector( '.woocommerce_variable_attributes' )
						.getElementsByClassName(
							'wc_input_subscription_trial_length'
						)[ 0 ]
						.setAttribute( 'disabled', 'disabled' );
					children[ i ]
						.querySelector( '.woocommerce_variable_attributes' )
						.getElementsByClassName(
							'wc_input_subscription_trial_period'
						)[ 0 ]
						.setAttribute( 'disabled', 'disabled' );
					children[ i ]
						.querySelector( '.woocommerce_variable_attributes' )
						.getElementsByClassName(
							'wc_input_subscription_length'
						)[ 0 ]
						.setAttribute( 'disabled', 'disabled' );
				}
			}
		}

		const periodInterval = document.querySelector(
			'#_subscription_period_interval'
		);
		periodInterval.setAttribute( 'disabled', 'disabled' );

		const subscriptionPeriod = document.querySelector(
			'#_subscription_period'
		);
		subscriptionPeriod.setAttribute( 'disabled', 'disabled' );

		const subscriptionLength = document.querySelector(
			'._subscription_length_field'
		);
		subscriptionLength.style.display = 'none';

		const subscriptionTrial = document.querySelector(
			'._subscription_trial_length_field'
		);
		subscriptionTrial.style.display = 'none';

		const soldIndividually = document.querySelector(
			'#_sold_individually'
		);
		soldIndividually.setAttribute( 'disabled', 'disabled' );
	};

    const checkSubscriptionPeriodsInterval = (period, period_interval, linkBtn) => {
        if (
            ( period === 'year' && parseInt( period_interval ) > 1 ) ||
            ( period === 'month' && parseInt( period_interval ) > 12 ) ||
            ( period === 'week' && parseInt( period_interval ) > 52 ) ||
            ( period === 'day' && parseInt( period_interval ) > 356 )
        ) {
            linkBtn.disabled = true;
            linkBtn.checked = false;
            linkBtn.setAttribute('title', __( 'Not allowed period intervall combination!', 'woocommerce-paypal-subscriptions' ) );
        } else {
            linkBtn.disabled = false;
            linkBtn.removeAttribute('title');
        }
    }

	const setupProducts = () => {
        jQuery( '.wc_input_subscription_period' ).on( 'change', (e) => {
            const linkBtn = e.target.parentElement.parentElement.parentElement.querySelector('input[name="_ppcp_enable_subscription_product"]');
            const period_interval = e.target.parentElement.querySelector('select.wc_input_subscription_period_interval')?.value;
            const period = e.target.value;

            checkSubscriptionPeriodsInterval(period, period_interval, linkBtn);
        });

        jQuery( '.wc_input_subscription_period_interval' ).on( 'change', (e) => {
            const linkBtn = e.target.parentElement.parentElement.parentElement.querySelector('input[name="_ppcp_enable_subscription_product"]');
            const period_interval = e.target.value;
            const period = e.target.parentElement.querySelector('select.wc_input_subscription_period')?.value;

            checkSubscriptionPeriodsInterval(period, period_interval, linkBtn);
        });

		PayPalCommerceGatewayPayPalSubscriptionProducts?.forEach(
			( product ) => {
				if ( product.product_connected === 'yes' ) {
					disableFields( product.product_id );
				}

                const linkBtn = document.getElementById(
                    `ppcp_enable_subscription_product-${ product.product_id }`
                );
                linkBtn?.addEventListener( 'click', ( event ) => {
                    const unlinkBtnP = document.getElementById(
                        `ppcp-enable-subscription-${ product.product_id }`
                    );
                    const titleP = document.getElementById(
                        `ppcp_subscription_plan_name_p-${ product.product_id }`
                    );
                    if (event.target.checked === true) {
                        if ( unlinkBtnP ) {
                            unlinkBtnP.style.display = 'none';
                        }
                        if ( titleP ) {
                            titleP.style.display = 'block';
                        }
                    } else {
                        if ( unlinkBtnP ) {
                            unlinkBtnP.style.display = 'block';
                        }
                        if ( titleP ) {
                            titleP.style.display = 'none';
                        }
                    }
                });

                const unlinkBtn = document.getElementById(
                    `ppcp-unlink-sub-plan-${ product.product_id }`
                );
				unlinkBtn?.addEventListener( 'click', ( event ) => {
					event.preventDefault();
					unlinkBtn.disabled = true;
					const spinner = document.getElementById(
						'spinner-unlink-plan'
					);
					spinner.style.display = 'inline-block';

					fetch( product.ajax.deactivate_plan.endpoint, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'same-origin',
						body: JSON.stringify( {
							nonce: product.ajax.deactivate_plan.nonce,
							plan_id: product.plan_id,
							product_id: product.product_id,
						} ),
					} )
						.then( function ( res ) {
							return res.json();
						} )
						.then( function ( data ) {
							if ( ! data.success ) {
								unlinkBtn.disabled = false;
								spinner.style.display = 'none';
								console.error( data );
								throw Error( data.data.message );
							}

							const enableSubscription = document.getElementById(
								'ppcp-enable-subscription-' + data.data.product_id
							);
							const product =	document.getElementById( 'pcpp-product-' + data.data.product_id );
							const plan = document.getElementById( 'pcpp-plan-' + data.data.product_id );
							enableSubscription.style.display = 'none';
							product.style.display = 'none';
							plan.style.display = 'none';

							const enable_subscription_product =
								document.getElementById(
									'ppcp_enable_subscription_product-' + data.data.product_id
								);
							enable_subscription_product.disabled = true;

							const planUnlinked =
								document.getElementById( 'pcpp-plan-unlinked-' + data.data.product_id );
							planUnlinked.style.display = 'block';

							setTimeout( () => {
								location.reload();
							}, 1000 );
						} );
				} );
			}
		);
	};

	setupProducts();
	jQuery( '#woocommerce-product-data' ).on(
		'woocommerce_variations_loaded',
		() => {
			setupProducts();
		}
	);
} );
