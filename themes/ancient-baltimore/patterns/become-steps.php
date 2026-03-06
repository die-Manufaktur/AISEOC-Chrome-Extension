<?php
/**
 * Title: Path to Membership Steps
 * Slug: ancient-baltimore/become-steps
 * Categories: ancient-baltimore
 * Description: Three-step membership process with one large featured card and two smaller cards in a columned layout.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group">

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Process', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Your path to membership', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'The journey from interested candidate to initiated brother follows a time-honored process designed to ensure a meaningful experience for all involved.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50","right":"var:preset|spacing|50"},"blockGap":"var:preset|spacing|30"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"},"dimensions":{"minHeight":"100%"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;min-height:100%;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50)">

<!-- wp:image {"width":"48px","height":"48px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/42a48a9387b6d5fa0d4915f53bac459243e4e60d.svg' ) ); ?>" alt="" width="48px" height="48px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Inquiry and conversation', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Your journey begins with a simple conversation. Reach out to us through our contact form or attend one of our public events. You will have the opportunity to meet current members, ask questions, and learn what Freemasonry means in practice. There is no pressure and no obligation at this stage.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|20","margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">

<!-- wp:button {"backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-neutral-darkest-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="#contact-form" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Reach out', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"transparent","textColor":"neutral-darkest","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/about" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Learn more', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|40"},"dimensions":{"minHeight":"100%"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="min-height:100%">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50","right":"var:preset|spacing|50"},"blockGap":"var:preset|spacing|30"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50)">

<!-- wp:image {"width":"48px","height":"48px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/46f812cfe0c9dae357b67f4bda258ecee98ad567.svg' ) ); ?>" alt="" width="48px" height="48px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Petition and investigation', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'When you are ready, you will complete a petition for membership. A committee of lodge members will meet with you to discuss your interest and answer any remaining questions. This is a friendly conversation, not an interrogation.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50","right":"var:preset|spacing|50"},"blockGap":"var:preset|spacing|30"},"border":{"width":"1px","color":"var:preset|color|neutral-15","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--neutral-15);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50)">

<!-- wp:image {"width":"48px","height":"48px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/546478f6975f30ea9c6b327b74731254a7223511.svg' ) ); ?>" alt="" width="48px" height="48px"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3,"textColor":"neutral-darkest","fontSize":"large","fontFamily":"heading"} -->
<h3 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-large-font-size"><?php echo esc_html__( 'Ballot and initiation', 'ancient-baltimore' ); ?></h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'The lodge votes on your petition by secret ballot. Upon acceptance, you will be scheduled for the Entered Apprentice degree, the first of three meaningful ceremonies that mark your journey into the fraternity.', 'ancient-baltimore' ); ?></p>
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
