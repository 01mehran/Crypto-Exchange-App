export function handleEdit({ li }) {
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
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
    if (option === span.textContent.toLowerCase()) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  div.insertBefore(select, p);
  div.removeChild(p);

  // -------------- Input;
  const input = document.createElement("input");
  input.type = "number";
  input.value = tokenAmount.textContent;
  tokenAmount.replaceWith(input);
}
