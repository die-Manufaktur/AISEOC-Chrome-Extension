<?php
/**
 * Title: Member Pricing
 * Slug: ancient-baltimore/member-pricing
 * Categories: ancient-baltimore
 * Description: Membership dues section with centered intro, monthly/yearly toggle, and a bordered pricing card with checklist and CTA button.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Dues', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Annual membership', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Simple, transparent pricing to maintain your membership and support the lodge.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-group">

<!-- wp:group {"backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-neutral-darkest-background-color has-white-color has-text-color has-background" style="border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<p class="has-body-font-family has-small-font-size" style="font-weight:700"><?php echo esc_html__( 'Monthly', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"backgroundColor":"white","textColor":"dark-muted","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-15"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-dark-muted-color has-text-color has-background has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<p class="has-body-font-family has-small-font-size" style="font-weight:700"><?php echo esc_html__( 'Yearly', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60","left":"var:preset|spacing|50","right":"var:preset|spacing|50"},"blockGap":"var:preset|spacing|40"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"},"layout":{"selfStretch":"fixed","flexSize":"560px"}},"layout":{"type":"constrained","contentSize":"560px"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50)">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}},"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size" style="font-weight:600"><?php echo esc_html__( 'Monthly plan', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"bottom"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( '$19', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( '/mo', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:separator {"backgroundColor":"neutral-15","style":{"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}}} -->
<hr class="wp-block-separator has-text-color has-neutral-15-color has-alpha-channel-opacity has-neutral-15-background-color has-background" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20)"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:600"><?php echo esc_html__( 'Includes', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html( '&#10003;' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Full membership privileges', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html( '&#10003;' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Event access and invitations', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html( '&#10003;' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Lodge communications', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html( '&#10003;' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Ritual participation rights', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html( '&#10003;' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Directory listing', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|30"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--30)">

<!-- wp:button {"backgroundColor":"neutral-darkest","textColor":"white","width":100,"style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-neutral-darkest-background-color has-white-color has-text-color has-background wp-element-button" href="/member-portal/pay" style="border-radius:0px;padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Pay now', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
