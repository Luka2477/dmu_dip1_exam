const get = async (url) => {
  const res = await fetch(url);
  // OK
  if (res.status !== 200) return { ok: false, status: res.status };
  return { ok: true, ...(await res.json()) };
};

const post = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // Created
  if (res.status !== 201) return { ok: false, status: res.status };
  return { ok: true, ...(await res.json()) };
};

const patch = async (url, data) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // Created
  if (res.status !== 201) return { ok: false, status: res.status };
  return { ok: true, ...(await res.json()) };
};

const createContact = async () => {
  const name = document.querySelector("#name").value.trim();
  const phone = document.querySelector("#phone").value.trim();

  const res = await post("/contacts", { name, phone });
  if (!res.ok)
    return console.error("POST request failed: status " + res.status);

  const contactsList = document.querySelector("#contacts");
  const { contact } = res;

  const newListItem = document.createElement("li");
  newListItem.innerHTML = `${contact.id}, ${contact.name}, ${contact.phone} <a type="button" onclick="updateContact(${contact.id})">update phone</a>`;

  contactsList.appendChild(newListItem);
};

const updateContact = async (id) => {
  const phone = document.querySelector("#phone").value.trim();

  const res = await patch("/contacts", { id, phone });
  if (!res.ok)
    return console.error("PATCH request failed: status " + res.status);

  const contactsList = document.querySelector("#contacts");
  const { contact } = res;

  for (let contactElement of contactsList.children) {
    const currId = parseInt(contactElement.innerHTML.split(",")[0]);

    if (currId === id) {
      contactElement.innerHTML = `${contact.id}, ${contact.name}, ${contact.phone} <a type="button" onclick="updateContact(${contact.id})">update phone</a>`;
    }
  }
};
