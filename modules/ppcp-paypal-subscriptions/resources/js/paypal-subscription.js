document.addEventListener( 'DOMContentLoaded', () => {
	const variations = document.querySelector( '.woocommerce_variations' );
	const disableFields = ( productId ) => {
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

    const updateInterval = () => {
        const subscriptionPeriodInterval = document.querySelector('#_subscription_period_interval');
        const subscriptionPeriod = document.querySelector('#_subscription_period');
        const subscriptionProduct = document.querySelector('#ppcp_enable_subscription_product');
        const optionsDisable = (start = 0) => {
            const subscriptionPeriodIntervalChildren = subscriptionPeriodInterval.children;
            for (let i = 0; i < subscriptionPeriodIntervalChildren.length; i++) {
                if ( start === 0 || parseInt( subscriptionPeriodIntervalChildren[i].value ) <= start ) {
                    subscriptionPeriodIntervalChildren[i].disabled = false;
                    subscriptionPeriodIntervalChildren[i].removeAttribute('disabled');
                } else {
                    subscriptionPeriodIntervalChildren[i].disabled = true;
                    subscriptionPeriodIntervalChildren[i].setAttribute('disabled', 'disabled');
                }
            }
            jQuery( '#_subscription_period_interval' ).trigger('change.select2');
        };

        const updateSubscriptionPeriodInterval = () => {
            if (subscriptionProduct?.checked === false) {
                optionsDisable();
                return;
            }
            if ( subscriptionPeriod.value === 'year' ) {
                optionsDisable( 1 );
                if ( parseInt( subscriptionPeriodInterval.value ) > 1 ) {
                    subscriptionPeriodInterval.value = '1';
                }
            }
            if ( subscriptionPeriod.value === 'month' ) {
                optionsDisable( 12 );
                if ( parseInt( subscriptionPeriodInterval.value ) > 12 ) {
                    subscriptionPeriodInterval.value = '12';
                }
            }
            if ( subscriptionPeriod.value === 'week' ) {
                optionsDisable( 52 );
                if ( parseInt( subscriptionPeriodInterval.value ) > 52 ) {
                    subscriptionPeriodInterval.value = '52';
                }
            }
            if ( subscriptionPeriod.value === 'day' ) {
                optionsDisable( 365 );
                if ( parseInt( subscriptionPeriodInterval.value ) > 365 ) {
                    subscriptionPeriodInterval.value = '365';
                }
            }
            jQuery( '#_subscription_period_interval' ).trigger( 'change.select2' );
        }

        subscriptionProduct?.addEventListener( 'change', (e) => {
            updateSubscriptionPeriodInterval();
        });
        jQuery( '#_subscription_period' ).on( 'change', (e) => {
            updateSubscriptionPeriodInterval();
        });
        jQuery( '#_subscription_period_interval' ).on( 'change', (e) => {
            updateSubscriptionPeriodInterval();
        });
    };

	const setupProducts = () => {
		PayPalCommerceGatewayPayPalSubscriptionProducts?.forEach(
			( product ) => {
				if ( product.product_connected === 'yes' ) {
					disableFields( product.product_id );
				} else {
                    updateInterval();
                }

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
								'ppcp-enable-subscription'
							);
							const product =
								document.getElementById( 'pcpp-product' );
							const plan = document.getElementById( 'pcpp-plan' );
							enableSubscription.style.display = 'none';
							product.style.display = 'none';
							plan.style.display = 'none';

							const enable_subscription_product =
								document.getElementById(
									'ppcp_enable_subscription_product'
								);
							enable_subscription_product.disabled = true;

							const planUnlinked =
								document.getElementById( 'pcpp-plan-unlinked' );
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
