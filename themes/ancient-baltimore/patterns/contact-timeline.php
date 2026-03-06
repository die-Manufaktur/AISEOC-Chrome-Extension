<?php
/**
 * Title: Meeting Schedule Timeline
 * Slug: ancient-baltimore/contact-timeline
 * Categories: ancient-baltimore
 * Description: Two-column section with schedule description and buttons on the left, and a vertical timeline of meeting dates on the right.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|70"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column {"width":"40%","verticalAlignment":"top"} -->
<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:40%">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Schedule', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'When we gather at the lodge', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Our lodge maintains a regular schedule of meetings and events throughout the year. All stated communications begin at 7:30 PM unless otherwise noted.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|20","margin":{"top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">

<!-- wp:button {"backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-neutral-darkest-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="/events" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'View events', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"transparent","textColor":"neutral-darkest","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/contact" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Contact us', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">

<!-- wp:group {"style":{"spacing":{"blockGap":"0","padding":{"left":"var:preset|spacing|40"}},"border":{"left":{"width":"2px","color":"var:preset|color|neutral-15"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-left-width:2px;border-left-color:var(--wp--preset--color--neutral-15);padding-left:var(--wp--preset--spacing--40)">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|10"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--40)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Second Tuesday', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Stated communication', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Regular business meeting with degree work as scheduled. Dinner served at 6:30 PM, lodge opens at 7:30 PM.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:separator {"backgroundColor":"neutral-15","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<hr class="wp-block-separator has-text-color has-neutral-15-color has-neutral-15-background-color has-background" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|10"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Fourth Tuesday', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Stated communication', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Regular business meeting with education program. Dinner served at 6:30 PM, lodge opens at 7:30 PM.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:separator {"backgroundColor":"neutral-15","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<hr class="wp-block-separator has-text-color has-neutral-15-color has-neutral-15-background-color has-background" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|10"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Special events', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Throughout the year', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Family nights, degree festivals, table lodges, and community service events are scheduled throughout the Masonic year.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:separator {"backgroundColor":"neutral-15","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
<hr class="wp-block-separator has-text-color has-neutral-15-color has-neutral-15-background-color has-background" style="margin-top:0;margin-bottom:0"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|10"},"blockGap":"var:preset|spacing|10"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--10)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:1px;text-transform:uppercase"><?php echo esc_html__( 'Public events', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Announced quarterly', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Open house events, charity drives, and community outreach programs are announced each quarter on our events page.', 'ancient-baltimore' ); ?></p>
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
