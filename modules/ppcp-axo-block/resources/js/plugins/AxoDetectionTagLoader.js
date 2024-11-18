import { registerPlugin } from '@wordpress/plugins';
import { useEffect, useRef } from '@wordpress/element';

const AxoDetectionTagLoader = () => {
	const metaAdded = useRef( false );
	const axoMetaConfig = window.wc_ppcp_axo_meta;
	const isAxoEnabled = axoMetaConfig?.isAxoEnabled;

	useEffect( () => {
		if ( ! metaAdded.current ) {
			const meta = document.createElement( 'meta' );
			meta.name = 'ppcp.axo';
			meta.content = isAxoEnabled
				? 'ppcp.axo.enabled'
				: 'ppcp.axo.disabled';
			document.head.appendChild( meta );
			metaAdded.current = true;
		}
	}, [ isAxoEnabled ] );

	return null;
};

registerPlugin( 'wc-ppcp-axo-detection-tag-loader', {
	render: AxoDetectionTagLoader,
	scope: 'woocommerce-checkout',
} );
