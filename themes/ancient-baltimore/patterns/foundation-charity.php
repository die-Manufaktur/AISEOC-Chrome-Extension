<?php
/**
 * Title: Foundation Charity
 * Slug: ancient-baltimore/foundation-charity
 * Categories: ancient-baltimore
 * Description: Split layout with charity description, list items with icons, and buttons on the left, and a full-height image on the right.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|70"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column {"width":"60%","verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">

<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","letterSpacing":"2px"}},"textColor":"neutral-darkest","fontSize":"small","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-small-font-size" style="font-weight:700;letter-spacing:2px;text-transform:uppercase"><?php echo esc_html__( 'Service', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'Charity has always been our calling', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Since our founding, Ancient Baltimore Lodge No. 234 has been committed to charitable giving and community service. Our foundation channels the generosity of our members into programs that make a lasting difference in Baltimore and beyond.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"top":"var:preset|spacing|30"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--30)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/02ba47ee0002436637c4d5c47206f7c5e8523148.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Fund scholarships for deserving students', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/097f06f8b2933f048f6f4c79553b40522353c9fc.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Community outreach and assistance', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"24px","height":"24px","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/2c2ecbae47a8e8435c0789f2ee25144c6a27dcff.svg' ) ); ?>" alt="" width="24px" height="24px"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Support for local charitable organizations', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:buttons {"style":{"spacing":{"blockGap":"var:preset|spacing|20","margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">

<!-- wp:button {"backgroundColor":"neutral-darkest","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-neutral-darkest-background-color has-white-color has-text-color has-background has-border-color wp-element-button" href="/foundation#donate" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Donate', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"transparent","textColor":"neutral-darkest","className":"is-style-outline","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}},"border":{"radius":"0px","width":"1px","color":"var:preset|color|neutral-darkest"},"typography":{"fontWeight":"700"}},"fontSize":"small","fontFamily":"body"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-transparent-background-color has-neutral-darkest-color has-text-color has-background has-border-color wp-element-button" href="/foundation#programs" style="border-color:var(--wp--preset--color--neutral-darkest);border-width:1px;border-radius:0px;padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-left:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);font-weight:700"><?php echo esc_html__( 'Programs', 'ancient-baltimore' ); ?></a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">

<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"0px"}},"aspectRatio":"3/4"} -->
<figure class="wp-block-image size-full has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/94412714fc1cd9ee44c73da05bdf80f4b37b9743.png' ) ); ?>" alt="<?php echo esc_attr__( 'Lodge members participating in charitable community service', 'ancient-baltimore' ); ?>" style="border-radius:0px;aspect-ratio:3/4;object-fit:cover"/></figure>
<!-- /wp:image -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
