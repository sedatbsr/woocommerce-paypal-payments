/**
 * Action Types: Define unique identifiers for actions across all store modules.
 *
 * Keys are module-internal and can have any value.
 * Values must be unique across all store modules to avoid collisions.
 *
 * @file
 */

export default {
	// Transient data.
	SET_TRANSIENT: 'COMMON:SET_TRANSIENT',

	// Persistent data.
	SET_PERSISTENT: 'COMMON:SET_PERSISTENT',

	// Controls - always start with "DO_".
	DO_PERSIST_DATA: 'COMMON:DO_PERSIST_DATA',
};
