import { STORE_NAME } from './constants';
import { initStore } from './store';
import { addDebugTools } from './debug';

initStore();

export const WC_PAYPAL_STORE_NAME = STORE_NAME;
export * from './onboarding/hooks';

addDebugTools( window.ppcpSettings );
