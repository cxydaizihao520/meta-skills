#!/usr/bin/env node

import { runInstaller } from "../lib/installer.mjs";

const code = await runInstaller();
process.exitCode = code;
