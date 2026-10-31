
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusBox = document.getElementById("status");
const themeBtn = document.getElementById("themeBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  results.replaceChildren();
  statusBox.textContent = "Recherche en cours...";

  try {
    const pages = await CherchNet.search(query);

    statusBox.textContent = pages.length
      ? pages.length + " résultats pour « " + query + " »"
      : "Aucun résultat trouvé.";

    for (const page of pages) {
      const article = document.createElement("article");
      article.className = "result";

      const link = document.createElement("a");
      link.href = page.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = page.title;

      const description = document.createElement("p");
      description.textContent = page.description;

      article.append(link, description);
      results.appendChild(article);
    }
  } catch (error) {
    console.error(error);
    statusBox.textContent =
      "Impossible de récupérer les résultats. Vérifie ta connexion ou réessaie.";
  }
});

// Mode sombre / clair
const savedTheme = localStorage.getItem("cherchnet-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const theme = document.body.classList.contains("light")
    ? "light"
    : "dark";

  localStorage.setItem("cherchnet-theme", theme);
});
