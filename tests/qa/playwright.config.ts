/**
 * External dependencies
 */
import { defineConfig, devices } from '@playwright/test';
require( 'dotenv' ).config();

/**
 * Internal dependencies
 */
import { storeSetupProjects } from './tests/.setup/store';
import { pcpSetupProjects } from './tests/.setup/pcp';
import { gatewaySetupProjects } from './tests/.setup/gateways';
import { parallelProjects } from './parallel.projects.config';

export default defineConfig( {
	testDir: 'tests',
	expect: {
		timeout: 20 * 1000,
	},
	timeout: 2 * 60 * 1000,
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !! process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI
		? [
				[ 'list' ],
				// [ 'html', { outputFolder: 'playwright-report' } ],
				[
					'@inpsyde/playwright-utils/build/integration/jira/xray-reporter.js',
					{
						apiClient: {
							client_id: process.env.XRAY_CLIENT_ID,
							client_secret: process.env.XRAY_CLIENT_SECRET,
						},
						testExecutionKey: process.env.TEST_EXEC_KEY,
					},
				],
		  ]
		: [
				[ 'list' ],
				// [ 'html', { outputFolder: 'playwright-report' } ],
				[
					'@inpsyde/playwright-utils/build/integration/jira/xray-reporter.js',
					{
						apiClient: {
							client_id: process.env.XRAY_CLIENT_ID,
							client_secret: process.env.XRAY_CLIENT_SECRET,
						},
						testExecutionKey: process.env.TEST_EXEC_KEY,
					},
				],
		  ],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

	globalSetup: require.resolve( './global-setup' ),

	use: {
		baseURL: process.env.WP_BASE_URL,

		storageState: process.env.STORAGE_STATE_PATH_ADMIN,

		httpCredentials: {
			username: process.env.WP_BASIC_AUTH_USER,
			password: process.env.WP_BASIC_AUTH_PASS,
		},

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',

		// Capture screenshot after each test failure.
		screenshot: 'only-on-failure', //'off', //

		// Record video only when retrying a test for the first time.
		video: 'retain-on-failure', //'on', //

		...devices[ 'Desktop Chrome' ],

		viewport: { width: 1280, height: 850 },

		launchOptions: {
			// Put your chromium-specific args here
			args: [ '--disable-web-security' ],
		},
	},

	projects: [
		{
			name: 'setup-woocommerce',
			testMatch: /woocommerce\.setup\.ts/,
			fullyParallel: false,
		},
		...storeSetupProjects,
		...pcpSetupProjects,
		...gatewaySetupProjects,
		{
			name: 'all',
			dependencies: [ 'setup-woocommerce' ],
			testIgnore: '**/.parallel-specs/**',
		},
		{
			name: 'non-transaction',
			dependencies: [ 'setup-woocommerce' ],
			testIgnore: [
				'06-transaction/**',
				'07-vaulting/**',
				'08-refund/**',
				/subscription-transaction/,
				'10-compatibility/**',
			],
			fullyParallel: false,
		},
		{
			name: 'vaulting-subscription',
			dependencies: [ 'setup-woocommerce' ],
			testMatch: [ /vaulting-transaction/, /subscription-transaction/ ],
			fullyParallel: false,
		},
		...parallelProjects,
	],
} );
