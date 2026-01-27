export function handleEdit({ li, editButton }) {
  const div = li.firstElementChild;
  const p = div.firstElementChild;
  const span = li.querySelector(".crypto-name");
  const tokenAmount = li.querySelector(".token-amount");

  // Create Select;
  const select = document.createElement("select");
  select.id = "crypto-select-edit";

  const options = [
    "bitcoin",
    "ripple",
    "litecoin",
    "ethereum",
    "stellar",
    "cardano",
    "bitcoin-cash",
    "polkadot",
    "chainlink",
    "dogecoin",
  ];

  options.forEach((opt) => {
    const option = document.createElement("option");

    option.value = opt;
    option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
    if (opt === span.textContent.toLowerCase()) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  div.insertBefore(select, p);
  div.removeChild(p);

  // -------------- Input;
  const input = document.createElement("input");
  input.type = "number";
  input.value = tokenAmount.textContent;
  tokenAmount.replaceWith(input);

  editButton.textContent = "Save";
  editButton.style.backgroundColor = "green";
}
