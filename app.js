const pageNames = {
  "/": "home",
  "/index.html": "home",
  "/cardlist.html": "cardlist",
  "/coupons.html": "coupons",
  "/primeday.html": "primeday",
};

function parseMarkdownDocument(source) {
  const match = source.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!match) return { title: "Macarroni Love", body: source };

  const metadata = {};
  match[1].split("\n").forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  });

  return { ...metadata, body: match[2] };
}

function setExternalLinksToNewTab(root) {
  root.querySelectorAll("a[href]").forEach((link) => {
    if (/^(https?:|mailto:)/.test(link.href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

async function renderPage() {
  const page =
    Object.entries(pageNames).find(([path]) =>
      window.location.pathname.endsWith(path),
    )?.[1] || "home";
  const response = await fetch(`content/${page}.md`);
  if (!response.ok) throw new Error(`Unable to load content/${page}.md`);

  const documentData = parseMarkdownDocument(await response.text());
  document.title = documentData.title;
  document.body.classList.add(`page-${page}`);
  document.querySelector("[data-title]").textContent = documentData.title;
  const contentRoot = document.querySelector("[data-content]");
  contentRoot.innerHTML = marked.parse(documentData.body);
  contentRoot.querySelectorAll("ul").forEach((list) => list.classList.add("links"));

  const backLink = document.querySelector("[data-back]");
  if (backLink) backLink.hidden = page === "home";
  setExternalLinksToNewTab(document);
}

renderPage().catch((error) => {
  document.querySelector("[data-content]").innerHTML =
    "<p>Não foi possível carregar esta página agora.</p>";
  console.error(error);
});
