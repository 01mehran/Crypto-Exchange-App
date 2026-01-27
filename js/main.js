import { liTag } from "./liTag.js";
import { handleDeleteButton } from "./handleDeleteButton.js";
import { handleEdit } from "./handleEdit.js";

document.addEventListener("DOMContentLoaded", () => {
  const handleCryptoExchnange = async function () {
    // Sellect Elements;
    const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=";
    const crypto = document.getElementById("crypto-select").value;
    const amount = document.getElementById("token-amount").value;

    const loading = document.getElementById("loading");
    const list = document.getElementById("list");

    try {
      if (crypto && amount) {
        // ----------------------Show PreLoadindg;
        loading.style.display = "block";
        const res = await fetch(`${apiURL}${crypto}&vs_currencies=usd`);
        loading.style.display = "none";
        const data = await res.json();

        // Get Each Token's Price;
        const price = data[crypto].usd;

        // Calculate Total Price;
        const totalValue = price * amount;

        // Create li Tag;
        const liTextContext = liTag({ crypto, amount, price, totalValue });
        const li = document.createElement("li");
        li.innerHTML = liTextContext;

        list.appendChild(li);
        document.getElementById("token-amount").value = "";

        // Delete Button;
        handleDeleteButton({ li, list });

        // Edit Button
        const editButton = li.querySelector(".edit-btn");

        editButton.addEventListener("click", async () => {
          if (editButton.textContent === "Edit") {
            handleEdit({ li });

            editButton.textContent = "Save";
            editButton.style.backgroundColor = "green";
          } else if (editButton.textContent === "Save") {
            const div = li.firstElementChild;
            const select = div.querySelector("select");
            const input = div.querySelector("input[type='number']");

            const newCrypto = select.value;
            const newAmount = parseFloat(input.value);

            if (newCrypto && newAmount) {
              try {
                loading.style.display = "block";
                const res = await fetch(
                  `${apiURL}${newCrypto}&vs_currencies=usd`,
                );

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
        });
      }
    } catch (err) {
      console.error("Something went wrong", err.message);
    }
  };

  // Add Button;
  document.getElementById("add-btn").addEventListener("click", (e) => {
    e.preventDefault();
    handleCryptoExchnange();
  });
});
