import { useState, useEffect } from "react";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";

const languages = SUPPORTED_LANGUAGES.map((lang) => ({
  value: lang.code,
  label: `${lang.code.toUpperCase()} - ${lang.name}`,
}));

export function Options() {
  const [apiKey, setApiKey] = useState("");
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.local
      .get(["openai_api_key", "default_language"])
      .then((result) => {
        if (result.openai_api_key) setApiKey(result.openai_api_key);
        if (result.default_language) setLanguage(result.default_language);
      });
  }, []);

  const handleSave = async () => {
    await chrome.storage.local.set({
      openai_api_key: apiKey,
      default_language: language,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-xl font-semibold text-text-primary">
        Settings
      </h1>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="api-key"
            className="text-sm font-medium text-text-primary"
          >
            OpenAI API key
          </label>
          <input
            id="api-key"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="rounded-lg border border-[#717171] bg-bg-500 p-3 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:ring-1 focus:ring-accent-blue"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="default-language"
            className="text-sm font-medium text-text-primary"
          >
            Default language
          </label>
          <select
            id="default-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-[#717171] bg-bg-500 p-3 text-sm text-text-primary outline-none focus:ring-1 focus:ring-accent-blue"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="rounded-full bg-accent-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-blue/90"
        >
          Save
        </button>

        {saved && (
          <p className="text-sm text-green-400">Settings saved.</p>
        )}
      </div>
    </div>
  );
}
