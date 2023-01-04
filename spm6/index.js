async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.json();
}

async function post(url, objekt) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objekt),
    headers: { "Content-Type": "application/json" },
  });
  if (respons.status !== 201)
    // Created
    throw new Error(respons.status);
  return await respons.text();
}

const setTags = (tags) => {
  const tagsDiv = document.querySelector("#tags");

  for (let tag of tags) {
    const newTag = document.createElement("a");
    newTag.type = "button";
    newTag.onclick = () => getQuotesByTag(tag);
    newTag.innerHTML = tag;

    tagsDiv.innerHTML = "";
    tagsDiv.appendChild(newTag);
  }
};

const clearQuotes = () => {
  const quotesDiv = document.querySelector("#quotes");
  quotesDiv.innerHTML = "";
};

const addQuotes = (quotes) => {
  const quotesDiv = document.querySelector("#quotes");

  for (let quote of quotes) {
    const blockquote = document.createElement("blockquote");
    blockquote.innerHTML = quote.value;

    quotesDiv.appendChild(blockquote);
  }
};

const addQuote = (quote) => {
  const quotesDiv = document.querySelector("#quotes");

  const blockquote = document.createElement("blockquote");
  blockquote.innerHTML = quote.value;

  quotesDiv.appendChild(blockquote);
};

const getQuotesByTag = async (tag) => {
  let res = await get(`https://www.tronalddump.io/search/quote?tag=${tag}`);

  clearQuotes();
  while (res.count !== 0) {
    addQuotes(res._embedded.quotes);
    res = await get(res._links.next.href);
  }
};

const newQuote = async () => {
  const res = await get("https://www.tronalddump.io/random/quote");

  clearQuotes();
  addQuote(res);

  setTags(res.tags);
};

newQuote();
