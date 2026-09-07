const pageNames = {
  "/": "home",
  "/index.html": "home",
  "/cardlist.html": "cardlist",
  "/coupons.html": "coupons",
  "/primeday.html": "primeday",
};

const pageTitles = {
  home: "Macarroni Love",
  cardlist: "O Gringo Recomenda",
  coupons: "Descontos para vocês",
  primeday: "Para o PRIME DAY o Gringo Recomenda!!!",
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
  let response = await fetch(`content/${page}.md`);
  let isRenderedHtml = false;
  if (!response.ok) {
    response = await fetch(`content/${page}.html`);
    isRenderedHtml = response.ok;
  }
  if (!response.ok) throw new Error(`Unable to load content/${page}`);

  const source = await response.text();
  const documentData = isRenderedHtml
    ? {
        title: pageTitles[page],
        body: new DOMParser().parseFromString(source, "text/html").body.innerHTML,
        isHtml: true,
      }
    : parseMarkdownDocument(source);
  document.title = documentData.title;
  document.body.classList.add(`page-${page}`);
  document.querySelector("[data-title]").textContent = documentData.title;
  const contentRoot = document.querySelector("[data-content]");
  contentRoot.innerHTML = documentData.isHtml
    ? documentData.body
    : marked.parse(documentData.body);
  if (documentData.isHtml) {
    contentRoot.querySelectorAll("img[src^='assets/']").forEach((image) => {
      image.src = `../${image.getAttribute("src")}`;
    });
    contentRoot.querySelectorAll("a[href$='.html']").forEach((link) => {
      link.href = `../${link.getAttribute("href")}`;
    });
  }
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
