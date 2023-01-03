const nameInput = document.querySelector("#name");
const addressInput = document.querySelector("#address");
const createUserButton = document.querySelector("#create-user");
const usersList = document.querySelector("#users");

createUserButton.onclick = async () => {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();

  const res = await post("/users", { name, address });
  if (!res.ok) return console.log(`POST request failed`);

  const newElement = document.createElement("li");
  newElement.innerHTML = `${name} lives at ${address}`;

  usersList.appendChild(newElement);
};

async function get(url) {
  const res = await fetch(url);
  // OK
  if (res.status !== 200) return { ok: false };
  return { ok: true, ...(await res.json()) };
}

async function post(url, obj) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });
  // Created
  if (res.status !== 201) return { ok: false };
  return { ok: true, ...(await res.json()) };
}
