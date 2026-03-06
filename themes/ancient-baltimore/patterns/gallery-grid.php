<?php
/**
 * Title: Gallery Grid
 * Slug: ancient-baltimore/gallery-grid
 * Categories: gallery
 * Description: Asymmetric image gallery showcasing lodge gatherings with one large image and four smaller images.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|50"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group">

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Our gatherings', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Moments from our lodge events, ceremonies, and community activities.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|20","top":"var:preset|spacing|20"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"3/4"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/29ff4deba4ee7e22e18cc1d9a89e9be96cfbd51a.png' ) ); ?>" alt="<?php echo esc_attr__( 'Lodge gathering event', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:3/4;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|20","top":"var:preset|spacing|20"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"1"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/94412714fc1cd9ee44c73da05bdf80f4b37b9743.png' ) ); ?>" alt="<?php echo esc_attr__( 'Lodge brothers at a ceremony', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:1;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"1"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/7e36776e14fb6ba60fb39ee74d2df4949ffab10f.png' ) ); ?>" alt="<?php echo esc_attr__( 'Community service event', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:1;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|20","top":"var:preset|spacing|20"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"1"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/96e86b30d0e7915f1805177a6d710002d6b958a7.png' ) ); ?>" alt="<?php echo esc_attr__( 'Annual lodge dinner', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:1;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"1"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/226f66acc1b7dec24e9fa16a00c9906d6f090bed.png' ) ); ?>" alt="<?php echo esc_attr__( 'Lodge fellowship event', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:1;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
