<?php
/**
 * Title: Coming Events
 * Slug: ancient-baltimore/events-section
 * Categories: posts
 * Description: Dark background section displaying upcoming lodge events in a three-column card layout.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|50"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-neutral-darkest-background-color has-white-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:group {"align":"wide","layout":{"type":"flex","justifyContent":"space-between","flexWrap":"nowrap"}} -->
<div class="wp-block-group alignwide">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"white","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Coming', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2,"textColor":"white","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-white-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Coming events', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

</div>
<!-- /wp:group -->

<!-- wp:buttons -->
<div class="wp-block-buttons">

<!-- wp:button {"backgroundColor":"transparent","textColor":"white","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|white"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="/events" style="border-color:var(--wp--preset--color--white);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'View all', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|30"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"0"},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"16/9"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/96e86b30d0e7915f1805177a6d710002d6b958a7.png' ) ); ?>" alt="<?php echo esc_attr__( 'Stated Communication meeting', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:16/9;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"style":{"spacing":{"padding":{"top":"2px","bottom":"2px","left":"var:preset|spacing|10","right":"var:preset|spacing|10"}},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"},"typography":{"fontWeight":"600","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"white","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-color has-text-color has-border-color has-body-font-family has-small-font-size" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px;padding-top:2px;padding-bottom:2px;padding-left:var(--wp--preset--spacing--10);padding-right:var(--wp--preset--spacing--10);font-weight:600;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Meeting', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Mar 15, 2026', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white-20","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-20-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '|', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Lodge Hall, Baltimore', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:heading {"level":3,"textColor":"white","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-white-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Stated Communication', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Monthly stated communication with lodge business, degree work, and fellowship dinner.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"700"}}} -->
<p class="has-body-font-family has-small-font-size" style="font-weight:700"><a href="/events" style="color:var(--wp--preset--color--white)"><?php echo esc_html__( 'Register now →', 'ancient-baltimore' ); ?></a></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"0"},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"16/9"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/94412714fc1cd9ee44c73da05bdf80f4b37b9743.png' ) ); ?>" alt="<?php echo esc_attr__( 'Annual scholarship dinner event', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:16/9;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"style":{"spacing":{"padding":{"top":"2px","bottom":"2px","left":"var:preset|spacing|10","right":"var:preset|spacing|10"}},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"},"typography":{"fontWeight":"600","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"white","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-color has-text-color has-border-color has-body-font-family has-small-font-size" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px;padding-top:2px;padding-bottom:2px;padding-left:var(--wp--preset--spacing--10);padding-right:var(--wp--preset--spacing--10);font-weight:600;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Dinner', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Apr 12, 2026', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white-20","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-20-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '|', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Grand Lodge, Baltimore', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:heading {"level":3,"textColor":"white","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-white-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Annual Scholarship Dinner', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Join us for our annual scholarship awards dinner honoring outstanding students in the Baltimore community.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"700"}}} -->
<p class="has-body-font-family has-small-font-size" style="font-weight:700"><a href="/events" style="color:var(--wp--preset--color--white)"><?php echo esc_html__( 'Register now →', 'ancient-baltimore' ); ?></a></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"0"},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"16/9"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/5a994c89a6675dbd456d51cc408cc4f10d947df5.png' ) ); ?>" alt="<?php echo esc_attr__( 'Community outreach day event', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:16/9;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"style":{"spacing":{"padding":{"top":"2px","bottom":"2px","left":"var:preset|spacing|10","right":"var:preset|spacing|10"}},"border":{"width":"1px","color":"var:preset|color|white-20","radius":"0px"},"typography":{"fontWeight":"600","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"white","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-color has-text-color has-border-color has-body-font-family has-small-font-size" style="border-color:var(--wp--preset--color--white-20);border-width:1px;border-radius:0px;padding-top:2px;padding-bottom:2px;padding-left:var(--wp--preset--spacing--10);padding-right:var(--wp--preset--spacing--10);font-weight:600;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Service', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'May 3, 2026', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white-20","fontSize":"small","fontFamily":"body"} -->
<p class="has-white-20-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '|', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Baltimore, MD', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:heading {"level":3,"textColor":"white","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-white-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Community Outreach Day', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"white","fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"400"}}} -->
<p class="has-white-color has-text-color has-body-font-family has-small-font-size" style="font-weight:400"><?php echo esc_html__( 'Brothers come together for a day of service, volunteering in the community and making a positive impact.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"small","fontFamily":"body","style":{"typography":{"fontWeight":"700"}}} -->
<p class="has-body-font-family has-small-font-size" style="font-weight:700"><a href="/events" style="color:var(--wp--preset--color--white)"><?php echo esc_html__( 'Register now →', 'ancient-baltimore' ); ?></a></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
