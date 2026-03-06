<?php
/**
 * Title: Our Lodge
 * Slug: ancient-baltimore/contact-lodge
 * Categories: ancient-baltimore
 * Description: Two-column section with lodge location details (address, meeting schedule, visitor info) and a lodge building image.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|70"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column {"width":"40%","verticalAlignment":"top"} -->
<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:40%">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Location', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Our lodge', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Visit our historic lodge building in the heart of Baltimore. We welcome visitors and prospective members at our stated meetings.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"0","padding":{"top":"var:preset|spacing|30"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30)">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|10"},"border":{"bottom":{"width":"1px","color":"var:preset|color|neutral-15"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-bottom-width:1px;border-bottom-color:var(--wp--preset--color--neutral-15);padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)">

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Baltimore, Maryland', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '225 N. Charles Street, Baltimore, MD 21201. Street parking and nearby garages within walking distance.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|10"},"border":{"bottom":{"width":"1px","color":"var:preset|color|neutral-15"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-bottom-width:1px;border-bottom-color:var(--wp--preset--color--neutral-15);padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)">

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Meeting schedule', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Stated communications held on the second and fourth Tuesdays of each month at 7:30 PM, September through June.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|10"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)">

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Visitor information', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Visitors are welcome at our stated meetings. Please contact the Secretary in advance so we can prepare a proper welcome for you.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"4/3"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/5e240f92b1203307225a996200b7e28a3d285415.png' ) ); ?>" alt="<?php echo esc_attr__( 'Ancient Baltimore Lodge 234 building exterior', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:4/3;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
