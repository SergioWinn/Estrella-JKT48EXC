export function resolveTheme(value) {
	return value === "light" ? "light" : "dark";
}

export function getInitialTheme({ datasetTheme, storedTheme }) {
	return resolveTheme(storedTheme ?? datasetTheme);
}

export function getThemeBootstrapScript(storageKey) {
	return `(() => {
  try {
    const storedTheme = window.localStorage.getItem(${JSON.stringify(storageKey)});
    document.documentElement.dataset.theme = ${resolveTheme.name}(storedTheme);
  } catch {
    document.documentElement.dataset.theme = "dark";
  }

  function ${resolveTheme.name}(value) {
    return value === "light" ? "light" : "dark";
  }
})();`;
}
