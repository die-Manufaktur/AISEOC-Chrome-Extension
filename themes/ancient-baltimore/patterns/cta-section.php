<?php
/**
 * Title: Building Fund CTA
 * Slug: ancient-baltimore/cta-section
 * Categories: call-to-action
 * Description: Call to action section for the building fund with heading, description, buttons, and a full-width lodge photo.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"0","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:0;padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Support our building fund', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Help us preserve and improve our historic lodge building. Your generous contributions support maintenance, restoration, and community programs for future generations of Masons.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"blockGap":"var:preset|spacing|20"}}} -->
<div class="wp-block-buttons">

<!-- wp:button {"backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-neutral-darkest-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="/foundation" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Donate', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"transparent","textColor":"neutral-darkest","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/foundation" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Learn', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

<!-- wp:image {"align":"full","sizeSlug":"full","linkDestination":"none","style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}}} -->
<figure class="wp-block-image alignfull size-full" style="margin-top:var(--wp--preset--spacing--60)"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/5e240f92b1203307225a996200b7e28a3d285415.png' ) ); ?>" alt="<?php echo esc_attr__( 'Ancient Baltimore Lodge building exterior', 'ancient-baltimore' ); ?>"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:group -->
