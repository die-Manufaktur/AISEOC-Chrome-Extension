import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "./Toast";

describe("Toast", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("shows message when visible", () => {
    render(<Toast message="Copied!" visible={true} onClose={onClose} />);
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("returns null when not visible", () => {
    const { container } = render(
      <Toast message="Copied!" visible={false} onClose={onClose} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("close button calls onClose", async () => {
    const user = userEvent.setup();
    render(<Toast message="Copied!" visible={true} onClose={onClose} />);
    const closeButton = screen.getByRole("button");
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders message text correctly", () => {
    render(
      <Toast message="Settings saved" visible={true} onClose={onClose} />,
    );
    expect(screen.getByText("Settings saved")).toBeInTheDocument();
  });

  it("shows check icon", () => {
    const { container } = render(
      <Toast message="Done" visible={true} onClose={onClose} />,
    );
    // Lucide Check icon renders as an SVG with the lucide-check class
    const checkIcon = container.querySelector("svg.lucide-check");
    expect(checkIcon).toBeInTheDocument();
  });
});
