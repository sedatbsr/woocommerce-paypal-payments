import { OnboardingStoreName } from './index';
import * as selectors from './onboarding/selectors';

export const addDebugTools = ( context ) => {
	if ( ! context || ! context?.debug ) {
		return;
	}

	context.dumpStore = async () => {
		/* eslint-disable no-console */
		if ( ! console?.groupCollapsed ) {
			console.error( 'console.groupCollapsed is not supported.' );
			return;
		}

		[ OnboardingStoreName ].forEach( ( storeName ) => {
			const storeSelector = `wp.data.select('${ storeName }')`;
			console.group( `[STORE] ${ storeSelector }` );

			const dumpStore = async ( selector ) => {
				const contents = await wp.data
					.resolveSelect( storeName )
					[ selector ]();

				console.groupCollapsed( `[SELECTOR] .${ selector }()` );
				console.table( contents );
				console.groupEnd();
			};

			Object.keys( selectors ).forEach( async ( selector ) => {
				await dumpStore( selector );
			} );

			console.groupEnd();
		} );
		/* eslint-enable no-console */
	};

	context.resetStore = () => {
		const onboarding = wp.data.dispatch( OnboardingStoreName );
		onboarding.reset();
		onboarding.persist();
	};

	context.startOnboarding = () => {
		const onboarding = wp.data.dispatch( OnboardingStoreName );
		onboarding.setCompleted( false );
		onboarding.setStep( 0 );
		onboarding.persist();
	};
};
