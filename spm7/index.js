async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.json();
}

const clearQuotes = () => {
  const resultDiv = document.querySelector("#result");
  resultDiv.innerHTML = "";
};

const clearTags = () => {
  const tagsDiv = document.querySelector("#tags");
  tagsDiv.innerHTML = "";
};

const addQuote = (quote) => {
  const resultDiv = document.querySelector("#result");

  const newEl = document.createElement("blockquote");
  newEl.innerHTML = quote;

  resultDiv.appendChild(newEl);
};

const addTags = (tags) => {
  const tagsDiv = document.querySelector("#tags");

  tagsDiv.innerHTML = tagsDiv.innerHTML
    ? tagsDiv.innerHTML + ", " + tags.join(", ")
    : tags.join(", ");
};

const showError = (error) => {
  const resultDiv = document.querySelector("#result");

  resultDiv.innerHTML = "ERROR: " + error.message;
};

const newQuotes = () => {
  Promise.all([
    get("https://www.tronalddump.io/random/quote"),
    get("https://www.tronalddump.io/random/quote"),
    get("https://www.tronalddump.io/random/quote"),
  ])
    .then((quotes) => {
      clearQuotes();
      clearTags();

      for (let quote of quotes) {
        addQuote(quote.value);
        addTags(quote.tags);
      }
    })
    .catch((err) => showError(err));
};

newQuotes();
