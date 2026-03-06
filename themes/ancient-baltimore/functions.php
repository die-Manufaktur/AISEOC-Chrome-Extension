<?php
/**
 * Ancient Baltimore Lodge #234 theme functions and definitions.
 *
 * @package Ancient_Baltimore
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Set up theme defaults and register support for various WordPress features.
 *
 * @since 1.0.0
 * @return void
 */
function ancient_baltimore_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-line-height' );
	add_theme_support( 'custom-spacing' );
	add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'ancient_baltimore_setup' );

/**
 * Register block pattern category for the theme.
 *
 * @since 1.0.0
 * @return void
 */
function ancient_baltimore_register_pattern_category() {
	register_block_pattern_category(
		'ancient-baltimore',
		array(
			'label' => esc_html__( 'Ancient Baltimore', 'ancient-baltimore' ),
		)
	);
}
add_action( 'init', 'ancient_baltimore_register_pattern_category' );
