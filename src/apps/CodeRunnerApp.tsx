import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { useSound } from "../contexts/useSound";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-tomorrow.css";

type Lang = "javascript" | "typescript" | "python" | "java" | "c" | "cpp";

const PRISM_ALIAS: Record<Lang, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
};

const TEMPLATES: Record<Lang, string> = {
  javascript:
    `// JavaScript (Run supported)\n` +
    `console.log("Hello from ArjunOS Code Runner");\n\n` +
    `function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }\n` +
    `console.log("fib(10) =", fib(10));\n`,
  typescript:
    `// TypeScript (syntax highlight only; Run = JavaScript)\n` +
    `const greet = (name: string): string => \`Hello, \${name}!\`;\n` +
    `console.log(greet("ArjunOS"));\n`,
  python:
    `# Python (syntax highlight only)\n` +
    `def fib(n):\n` +
    `    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n` +
    `print("fib(10) =", fib(10))\n`,
  java:
    `// Java (syntax highlight only)\n` +
    `public class Main {\n` +
    `    public static void main(String[] args) {\n` +
    `        System.out.println("Hello from ArjunOS");\n` +
    `    }\n` +
    `}\n`,
  c:
    `// C (syntax highlight only)\n` +
    `#include <stdio.h>\n\n` +
    `int main(void) {\n` +
    `    printf("Hello from ArjunOS\\n");\n` +
    `    return 0;\n` +
    `}\n`,
  cpp:
    `// C++ (syntax highlight only)\n` +
    `#include <iostream>\n\n` +
    `int main() {\n` +
    `    std::cout << "Hello from ArjunOS" << std::endl;\n` +
    `    return 0;\n` +
    `}\n`,
};

const LANG_LABELS: Record<Lang, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
};

const CodeRunnerApp = () => {
  const { playError } = useSound();
  const [lang, setLang] = React.useState<Lang>("javascript");
  const [code, setCode] = React.useState<string>(() => TEMPLATES.javascript);
  const [output, setOutput] = React.useState<string>("> ready");

  const highlight = (code: string) => {
    const grammar = Prism.languages[PRISM_ALIAS[lang]];
    if (!grammar) return code;
    return Prism.highlight(code, grammar, PRISM_ALIAS[lang]);
  };

  const run = () => {
    if (lang === "javascript") {
      const logs: string[] = [];
      const fakeConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
        warn: (...args: unknown[]) =>
          logs.push(["warn:", ...args.map(String)].join(" ")),
        error: (...args: unknown[]) =>
          logs.push(["error:", ...args.map(String)].join(" ")),
      };
      try {
        const fn = new Function("console", `"use strict";\n${code}\n`);
        fn(fakeConsole);
        setOutput(logs.length ? logs.join("\n") : "(no output)");
      } catch (e) {
        playError();
        setOutput(
          `Runtime error: ${e instanceof Error ? e.message : String(e)}`
        );
      }
      return;
    }
    if (lang === "typescript") {
      setOutput(
        "Run is only supported for JavaScript. Use JavaScript for executable output."
      );
      return;
    }
    setOutput(
      `Run is only supported for JavaScript. "${LANG_LABELS[lang]}" is for syntax highlighting only.`
    );
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase opacity-70">
            Language
          </span>
          {(Object.keys(TEMPLATES) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setCode((prev) => (prev.trim() ? prev : TEMPLATES[l]));
              }}
              className="px-2 py-1 border-2 text-[10px] font-bold uppercase transition-all active:translate-y-[2px]"
              style={{
                backgroundColor:
                  lang === l ? "var(--accent)" : "var(--window-bg)",
                borderColor: "var(--border)",
                color: lang === l ? "#000" : "var(--text)",
                boxShadow: "2px 2px 0px 0px var(--border)",
              }}
            >
              {LANG_LABELS[l]}
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
        <div className="flex flex-col min-h-0">
          <div className="text-[10px] font-bold uppercase opacity-70 mb-1">
            Editor
          </div>
          <div
            className="flex-1 min-h-0 border-2 overflow-auto rounded"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "#1d1f21",
            }}
          >
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={highlight}
              padding={12}
              tabSize={2}
              insertSpaces
              textareaClassName="editor-textarea"
              preClassName="editor-pre"
              style={{
                fontSize: "13px",
                minHeight: "100%",
                fontFamily: "ui-monospace, monospace",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col min-h-0">
          <div className="text-[10px] font-bold uppercase opacity-70 mb-1">
            Output
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default CodeRunnerApp;
