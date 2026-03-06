<?php
/**
 * Title: Contact Info Cards
 * Slug: ancient-baltimore/contact-info
 * Categories: ancient-baltimore
 * Description: Three contact info cards (email, phone, address) in a row with a map placeholder image below.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Connect', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Get in touch', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'There are several ways to reach us. Choose whichever is most convenient for you.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|20"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40)">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/6399690b9e3d878ece4b95fabfe46e4b4f5a3f0e.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Email', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'secretary@baltimoremasonry.org', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|20"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40)">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76609b2934376999027aec9976f3ecbe6e1aec8c.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Phone', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '(410) 555-0234', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|40","right":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|20"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40)">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/a22bd1ac1b973b479021df0f64f6f044bb69fa7e.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"medium","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-medium-font-size"><?php echo esc_html__( 'Address', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( '225 N. Charles Street, Baltimore, MD 21201', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|40"}}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--40)">

<!-- wp:image {"align":"wide","sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"21/9"} -->
<figure class="wp-block-image alignwide size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/96e86b30d0e7915f1805177a6d710002d6b958a7.png' ) ); ?>" alt="<?php echo esc_attr__( 'Map showing the location of Ancient Baltimore Lodge 234', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:21/9;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
