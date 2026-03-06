<?php
/**
 * Title: Join CTA
 * Slug: ancient-baltimore/join-cta
 * Categories: call-to-action
 * Description: Centered call-to-action section encouraging visitors to join the lodge with heading, subtitle, and button.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group alignfull has-neutral-darkest-background-color has-white-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"white","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Join our ranks', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-white-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Begin your Masonic journey with Ancient Baltimore Lodge No. 234. We welcome men of good character who seek to improve themselves and serve their community.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">

<!-- wp:button {"backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|white"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-white-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/become-a-mason" style="border-color:var(--wp--preset--color--white);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Become a Mason', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->
