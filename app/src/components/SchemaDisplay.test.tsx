import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SchemaDisplay } from "./SchemaDisplay";
import type { SchemaRecommendation } from "@/types/seo";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });
});

const requiredSchema: SchemaRecommendation = {
  name: "Organization",
  description: "Describes the organization behind the website.",
  documentationUrl: "https://schema.org/Organization",
  googleSupport: "yes",
  jsonLdCode: '{\n  "@type": "Organization",\n  "name": "Example"\n}',
  isRequired: true,
};

const optionalSchema: SchemaRecommendation = {
  name: "BreadcrumbList",
  description: "Helps search engines understand site hierarchy.",
  documentationUrl: "https://schema.org/BreadcrumbList",
  googleSupport: "partial",
  jsonLdCode: '{\n  "@type": "BreadcrumbList"\n}',
  isRequired: false,
};

describe("SchemaDisplay", () => {
  const defaultProps = {
    schemas: [requiredSchema, optionalSchema],
    onToast: vi.fn(),
  };

  it("returns null for empty schemas array", () => {
    const { container } = render(
      <SchemaDisplay schemas={[]} onToast={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders required schemas under 'Required' label", () => {
    render(<SchemaDisplay {...defaultProps} />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
  });

  it("renders optional schemas under 'Optional' label", () => {
    render(<SchemaDisplay {...defaultProps} />);
    expect(screen.getByText("Optional")).toBeInTheDocument();
    expect(screen.getByText("BreadcrumbList")).toBeInTheDocument();
  });

  it("displays the schema name", () => {
    render(<SchemaDisplay {...defaultProps} />);
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("BreadcrumbList")).toBeInTheDocument();
  });

  it("expands schema to show description and code on click", async () => {
    const user = userEvent.setup();
    render(<SchemaDisplay {...defaultProps} />);
    expect(
      screen.queryByText("Describes the organization behind the website."),
    ).not.toBeInTheDocument();
    await user.click(screen.getByText("Organization"));
    expect(
      screen.getByText("Describes the organization behind the website."),
    ).toBeInTheDocument();
  });

  it("copies JSON-LD wrapped in script tags on copy click", async () => {
    const user = userEvent.setup();
    render(<SchemaDisplay {...defaultProps} />);
    await user.click(screen.getByText("Organization"));
    await user.click(screen.getByTitle("Copy JSON-LD"));
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe(
      `<script type="application/ld+json">\n{\n  "@type": "Organization",\n  "name": "Example"\n}\n</script>`,
    );
  });

  it("shows 'Rich Results' badge for googleSupport 'yes'", () => {
    render(<SchemaDisplay {...defaultProps} />);
    expect(screen.getByText("Rich Results")).toBeInTheDocument();
  });

  it("shows documentation link when expanded", async () => {
    const user = userEvent.setup();
    render(<SchemaDisplay {...defaultProps} />);
    await user.click(screen.getByText("Organization"));
    const link = screen.getByText("Documentation");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://schema.org/Organization",
    );
  });
});
