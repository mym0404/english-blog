#!/usr/bin/env zx
/* eslint-disable max-len */
import { homedir } from "node:os";
import { $ } from "zx";

const main = async () => {
  const obsidianEnglishPath = `${homedir()}/Library/Mobile Documents/iCloud~md~obsidian/Documents/english/`;
  await $`rsync -aH --delete --delete-delay --itemize-changes \\
  --exclude '.DS_Store' \\
  --exclude '.obsidian/' \\
  --include 'docs/***' \\
  --include 'blog/***' \\
  --include 'assets/***' \\
  --exclude '*' \\
  ${obsidianEnglishPath} \\
  './content/'`;
};
main();
