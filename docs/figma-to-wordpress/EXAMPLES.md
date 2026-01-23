# FSE Template Examples

**Purpose:** Reference examples for converting Figma designs to WordPress FSE template HTML

**Audience:** figma-fse-converter agent during template generation

---

## Example 1: Hero Section (Cover Block)

### Figma Design
```
Hero Section Frame
├── Background Image (1920x800px)
├── Overlay (Black, 50% opacity)
└── Content Group
    ├── Heading (H1, White, 48px)
    ├── Paragraph (White, 18px)
    └── Button (Primary color, White text)
```

### FSE Template Output

```html
<!-- wp:cover {"url":"https://example.com/hero-bg.jpg","dimRatio":50,"overlayColor":"black","align":"full","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--70)","bottom":"var(--wp--preset--spacing--70)"}}}} -->
<div class="wp-block-cover alignfull">
  <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span>
  <img class="wp-block-cover__image-background" alt="" src="https://example.com/hero-bg.jpg" />
  <div class="wp-block-cover__inner-container">

    <!-- wp:heading {"textAlign":"center","level":1,"textColor":"white","fontSize":"3xl"} -->
    <h1 class="wp-block-heading has-text-align-center has-white-color has-text-color has-3-xl-font-size">Welcome to Our Site</h1>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center","textColor":"white","fontSize":"lg"} -->
    <p class="has-text-align-center has-white-color has-text-color has-lg-font-size">Discover amazing products and services</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
      <!-- wp:button {"backgroundColor":"primary","textColor":"white"} -->
      <div class="wp-block-button">
        <a class="wp-block-button__link has-white-color has-primary-background-color has-text-color has-background wp-element-button">Get Started</a>
      </div>
      <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

  </div>
</div>
<!-- /wp:cover -->
```

**Key Points:**
- ✅ Uses `overlayColor` slug ("black") not hex
- ✅ Uses spacing token `var(--wp--preset--spacing--70)`
- ✅ Uses fontSize slug ("3xl", "lg")
- ✅ Uses color slugs ("primary", "white")
- ✅ Proper block nesting and closing

---

## Example 2: Card Grid (Columns Block)

### Figma Design
```
Features Section Frame
├── Heading (H2, Center aligned)
└── Cards Grid (3 columns)
    ├── Card 1 (Icon, Heading, Text)
    ├── Card 2 (Icon, Heading, Text)
    └── Card 3 (Icon, Heading, Text)
```

### FSE Template Output

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--60)","bottom":"var(--wp--preset--spacing--60)"}}},"backgroundColor":"neutral-100"} -->
<div class="wp-block-group has-neutral-100-background-color has-background">

  <!-- wp:heading {"textAlign":"center","level":2,"textColor":"neutral-900","fontSize":"2xl"} -->
  <h2 class="wp-block-heading has-text-align-center has-neutral-900-color has-text-color has-2-xl-font-size">Our Features</h2>
  <!-- /wp:heading -->

  <!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"var(--wp--preset--spacing--50)","left":"var(--wp--preset--spacing--50)"}}}} -->
  <div class="wp-block-columns">

    <!-- wp:column {"backgroundColor":"white","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--40)","right":"var(--wp--preset--spacing--40)","bottom":"var(--wp--preset--spacing--40)","left":"var(--wp--preset--spacing--40)"}}}} -->
    <div class="wp-block-column has-white-background-color has-background">

      <!-- wp:image {"align":"center","width":64,"height":64} -->
      <figure class="wp-block-image aligncenter is-resized">
        <img src="https://example.com/icon1.svg" alt="Feature 1" width="64" height="64"/>
      </figure>
      <!-- /wp:image -->

      <!-- wp:heading {"textAlign":"center","level":3,"textColor":"neutral-900","fontSize":"lg"} -->
      <h3 class="wp-block-heading has-text-align-center has-neutral-900-color has-text-color has-lg-font-size">Fast Performance</h3>
      <!-- /wp:heading -->

      <!-- wp:paragraph {"align":"center","textColor":"neutral-700","fontSize":"base"} -->
      <p class="has-text-align-center has-neutral-700-color has-text-color has-base-font-size">Lightning-fast load times for better user experience</p>
      <!-- /wp:paragraph -->

    </div>
    <!-- /wp:column -->

    <!-- wp:column {"backgroundColor":"white","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--40)","right":"var(--wp--preset--spacing--40)","bottom":"var(--wp--preset--spacing--40)","left":"var(--wp--preset--spacing--40)"}}}} -->
    <div class="wp-block-column has-white-background-color has-background">

      <!-- wp:image {"align":"center","width":64,"height":64} -->
      <figure class="wp-block-image aligncenter is-resized">
        <img src="https://example.com/icon2.svg" alt="Feature 2" width="64" height="64"/>
      </figure>
      <!-- /wp:image -->

      <!-- wp:heading {"textAlign":"center","level":3,"textColor":"neutral-900","fontSize":"lg"} -->
      <h3 class="wp-block-heading has-text-align-center has-neutral-900-color has-text-color has-lg-font-size">Secure & Reliable</h3>
      <!-- /wp:heading -->

      <!-- wp:paragraph {"align":"center","textColor":"neutral-700","fontSize":"base"} -->
      <p class="has-text-align-center has-neutral-700-color has-text-color has-base-font-size">Enterprise-grade security for peace of mind</p>
      <!-- /wp:paragraph -->

    </div>
    <!-- /wp:column -->

    <!-- wp:column {"backgroundColor":"white","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--40)","right":"var(--wp--preset--spacing--40)","bottom":"var(--wp--preset--spacing--40)","left":"var(--wp--preset--spacing--40)"}}}} -->
    <div class="wp-block-column has-white-background-color has-background">

      <!-- wp:image {"align":"center","width":64,"height":64} -->
      <figure class="wp-block-image aligncenter is-resized">
        <img src="https://example.com/icon3.svg" alt="Feature 3" width="64" height="64"/>
      </figure>
      <!-- /wp:image -->

      <!-- wp:heading {"textAlign":"center","level":3,"textColor":"neutral-900","fontSize":"lg"} -->
      <h3 class="wp-block-heading has-text-align-center has-neutral-900-color has-text-color has-lg-font-size">Easy to Use</h3>
      <!-- /wp:heading -->

      <!-- wp:paragraph {"align":"center","textColor":"neutral-700","fontSize":"base"} -->
      <p class="has-text-align-center has-neutral-700-color has-text-color has-base-font-size">Intuitive interface anyone can master</p>
      <!-- /wp:paragraph -->

    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->
```

**Key Points:**
- ✅ Columns automatically responsive (stack on mobile)
- ✅ Uses blockGap for spacing between columns
- ✅ Each card has consistent padding (theme.json tokens)
- ✅ All colors from theme.json palette

---

## Example 3: Content Section (Group + Heading + Paragraph)

### Figma Design
```
About Section Frame
├── Container (max-width 720px)
└── Content
    ├── Heading (H2)
    ├── Paragraph 1
    ├── Paragraph 2
    └── Image
```

### FSE Template Output

```html
<!-- wp:group {"layout":{"type":"constrained","contentSize":"720px"},"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--60)","bottom":"var(--wp--preset--spacing--60)"}}},"backgroundColor":"white"} -->
<div class="wp-block-group has-white-background-color has-background">

  <!-- wp:heading {"level":2,"textColor":"neutral-900","fontSize":"2xl"} -->
  <h2 class="wp-block-heading has-neutral-900-color has-text-color has-2-xl-font-size">About Our Company</h2>
  <!-- /wp:heading -->

  <!-- wp:paragraph {"textColor":"neutral-700","fontSize":"base"} -->
  <p class="has-neutral-700-color has-text-color has-base-font-size">We've been serving customers for over 20 years with dedication and expertise. Our mission is to provide the highest quality products and services.</p>
  <!-- /wp:paragraph -->

  <!-- wp:paragraph {"textColor":"neutral-700","fontSize":"base"} -->
  <p class="has-neutral-700-color has-text-color has-base-font-size">Join thousands of satisfied customers who trust us for their needs.</p>
  <!-- /wp:paragraph -->

  <!-- wp:image {"align":"wide","sizeSlug":"large"} -->
  <figure class="wp-block-image alignwide size-large">
    <img src="https://example.com/about-image.jpg" alt="Team photo"/>
  </figure>
  <!-- /wp:image -->

</div>
<!-- /wp:group -->
```

**Key Points:**
- ✅ Uses constrained layout with contentSize from theme.json
- ✅ Spacing tokens for padding
- ✅ Image uses "wide" alignment (respects theme.json wideSize)
- ✅ Semantic heading hierarchy

---

## Example 4: Full Template with Header/Footer

### Figma Design
```
Homepage Template
├── Header (Navigation)
├── Hero Section
├── Features Section
├── CTA Section
└── Footer
```

### FSE Template Output (front-page.html)

```html
<!-- wp:template-part {"slug":"header","theme":"mytheme","tagName":"header"} /-->

<!-- wp:cover {"url":"https://example.com/hero.jpg","dimRatio":50,"overlayColor":"black","align":"full"} -->
<div class="wp-block-cover alignfull">
  <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span>
  <img class="wp-block-cover__image-background" alt="" src="https://example.com/hero.jpg" />
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"textAlign":"center","level":1,"textColor":"white","fontSize":"3xl"} -->
    <h1 class="wp-block-heading has-text-align-center has-white-color has-text-color has-3-xl-font-size">Welcome Home</h1>
    <!-- /wp:heading -->
  </div>
</div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--60)","bottom":"var(--wp--preset--spacing--60)"}}},"backgroundColor":"white"} -->
<div class="wp-block-group has-white-background-color has-background">

  <!-- wp:heading {"textAlign":"center","level":2,"fontSize":"2xl"} -->
  <h2 class="wp-block-heading has-text-align-center has-2-xl-font-size">Our Features</h2>
  <!-- /wp:heading -->

  <!-- wp:columns -->
  <div class="wp-block-columns">
    <!-- Feature columns here -->
  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--60)","bottom":"var(--wp--preset--spacing--60)"}}},"backgroundColor":"primary","textColor":"white"} -->
<div class="wp-block-group alignfull has-primary-background-color has-white-color has-text-color has-background">

  <!-- wp:heading {"textAlign":"center","level":2,"textColor":"white","fontSize":"2xl"} -->
  <h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-2-xl-font-size">Ready to Get Started?</h2>
  <!-- /wp:heading -->

  <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
  <div class="wp-block-buttons">
    <!-- wp:button {"backgroundColor":"white","textColor":"primary"} -->
    <div class="wp-block-button">
      <a class="wp-block-button__link has-primary-color has-white-background-color has-text-color has-background wp-element-button">Contact Us</a>
    </div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","theme":"mytheme","tagName":"footer"} /-->
```

**Key Points:**
- ✅ Includes header/footer template parts
- ✅ Multiple sections with different backgrounds
- ✅ Full-width sections (align="full")
- ✅ Consistent spacing throughout

---

## Quick Block Reference

### Layout Blocks

**Group (Container)**
```html
<!-- wp:group {"backgroundColor":"white"} -->
<div class="wp-block-group has-white-background-color has-background">
  <!-- Content here -->
</div>
<!-- /wp:group -->
```

**Columns (Grid)**
```html
<!-- wp:columns -->
<div class="wp-block-columns">
  <!-- wp:column -->
  <div class="wp-block-column">
    <!-- Column content -->
  </div>
  <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

**Spacer (Vertical Rhythm)**
```html
<!-- wp:spacer {"height":"var(--wp--preset--spacing--50)"} -->
<div style="height:var(--wp--preset--spacing--50)" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
```

### Content Blocks

**Heading**
```html
<!-- wp:heading {"level":2,"textColor":"neutral-900","fontSize":"2xl"} -->
<h2 class="wp-block-heading has-neutral-900-color has-text-color has-2-xl-font-size">Title</h2>
<!-- /wp:heading -->
```

**Paragraph**
```html
<!-- wp:paragraph {"textColor":"neutral-700","fontSize":"base"} -->
<p class="has-neutral-700-color has-text-color has-base-font-size">Text content</p>
<!-- /wp:paragraph -->
```

**Image**
```html
<!-- wp:image {"sizeSlug":"large","align":"center"} -->
<figure class="wp-block-image aligncenter size-large">
  <img src="image.jpg" alt="Description"/>
</figure>
<!-- /wp:image -->
```

**Button**
```html
<!-- wp:button {"backgroundColor":"primary","textColor":"white"} -->
<div class="wp-block-button">
  <a class="wp-block-button__link has-white-color has-primary-background-color has-text-color has-background wp-element-button">Click Me</a>
</div>
<!-- /wp:button -->
```

### Complex Blocks

**Cover (Hero/Background Image)**
```html
<!-- wp:cover {"url":"bg.jpg","dimRatio":50,"align":"full"} -->
<div class="wp-block-cover alignfull">
  <span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span>
  <img class="wp-block-cover__image-background" alt="" src="bg.jpg" />
  <div class="wp-block-cover__inner-container">
    <!-- Content here -->
  </div>
</div>
<!-- /wp:cover -->
```

**Navigation**
```html
<!-- wp:navigation {"layout":{"type":"flex","justifyContent":"space-between"}} /-->
```

**Gallery**
```html
<!-- wp:gallery {"columns":3,"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-3">
  <!-- wp:image -->
  <figure class="wp-block-image"><img src="1.jpg"/></figure>
  <!-- /wp:image -->
  <!-- More images -->
</figure>
<!-- /wp:gallery -->
```

---

## Common Patterns

### Pattern: Hero Section
```
Cover block (full-width, background image)
└── Heading (H1, centered, large font)
    └── Paragraph (centered, medium font)
        └── Buttons (centered)
```

### Pattern: Feature Cards
```
Group (container, padding)
└── Heading (H2, centered)
    └── Columns (3 columns, equal width)
        └── Column 1, 2, 3 (white bg, padding)
            └── Image (icon, centered)
                └── Heading (H3)
                    └── Paragraph
```

### Pattern: CTA Section
```
Group (full-width, primary color background)
└── Heading (H2, white text, centered)
    └── Paragraph (white text, centered)
        └── Buttons (centered, white button)
```

### Pattern: Content with Sidebar
```
Columns (2 columns, 2/3 + 1/3 split)
├── Column (main content)
│   └── Heading + Paragraphs + Images
└── Column (sidebar)
    └── Group (widgets, navigation)
```

---

## Template Parts

### Header (parts/header.html)
```html
<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--30)","bottom":"var(--wp--preset--spacing--30)"}}},"backgroundColor":"white"} -->
<div class="wp-block-group has-white-background-color has-background">

  <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
  <div class="wp-block-group">

    <!-- wp:site-title /-->

    <!-- wp:navigation {"layout":{"type":"flex","justifyContent":"right"}} /-->

  </div>
  <!-- /wp:group -->

</div>
<!-- /wp:group -->
```

### Footer (parts/footer.html)
```html
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--60)","bottom":"var(--wp--preset--spacing--60)"}}},"backgroundColor":"neutral-900","textColor":"white"} -->
<div class="wp-block-group alignfull has-neutral-900-background-color has-white-color has-text-color has-background">

  <!-- wp:group {"layout":{"type":"constrained"}} -->
  <div class="wp-block-group">

    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">© 2026 Company Name. All rights reserved.</p>
    <!-- /wp:paragraph -->

  </div>
  <!-- /wp:group -->

</div>
<!-- /wp:group -->
```

---

## Validation Checklist

Before considering a template complete, verify:

- [ ] All opening blocks have closing blocks
- [ ] No hardcoded hex colors (#XXXXXX)
- [ ] No hardcoded pixel sizes (use var() or slugs)
- [ ] All colors reference theme.json slugs
- [ ] All font sizes reference theme.json slugs
- [ ] All spacing uses theme.json tokens
- [ ] Template parts included (header/footer)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Images have alt text
- [ ] Buttons have meaningful text (not "Click here")
- [ ] Responsive (columns stack on mobile automatically)

---

**End of Template Examples**
