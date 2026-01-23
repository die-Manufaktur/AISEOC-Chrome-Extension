<?php
/**
 * Title: Hero Section
 * Slug: rcvmd/hero-section
 * Categories: banner, featured
 * Description: Hero section with heading, description, CTA buttons, and image
 *
 * @package RCVMD
 */

?>
<!-- wp:cover {"url":"","dimRatio":0,"overlayColor":"light-gray","minHeight":900,"minHeightUnit":"px","contentPosition":"center center","isDark":false,"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|90","right":"var:preset|spacing|90"}}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-cover is-light" style="padding-top:0;padding-right:var(--wp--preset--spacing--90);padding-bottom:0;padding-left:var(--wp--preset--spacing--90);min-height:900px"><span aria-hidden="true" class="wp-block-cover__background has-light-gray-background-color has-background-dim-0 has-background-dim"></span><div class="wp-block-cover__inner-container">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|100"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|60"}},"layout":{"type":"flex","orientation":"vertical"}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"level":1,"textColor":"black","fontSize":"5-x-large"} -->
				<h1 class="wp-block-heading has-black-color has-text-color has-5-x-large-font-size">Empowering Maryland with Ranked Choice Voting</h1>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"black","fontSize":"medium"} -->
				<p class="has-black-color has-text-color has-medium-font-size">At Ranked Choice Voting Maryland, we strive to create a fairer electoral system that ensures every voice is heard. Join us in advocating for a voting method that promotes majority winners and enhances voter satisfaction.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}}} -->
				<div class="wp-block-buttons">
					<!-- wp:button {"backgroundColor":"primary","textColor":"white","style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"fontSize":"medium"} -->
					<div class="wp-block-button has-custom-font-size has-medium-font-size"><a class="wp-block-button__link has-white-color has-primary-background-color has-text-color has-background wp-element-button" href="#donate" style="border-radius:12px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)">Donate</a></div>
					<!-- /wp:button -->

					<!-- wp:button {"backgroundColor":"secondary","textColor":"white","style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"fontSize":"base"} -->
					<div class="wp-block-button has-custom-font-size has-base-font-size"><a class="wp-block-button__link has-white-color has-secondary-background-color has-text-color has-background wp-element-button" href="#get-involved" style="border-radius:12px;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)">Get Involved</a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%">
			<!-- wp:image {"id":0,"aspectRatio":"1","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"32px"}}} -->
			<figure class="wp-block-image size-large has-custom-border"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/00b9492962430eb31bc7f2afd9ac4a56a6e79cc9.png" alt="Ranked Choice Voting" style="border-radius:32px;aspect-ratio:1;object-fit:cover"/></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div></div>
<!-- /wp:cover -->
