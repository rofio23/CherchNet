
const CherchNet = {
  async search(query) {
    const url = new URL("https://fr.wikipedia.org/w/api.php");

    url.searchParams.set("action", "query");
    url.searchParams.set("generator", "search");
    url.searchParams.set("gsrsearch", query);
    url.searchParams.set("gsrlimit", "15");
    url.searchParams.set("prop", "extracts");
    url.searchParams.set("exintro", "1");
    url.searchParams.set("explaintext", "1");
    url.searchParams.set("exsentences", "3");
    url.searchParams.set("format", "json");
    url.searchParams.set("origin", "*");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur du service de recherche");
    }

    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});

    return pages
      .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
      .map(page => ({
        title: page.title,
        description: page.extract || "Consulter cet article.",
        url: "https://fr.wikipedia.org/?curid=" + page.pageid
      }));
  }
};
