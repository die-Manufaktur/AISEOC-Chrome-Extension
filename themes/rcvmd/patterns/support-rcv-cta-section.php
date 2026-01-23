<?php
/**
 * Title: Support RCV CTA Section
 * Slug: rcvmd/support-rcv-cta-section
 * Categories: call-to-action
 * Description: Call-to-action section encouraging support for RCV with image
 *
 * @package RCVMD
 */

?>
<!-- wp:group {"backgroundColor":"light-gray","style":{"spacing":{"padding":{"top":"var:preset|spacing|110","bottom":"var:preset|spacing|110","left":"var:preset|spacing|90","right":"var:preset|spacing|90"}}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group has-light-gray-background-color has-background" style="padding-top:var(--wp--preset--spacing--110);padding-right:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--110);padding-left:var(--wp--preset--spacing--90)">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|100"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|60"}},"layout":{"type":"flex","orientation":"vertical"}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"textColor":"black","fontSize":"4-x-large"} -->
				<h2 class="wp-block-heading has-black-color has-text-color has-4-x-large-font-size">Support Ranked Choice Voting Today</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"black","fontSize":"medium"} -->
				<p class="has-black-color has-text-color has-medium-font-size">Your contribution helps us promote fair elections and empower voters across Maryland. Join us!</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}}} -->
				<div class="wp-block-buttons">
					<!-- wp:button {"backgroundColor":"primary","textColor":"white","style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"fontSize":"medium"} -->
					<div class="wp-block-button has-custom-font-size has-medium-font-size"><a class="wp-block-button__link has-white-color has-primary-background-color has-text-color has-background wp-element-button" href="#donate" style="border-radius:12px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)">Donate</a></div>
					<!-- /wp:button -->

					<!-- wp:button {"backgroundColor":"accent","textColor":"black","style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"fontSize":"base"} -->
					<div class="wp-block-button has-custom-font-size has-base-font-size"><a class="wp-block-button__link has-black-color has-accent-background-color has-text-color has-background wp-element-button" href="#learn" style="border-radius:12px;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)">Learn More</a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:image {"id":0,"aspectRatio":"3/2","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"40px"}}} -->
			<figure class="wp-block-image size-large has-custom-border"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/037edd7f136967f3c7bafa60f0663bba62d7389d.png" alt="Support Ranked Choice Voting" style="border-radius:40px;aspect-ratio:3/2;object-fit:cover"/></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
