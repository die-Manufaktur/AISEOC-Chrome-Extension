import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { Options } from "./Options";

describe("Options page", () => {
  beforeEach(() => {
    // Reset chrome.storage mock between tests
    (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockImplementation(
      () => Promise.resolve({}),
    );
  });

  // --- Rendering ---

  it("renders the settings heading", () => {
    render(<Options />);
    expect(
      screen.getByRole("heading", { name: /settings/i }),
    ).toBeInTheDocument();
  });

  it("renders the OpenAI API key field", () => {
    render(<Options />);
    expect(screen.getByLabelText(/openai api key/i)).toBeInTheDocument();
  });

  it("renders the default language select", () => {
    render(<Options />);
    expect(
      screen.getByLabelText(/default language/i),
    ).toBeInTheDocument();
  });

  it("renders a save button", () => {
    render(<Options />);
    expect(
      screen.getByRole("button", { name: /save/i }),
    ).toBeInTheDocument();
  });

  // --- Loading saved values ---

  it("loads saved API key from chrome.storage on mount", async () => {
    (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        Promise.resolve({
          openai_api_key: "sk-test-key-123",
          default_language: "en",
        }),
    );

    render(<Options />);

    await waitFor(() => {
      expect(screen.getByLabelText(/openai api key/i)).toHaveValue(
        "sk-test-key-123",
      );
    });
  });

  it("loads saved language from chrome.storage on mount", async () => {
    (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        Promise.resolve({
          openai_api_key: "",
          default_language: "fr",
        }),
    );

    render(<Options />);

    await waitFor(() => {
      expect(screen.getByLabelText(/default language/i)).toHaveValue("fr");
    });
  });

  // --- User interactions ---

  it("allows typing an API key", async () => {
    const user = userEvent.setup();
    render(<Options />);

    const input = screen.getByLabelText(/openai api key/i);
    await user.clear(input);
    await user.type(input, "sk-new-key");

    expect(input).toHaveValue("sk-new-key");
  });

  it("allows selecting a language", async () => {
    const user = userEvent.setup();
    render(<Options />);

    const select = screen.getByLabelText(/default language/i);
    await user.selectOptions(select, "de");

    expect(select).toHaveValue("de");
  });

  it("saves settings to chrome.storage when save is clicked", async () => {
    const user = userEvent.setup();
    render(<Options />);

    const input = screen.getByLabelText(/openai api key/i);
    await user.clear(input);
    await user.type(input, "sk-saved-key");

    const select = screen.getByLabelText(/default language/i);
    await user.selectOptions(select, "es");

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      expect.objectContaining({
        openai_api_key: "sk-saved-key",
        default_language: "es",
      }),
    );
  });

  it("shows a success message after saving", async () => {
    const user = userEvent.setup();
    render(<Options />);

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });
  });

  // --- Accessibility ---

  it("API key input has password type for security", () => {
    render(<Options />);
    expect(screen.getByLabelText(/openai api key/i)).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("all form controls have associated labels", () => {
    render(<Options />);
    // These will throw if no label is associated
    expect(screen.getByLabelText(/openai api key/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/default language/i)).toBeInTheDocument();
  });
});
