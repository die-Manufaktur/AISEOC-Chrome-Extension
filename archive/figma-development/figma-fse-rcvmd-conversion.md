# RCVMD Figma-to-FSE Theme Conversion Plan

## Project Overview
Converting complete RCVMD Figma design system into pixel-perfect WordPress FSE block theme with full responsive support (desktop + mobile).

**Figma File:** EMwFDkul8pwDXuQFALjYwC
**Theme Name:** rcvmd
**Target:** WordPress 6.0+ FSE (Full Site Editing)

---

## Phase 1: Foundation (COMPLETED ✓)

### 1.1 Design System Extraction ✓
- **Status:** Complete
- **Output:** `themes/rcvmd/theme.json`
- **Design Tokens Created:**
  - **Colors:** 15 tokens (primary red/pink, accent yellow, neutrals, grays)
  - **Typography:** 2 font families (Inter, Questrial), 9 font sizes
  - **Spacing:** 10 tokens (4px to 112px scale)
  - **Shadows:** 5 presets (sm to xl)
  - **Layout:** contentSize (768px), wideSize (1280px)

### 1.2 Theme Structure ✓
- **Status:** Complete
- **Created:**
  ```
  themes/rcvmd/
  ├── theme.json          ✓ Complete design system
  ├── style.css           ✓ Theme header
  ├── templates/          ✓ Ready for FSE templates
  ├── parts/              ✓ Ready for header/footer
  ├── patterns/           ✓ Ready for block patterns
  └── assets/             ✓ Ready for images/CSS/JS
  ```

---

## Phase 2: Template Identification & Component Mapping

### 2.1 Identified Page Layouts (from Figma workspace)

Based on visual analysis of the Design workspace, the following page types are visible:

1. **Homepage / Landing Page**
   - Hero section with healthcare imagery
   - Services/features sections
   - Call-to-action sections
   - Mobile responsive version

2. **About / Team Pages**
   - Hero with team/facility images
   - Text content sections
   - Staff/physician profiles
   - Mobile version

3. **Services Pages**
   - Service hero sections
   - Service descriptions with imagery
   - Feature lists
   - Mobile version

4. **Contact / Forms Pages**
   - Contact forms (gray sections visible)
   - Location/contact information
   - Mobile version

5. **Content Pages (Multiple variants observed)**
   - Standard page layouts
   - Text-heavy sections
   - Image + text combinations
   - Mobile versions

6. **Additional Templates** (to be discovered during conversion)
   - Single post template
   - Archive template
   - 404 page
   - Search results

**Total Estimated Templates:** 10-15 FSE templates

### 2.2 Component Mapping Strategy

| Figma Component | WordPress Block(s) | Implementation Notes |
|----------------|-------------------|---------------------|
| **Hero Sections** | `core/cover` | Full-width background images with overlay, text, and buttons |
| **Content Sections** | `core/group` + `core/columns` | Flexible container with column layouts |
| **Image + Text Layouts** | `core/media-text` | Side-by-side image and content |
| **Call-to-Action** | `core/buttons` + `core/group` | Branded buttons with background color |
| **Forms** | `core/form` or Contact Form 7 | Contact forms (gray sections) |
| **Card Grids** | `core/columns` + `core/group` | Service cards, team members |
| **Navigation** | `core/navigation` | Header menu |
| **Logo/Branding** | `core/site-logo` + `core/site-title` | Header branding |
| **Text Sections** | `core/paragraph` + `core/heading` | Body content with headings |
| **Image Galleries** | `core/gallery` | Multiple images in grid |
| **Spacers** | `core/spacer` | Vertical spacing (using theme.json tokens) |
| **Footer Sections** | `core/group` + `core/columns` | Multi-column footer |

### 2.3 Design Token Application

**All templates will use theme.json tokens exclusively:**

- ✅ **Colors:** `var(--wp--preset--color--primary)` NOT `#c41e3a`
- ✅ **Spacing:** `var(--wp--preset--spacing--50)` NOT `24px`
- ✅ **Font Sizes:** `var(--wp--preset--font-size--x-large)` NOT `24px`
- ✅ **Font Families:** `var(--wp--preset--font-family--heading)` NOT `"Questrial"`

**Target: ZERO hardcoded values in templates**

---

## Phase 3: Template Conversion (Autonomous Execution)

### 3.1 Conversion Priority Order

**Priority 1: Template Parts (Required by other templates)**
1. `parts/header.html` - Site header with navigation
2. `parts/footer.html` - Site footer with columns

**Priority 2: Required Templates**
3. `templates/index.html` - Fallback template (required)
4. `templates/front-page.html` - Homepage
5. `templates/page.html` - Default page template

**Priority 3: Content Templates**
6. `templates/single.html` - Blog post template
7. `templates/archive.html` - Blog archive
8. `templates/page-services.html` - Services page
9. `templates/page-about.html` - About page
10. `templates/page-contact.html` - Contact page

**Priority 4: Special Templates**
11. `templates/404.html` - Error page
12. `templates/search.html` - Search results
13. Additional page templates as needed

### 3.2 Responsive Design Strategy

**All templates will be mobile-first responsive:**
- Use `core/columns` with responsive settings
- Apply appropriate block alignments (wide, full)
- Stack columns on mobile (default WordPress behavior)
- Use theme.json spacing tokens for consistent gaps
- Test mental model: mobile → tablet → desktop

### 3.3 Accessibility Requirements

**Every template must include:**
- Semantic HTML structure (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- ARIA labels for navigation and interactive elements
- Alt text for all images
- Keyboard navigation support
- Color contrast compliance (WCAG AA)

### 3.4 Conversion Workflow Per Template

For each template (X of N):
1. Extract Figma design structure (desktop frame)
2. Identify components and map to WordPress blocks
3. Extract design properties (colors, spacing, typography)
4. Match properties to theme.json tokens
5. Generate FSE template HTML with block markup
6. Apply responsive settings for mobile
7. Add accessibility attributes
8. Validate block syntax
9. Save to `themes/rcvmd/templates/`
10. Track attribute comparison data (Phase 3 validation)
11. Continue to next template (NO user prompt)

### 3.5 Checkpointing Strategy

**Checkpoint every 3 templates:**
- Save progress to episodic memory
- Track completed vs remaining templates
- Log any errors or issues
- Continue autonomously (non-blocking)

**If session interrupted:**
- Resume from last checkpoint
- No need to re-extract design system
- Continue with remaining templates

---

## Phase 4: Quality Assurance

### 4.1 Automated Validation

**Run after all templates complete:**
```bash
# Security scan
./scripts/wordpress/security-scan.sh themes/rcvmd

# Coding standards
./scripts/wordpress/check-coding-standards.sh themes/rcvmd

# Performance check
./scripts/wordpress/check-performance.sh themes/rcvmd
```

### 4.2 Template Validation

**Per-template checks:**
- ✅ Block syntax validation (balanced open/close tags)
- ✅ Zero hardcoded hex colors
- ✅ Zero hardcoded pixel values
- ✅ All colors use theme.json tokens
- ✅ All spacing uses theme.json tokens
- ✅ Proper accessibility attributes

### 4.3 Comparison Report

**Generate comprehensive report:**
- `claude/figma-data/attribute-comparison.json` - Token matching data
- `.claude/reports/figma-fse-comparison.md` - Full conversion report

**Report will include:**
- Total templates converted
- Design tokens usage statistics
- Attribute matching accuracy
- Issues and recommendations
- Screenshots comparison (Figma vs rendered)

---

## Phase 5: Deliverables

### 5.1 Complete Theme Package

**Location:** `themes/rcvmd/`

**Contents:**
- `theme.json` - Complete design system (15 colors, 9 font sizes, 10 spacing tokens)
- `style.css` - Theme header and metadata
- `templates/` - All FSE template HTML files (10-15 templates)
- `parts/` - Header and footer template parts
- `patterns/` - Reusable block patterns (if applicable)
- `assets/` - CSS, JavaScript, and images

### 5.2 Documentation

**Location:** `.claude/reports/`

- `figma-fse-comparison.md` - Conversion report
- `.claude/figma-data/attribute-comparison.json` - Attribute validation data

### 5.3 Testing Instructions

**After conversion:**
1. Copy theme to WordPress: `cp -r themes/rcvmd /path/to/wordpress/wp-content/themes/`
2. Activate theme in WordPress admin
3. Navigate to Appearance → Editor to view templates
4. Test each template with real content
5. Verify responsive behavior (mobile/tablet/desktop)
6. Check accessibility with screen reader

---

## Success Criteria

### Completion Checklist

- [ ] All page designs from Figma converted to FSE templates
- [ ] Desktop and mobile responsiveness implemented
- [ ] 100% theme.json token usage (zero hardcoded values)
- [ ] All templates pass security scan
- [ ] All templates pass coding standards
- [ ] Accessibility attributes present in all templates
- [ ] Comparison report generated
- [ ] Theme ready for WordPress installation

### Quality Metrics

**Target Metrics:**
- **Design Token Usage:** 100% (zero hardcoded values)
- **Template Count:** 10-15 templates
- **Accessibility:** WCAG AA compliant
- **Security:** Zero vulnerabilities
- **Performance:** All checks passing
- **Responsive:** Mobile/tablet/desktop tested

---

## Execution Strategy

### Autonomous Workflow

Once approved, this plan will be executed using `superpowers:executing-plans`:

1. **No interruptions:** Work through all templates without "should I continue?" prompts
2. **Checkpointing:** Save progress every 3 templates to episodic memory
3. **Error recovery:** Log errors, use fallbacks, continue execution
4. **Completion:** Present final results with comprehensive report

### Timeline

- **Phase 3 (Template Conversion):** Autonomous execution, 10-15 templates
- **Phase 4 (Quality Assurance):** Automated validation
- **Phase 5 (Deliverables):** Report generation and handoff

**Estimated Total:** Single autonomous session (no time estimates, but uninterrupted execution)

---

## Next Steps

**Ready for user approval:**

1. Review this plan
2. Confirm page types match your Figma file
3. Approve autonomous execution
4. I'll proceed with uninterrupted conversion of all templates

**After approval:**
→ Execute Phase 3-5 autonomously
→ Present complete theme with report

---

**Status:** Plan complete, awaiting user approval
**Plan Version:** 1.0
**Date:** 2026-01-21
