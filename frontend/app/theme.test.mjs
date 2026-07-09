import test from "node:test";
import assert from "node:assert/strict";

import { getInitialTheme, resolveTheme } from "./theme.js";

test("resolveTheme only accepts light and falls back to dark", () => {
	assert.equal(resolveTheme("light"), "light");
	assert.equal(resolveTheme("dark"), "dark");
	assert.equal(resolveTheme(null), "dark");
	assert.equal(resolveTheme("whatever"), "dark");
});

test("getInitialTheme prefers stored light theme before dataset is ready", () => {
	assert.equal(
		getInitialTheme({
			datasetTheme: undefined,
			storedTheme: "light",
		}),
		"light",
	);
});
