import React from "react";

type Lang = "javascript" | "html" | "css" | "json";

const TEMPLATES: Record<Lang, string> = {
  javascript:
    `// JavaScript runner (console output captured)\n` +
    `console.log("Hello from ArjunOS Code Runner");\n\n` +
    `function fib(n){return n<2?n:fib(n-1)+fib(n-2)}\n` +
    `console.log("fib(10) =", fib(10));\n`,
  html:
    `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>Preview</title>\n  </head>\n  <body>\n    <h1>ArjunOS Preview</h1>\n    <p>Edit HTML and press Run.</p>\n  </body>\n</html>\n`,
  css:
    `/* CSS preview is applied to the HTML template */\nbody { font-family: system-ui; padding: 16px; }\nh1 { color: hotpink; }\n`,
  json: `{\n  "name": "ArjunOS",\n  "mode": "code-runner"\n}\n`,
};

function makeHtmlPreview(html: string, css: string) {
  const safeCss = `<style>${css}</style>`;
  if (/<head[\s>]/i.test(html)) return html.replace(/<\/head>/i, `${safeCss}\n</head>`);
  return `${safeCss}\n${html}`;
}

const CodeRunnerApp = () => {
  const [lang, setLang] = React.useState<Lang>("javascript");
  const [code, setCode] = React.useState<string>(() => TEMPLATES.javascript);
  const [html, setHtml] = React.useState<string>(() => TEMPLATES.html);
  const [css, setCss] = React.useState<string>(() => TEMPLATES.css);

  const [output, setOutput] = React.useState<string>("> ready");
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    // Keep editor content stable when switching languages, but provide sensible defaults.
    if (lang === "javascript") setCode((c) => (c ? c : TEMPLATES.javascript));
    if (lang === "json") setCode((c) => (c ? c : TEMPLATES.json));
  }, [lang]);

  const run = () => {
    if (lang === "javascript") {
      const logs: string[] = [];
      const fakeConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
        warn: (...args: unknown[]) => logs.push(["warn:", ...args.map(String)].join(" ")),
        error: (...args: unknown[]) => logs.push(["error:", ...args.map(String)].join(" ")),
      };
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function("console", `"use strict";\n${code}\n`);
        fn(fakeConsole);
        setOutput(logs.length ? logs.join("\n") : "(no output)");
      } catch (e) {
        setOutput(`Runtime error: ${e instanceof Error ? e.message : String(e)}`);
      }
      return;
    }

    if (lang === "json") {
      try {
        const parsed = JSON.parse(code);
        setOutput(JSON.stringify(parsed, null, 2));
      } catch (e) {
        setOutput(`JSON error: ${e instanceof Error ? e.message : String(e)}`);
      }
      return;
    }

    // HTML/CSS preview
    const doc = makeHtmlPreview(html, css);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = doc;
      setOutput("> preview updated");
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase opacity-70">
            Language
          </span>
          {(["javascript", "html", "css", "json"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="px-2 py-1 border-2 text-[10px] font-bold uppercase transition-all active:translate-y-[2px]"
              style={{
                backgroundColor: lang === l ? "var(--accent)" : "var(--window-bg)",
                borderColor: "var(--border)",
                color: lang === l ? "#000" : "var(--text)",
                boxShadow: "2px 2px 0px 0px var(--border)",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={run}
          className="px-3 py-2 border-2 text-xs font-bold uppercase transition-all active:translate-y-[2px]"
          style={{
            backgroundColor: "var(--accent)",
            borderColor: "var(--border)",
            color: "#000",
            boxShadow: "2px 2px 0px 0px var(--border)",
          }}
        >
          Run
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
        {/* Editor */}
        <div className="flex flex-col min-h-0">
          <div className="text-[10px] font-bold uppercase opacity-70 mb-1">
            Editor
          </div>

          {lang === "html" ? (
            <div className="grid grid-cols-1 gap-2 min-h-0 flex-1">
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full flex-1 min-h-0 p-2 border-2 text-xs outline-none resize-none"
                style={{
                  backgroundColor: "var(--window-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-28 p-2 border-2 text-xs outline-none resize-none"
                style={{
                  backgroundColor: "var(--window-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          ) : lang === "css" ? (
            <div className="grid grid-cols-1 gap-2 min-h-0 flex-1">
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full flex-1 min-h-0 p-2 border-2 text-xs outline-none resize-none"
                style={{
                  backgroundColor: "var(--window-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-28 p-2 border-2 text-xs outline-none resize-none"
                style={{
                  backgroundColor: "var(--window-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          ) : (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 min-h-0 p-2 border-2 text-xs outline-none resize-none"
              style={{
                backgroundColor: "var(--window-bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          )}
        </div>

        {/* Output / Preview */}
        <div className="flex flex-col min-h-0">
          <div className="text-[10px] font-bold uppercase opacity-70 mb-1">
            {lang === "html" || lang === "css" ? "Preview" : "Output"}
          </div>

          {lang === "html" || lang === "css" ? (
            <iframe
              ref={iframeRef}
              title="preview"
              className="w-full flex-1 min-h-0 border-2"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "#fff",
              }}
            />
          ) : (
            <pre
              className="w-full flex-1 min-h-0 p-2 border-2 text-xs overflow-auto"
              style={{
                backgroundColor: "var(--border)",
                borderColor: "var(--border)",
                color: "var(--accent)",
              }}
            >
              {output}
            </pre>
          )}

          {(lang === "html" || lang === "css") && (
            <pre
              className="mt-2 w-full p-2 border-2 text-xs overflow-auto"
              style={{
                backgroundColor: "var(--border)",
                borderColor: "var(--border)",
                color: "var(--accent)",
              }}
            >
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeRunnerApp;

