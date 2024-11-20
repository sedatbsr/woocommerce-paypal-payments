import * as Onboarding from './onboarding';
import { addDebugTools } from './debug';

Onboarding.initStore();

export const OnboardingHooks = Onboarding.hooks;
export const OnboardingStoreName = Onboarding.STORE_NAME;

export * from './constants';

addDebugTools( window.ppcpSettings );
