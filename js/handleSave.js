export async function handleSave({ li, apiURL, loading, editButton }) {
  const div = li.firstElementChild;
  const select = div.querySelector("select");
  const input = div.querySelector("input[type='number']");

  const newCrypto = select.value;
  const newAmount = parseFloat(input.value);

  if (newCrypto && newAmount) {
    try {
      loading.style.display = "block";
      const res = await fetch(`${apiURL}${newCrypto}&vs_currencies=usd`);

      const data = await res.json();
      const newPrice = data[newCrypto].usd;
      const newTotalValue = newPrice * newAmount;

      // Update the display
      const newP = document.createElement("p");
      newP.innerHTML = `Crypto name : `;

      const newSpan = document.createElement("span");
      newSpan.className = "crypto-name";
      newSpan.textContent =
        newCrypto.charAt(0).toUpperCase() + newCrypto.slice(1);

      newP.appendChild(newSpan);

      div.insertBefore(newP, select);
      div.removeChild(select);

      const tokenAmountSpan = document.createElement("span");
      tokenAmountSpan.className = "token-amount";
      tokenAmountSpan.textContent = newAmount;
      input.replaceWith(tokenAmountSpan);

      li.querySelector(".token-price").textContent = `$${newPrice};`;
      li.querySelector(".total-price").textContent =
        `$${newTotalValue.toFixed(2)}`;

      editButton.textContent = "Edit";
      editButton.style.backgroundColor = "";
    } catch (err) {
      console.error("Something went wrong", err.message);
    } finally {
      loading.style.display = "none";
    }
  }
}
