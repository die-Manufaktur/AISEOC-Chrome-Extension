import { render, screen } from "@testing-library/react";
import { ScoreGauge } from "./ScoreGauge";

describe("ScoreGauge", () => {
  it("renders 'SEO Score' text", () => {
    render(<ScoreGauge score={75} />);
    expect(screen.getByText("SEO Score")).toBeInTheDocument();
  });

  it("renders an SVG element", () => {
    const { container } = render(<ScoreGauge score={75} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has 3 circle elements (background, glow, main arc)", () => {
    const { container } = render(<ScoreGauge score={75} />);
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(3);
  });

  it("renders with custom size prop", () => {
    const { container } = render(<ScoreGauge score={50} size={300} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "300");
    expect(svg).toHaveAttribute("height", "300");
  });

  it("initial display starts at 0 before animation", () => {
    render(<ScoreGauge score={85} />);
    // Before any animation frame fires, displayScore is 0
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
