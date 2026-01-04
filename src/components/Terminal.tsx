"use client";

import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";

type TerminalProps = {
  lines?: string[];
};

const darkTheme = {
  background: "rgba(45, 42, 62, 0.85)",
  foreground: "#e8e3f3",
  cursor: "#f5b8d0",
  black: "#3d3a50",
  red: "#f5a0a0",
  green: "#a8e6cf",
  yellow: "#ffe6a7",
  blue: "#a0c4ff",
  magenta: "#e4b0ff",
  cyan: "#a0e7e5",
  white: "#f0edf5",
};

const lightTheme = {
  background: "rgba(255, 250, 245, 0.85)",
  foreground: "#3d3a50",
  cursor: "#e879a0",
  black: "#2d2a3e",
  red: "#d05050",
  green: "#40a070",
  yellow: "#c09020",
  blue: "#4080c0",
  magenta: "#a050c0",
  cyan: "#30a0a0",
  white: "#f0edf5",
};

export const TerminalDisplay = ({ lines = [] }: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!containerRef.current || terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: isDark ? darkTheme : lightTheme,
      rows: 12,
      cols: 80,
      disableStdin: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(containerRef.current);
    fitAddon.fit();

    terminalRef.current = terminal;

    const typeText = async () => {
      for (const line of lines) {
        for (const char of line) {
          terminal.write(char);
          await new Promise((r) => setTimeout(r, 30));
        }
        terminal.write("\r\n");
        await new Promise((r) => setTimeout(r, 100));
      }
      terminal.write("\x1b[32m$ \x1b[0m");
    };

    typeText();

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      terminal.dispose();
      terminalRef.current = null;
    };
  }, [lines, isDark]);

  const gradientClass = isDark
    ? "bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-pink-900/40"
    : "bg-gradient-to-br from-pink-100/80 via-purple-100/70 to-blue-100/60";

  const headerClass = isDark ? "bg-purple-900/40" : "bg-purple-200/50";
  const titleClass = isDark ? "text-purple-200" : "text-purple-600";

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-purple-300/30 shadow-2xl backdrop-blur-sm ${gradientClass}`}
    >
      <div className={`flex items-center gap-2 px-4 py-2 ${headerClass}`}>
        <div className={"w-3 h-3 rounded-full bg-pink-300"} />
        <div className={"w-3 h-3 rounded-full bg-yellow-200"} />
        <div className={"w-3 h-3 rounded-full bg-green-200"} />
        <span className={`ml-2 text-sm ${titleClass}`}>terminal</span>
      </div>
      <div ref={containerRef} className={"p-2"} />
    </div>
  );
};
