#!/usr/bin/env zx
/* eslint-disable max-len */
import { homedir } from "node:os";
import { $, argv } from "zx";

const main = async () => {
  const obsidianEnglishPath = `${homedir()}/Library/Mobile Documents/iCloud~md~obsidian/Documents/english/`;
  const remotePath = argv.remotePath || obsidianEnglishPath;
  await $`rsync -aH --delete --delete-delay --itemize-changes \\
  --exclude '.DS_Store' \\
  --exclude '.obsidian/' \\
  --include 'docs/***' \\
  --include 'blog/***' \\
  --include 'assets/***' \\
  --exclude '*' \\
  ${remotePath} \\
  './content/'`;
};
main();
