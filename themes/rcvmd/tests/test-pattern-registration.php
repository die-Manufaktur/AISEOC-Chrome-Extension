<?php
/**
 * Test Pattern Registration
 *
 * Verifies that theme patterns are properly registered and contain valid image URLs.
 *
 * @package RCVMD
 */

class Test_Pattern_Registration extends WP_UnitTestCase {

	/**
	 * Test that hero section pattern is registered.
	 */
	public function test_hero_section_pattern_registered() {
		$patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		$pattern_slugs = array_column( $patterns, 'slug' );

		$this->assertContains(
			'rcvmd/hero-section',
			$pattern_slugs,
			'Hero section pattern should be registered'
		);
	}

	/**
	 * Test that hero pattern contains valid image URL.
	 */
	public function test_hero_pattern_contains_valid_image_url() {
		$pattern = WP_Block_Patterns_Registry::get_instance()->get_registered( 'rcvmd/hero-section' );

		$this->assertNotNull( $pattern, 'Hero section pattern should exist' );

		// Pattern content should contain theme directory URI
		$this->assertStringContainsString(
			get_template_directory_uri() . '/assets/images/',
			$pattern['content'],
			'Pattern should contain resolved theme image URL'
		);

		// Should NOT contain unresolved PHP code
		$this->assertStringNotContainsString(
			'<?php',
			$pattern['content'],
			'Pattern content should not contain unresolved PHP tags'
		);
	}

	/**
	 * Test that understanding RCV pattern is registered.
	 */
	public function test_understanding_rcv_pattern_registered() {
		$patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		$pattern_slugs = array_column( $patterns, 'slug' );

		$this->assertContains(
			'rcvmd/understanding-rcv-section',
			$pattern_slugs,
			'Understanding RCV section pattern should be registered'
		);
	}

	/**
	 * Test that patterns directory exists with PHP files.
	 */
	public function test_patterns_directory_exists() {
		$patterns_dir = get_template_directory() . '/patterns';

		$this->assertTrue(
			file_exists( $patterns_dir ),
			'Patterns directory should exist'
		);

		$this->assertTrue(
			is_dir( $patterns_dir ),
			'Patterns path should be a directory'
		);
	}

	/**
	 * Test that pattern files are PHP files, not HTML.
	 */
	public function test_pattern_files_are_php() {
		$patterns_dir = get_template_directory() . '/patterns';

		if ( ! is_dir( $patterns_dir ) ) {
			$this->markTestSkipped( 'Patterns directory does not exist yet' );
		}

		$pattern_files = glob( $patterns_dir . '/*' );

		foreach ( $pattern_files as $file ) {
			$extension = pathinfo( $file, PATHINFO_EXTENSION );
			$this->assertEquals(
				'php',
				$extension,
				basename( $file ) . ' should be a PHP file, not HTML'
			);
		}
	}

	/**
	 * Test that templates reference patterns, not inline images.
	 */
	public function test_front_page_references_patterns() {
		$template_file = get_template_directory() . '/templates/front-page.html';

		$this->assertTrue(
			file_exists( $template_file ),
			'front-page.html template should exist'
		);

		$content = file_get_contents( $template_file );

		// Should contain pattern references
		$this->assertStringContainsString(
			'wp:pattern',
			$content,
			'Template should reference patterns'
		);

		// Should NOT contain inline image tags with empty src
		$this->assertStringNotContainsString(
			'<img alt="" style=',
			$content,
			'Template should not contain inline images with empty src'
		);
	}

	/**
	 * Test that page-learn-about-rcv uses patterns instead of PHP in HTML.
	 */
	public function test_learn_about_page_uses_patterns() {
		$template_file = get_template_directory() . '/templates/page-learn-about-rcv.html';

		if ( ! file_exists( $template_file ) ) {
			$this->markTestSkipped( 'page-learn-about-rcv.html does not exist' );
		}

		$content = file_get_contents( $template_file );

		// Should NOT contain PHP code
		$this->assertStringNotContainsString(
			'<?php echo esc_url(get_template_directory_uri()); ?>',
			$content,
			'HTML template should not contain PHP code'
		);
	}

	/**
	 * Test that image assets exist in theme.
	 */
	public function test_image_assets_exist() {
		$images_dir = get_template_directory() . '/assets/images';

		$this->assertTrue(
			file_exists( $images_dir ),
			'Images directory should exist'
		);

		$this->assertTrue(
			is_dir( $images_dir ),
			'Images path should be a directory'
		);

		// Check at least some images exist
		$image_files = glob( $images_dir . '/*.{png,jpg,jpeg,svg,webp}', GLOB_BRACE );

		$this->assertGreaterThan(
			0,
			count( $image_files ),
			'Images directory should contain image files'
		);
	}
}
