<?php
/**
 * Title: Hero
 * Slug: ancient-baltimore/hero
 * Categories: banner
 * Description: Hero section with lodge name, description, buttons, and group photo.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"0","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group alignfull has-neutral-darkest-background-color has-white-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:0;padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white","fontSize":"xx-large","fontFamily":"heading"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color has-heading-font-family has-xx-large-font-size"><?php echo esc_html__( 'Ancient Baltimore Lodge 234 AF&AM', 'ancient-baltimore' ); ?></h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-white-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'We are a fraternal organization dedicated to the principles of Brotherly Love, Relief, and Truth. Our lodge has been serving the Baltimore community since its founding, fostering personal growth and lifelong friendships among its members.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}}} -->
<div class="wp-block-buttons">

<!-- wp:button {"backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|white"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-white-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/about" style="border-color:var(--wp--preset--color--white);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Learn More', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"transparent","textColor":"white","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|white"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="/contact" style="border-color:var(--wp--preset--color--white);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Visit', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

<!-- wp:image {"align":"full","sizeSlug":"full","linkDestination":"none","style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}}} -->
<figure class="wp-block-image alignfull size-full" style="margin-top:var(--wp--preset--spacing--60)"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/29ff4deba4ee7e22e18cc1d9a89e9be96cfbd51a.png' ) ); ?>" alt="<?php echo esc_attr__( 'Members of Ancient Baltimore Lodge 234 gathered together', 'ancient-baltimore' ); ?>"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:group -->
