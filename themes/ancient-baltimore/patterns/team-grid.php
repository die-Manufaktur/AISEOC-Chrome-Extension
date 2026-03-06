<?php
/**
 * Title: Team Grid
 * Slug: ancient-baltimore/team-grid
 * Categories: about, team
 * Description: Officer team grid with 8 lodge officers displayed in two rows of four with circular avatar placeholders.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"white","textColor":"neutral-darkest","style":{"spacing":{"padding":{"top":"var:preset|spacing|90","bottom":"var:preset|spacing|90","left":"var:preset|spacing|70","right":"var:preset|spacing|70"},"blockGap":"var:preset|spacing|60"}},"layout":{"type":"constrained","wideSize":"1280px"}} -->
<div class="wp-block-group alignfull has-white-background-color has-neutral-darkest-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--90);padding-bottom:var(--wp--preset--spacing--90);padding-left:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--70)">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained","contentSize":"768px"}} -->
<div class="wp-block-group">

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-darkest","fontSize":"x-large","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-neutral-darkest-color has-text-color has-heading-font-family has-x-large-font-size"><?php echo esc_html__( 'The men who guide us', 'ancient-baltimore' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-base-font-size"><?php echo esc_html__( 'Our elected and appointed officers lead the lodge with dedication, ensuring the traditions of the craft are upheld.', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40","top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Worshipful Master', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Worshipful Master', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Senior Warden', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Senior Warden', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Junior Warden', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Junior Warden', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Treasurer', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Treasurer', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40","top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Secretary', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Secretary', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Senior Deacon', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Senior Deacon', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Junior Deacon', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Junior Deacon', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:image {"width":"120px","height":"120px","sizeSlug":"full","linkDestination":"none","align":"center","style":{"border":{"radius":"100%"}}} -->
<figure class="wp-block-image aligncenter size-full is-resized has-custom-border"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/76e55605f06fbb98641be0361cd912fbf0507e17.png' ) ); ?>" alt="<?php echo esc_attr__( 'Portrait of the Chaplain', 'ancient-baltimore' ); ?>" width="120px" height="120px" style="border-radius:100%;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"700"}},"textColor":"neutral-darkest","fontSize":"base","fontFamily":"body"} -->
<p class="has-text-align-center has-neutral-darkest-color has-text-color has-body-font-family has-base-font-size" style="font-weight:700"><?php echo esc_html__( 'Brother Name', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"dark-muted","fontSize":"small","fontFamily":"body"} -->
<p class="has-text-align-center has-dark-muted-color has-text-color has-body-font-family has-small-font-size"><?php echo esc_html__( 'Chaplain', 'ancient-baltimore' ); ?></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
