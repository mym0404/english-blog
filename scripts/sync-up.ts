#!/usr/bin/env zx
/* eslint-disable max-len */
import { $ } from "zx";

const main = async () => {
  await $`rsync -aH --delete --delete-delay --itemize-changes \\
  --exclude '.DS_Store' \\
  --exclude '.obsidian/' \\
  --include 'docs/***' \\
  --include 'blog/***' \\
  --exclude '*' \\
  './content/' \\
  '/Users/mj/Library/Mobile Documents/iCloud~md~obsidian/Documents/english/'`;
};

main();
