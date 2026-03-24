// components;
import { liTag } from "./liTag.js";
import { handleDeleteButton } from "./handleDeleteButton.js";
import { handleEdit } from "./handleEdit.js";
import { handleSave } from "./handleSave.js";
import { helper } from "./helper.js";

// elements;
import { addButton, amount, crypto_select, list } from "./dom.js";

const cryptos = [
  "ripple",
  "litecoin",
  "ethereum",
  "stellar",
  "cardano",
  "bitcoin",
  "polkadot",
  "chainlink",
  "dogecoin",
];

cryptos.forEach((crp) => {
  const option = document.createElement("option");
  option.textContent = crp.charAt(0).toUpperCase() + crp.slice(1);
  option.value = crp;

  crypto_select.appendChild(option);
});

document.addEventListener("DOMContentLoaded", () => {
  const handleCryptoExchnange = async function () {
    const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=";
    const selectedCrypto = crypto_select.value;

    try {
      if (selectedCrypto && amount) {
        // Show PreLoadindg;
        helper("block", "none", "60%", addButton);
        const res = await fetch(`${apiURL}${selectedCrypto}&vs_currencies=usd`);
        const data = await res.json();

        // Get Each Token's Price;
        const price = data[selectedCrypto].usd;

        // Calculate Total Price;
        const totalValue = price * amount;

        // Create li Tag;
        const liTextContext = liTag({
          selectedCrypto,
          amount,
          price,
          totalValue,
        });
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
            handleEdit({ li, editButton });
          } else if (editButton.textContent === "Save") {
            handleSave({ li, apiURL, loading, editButton });
          }
        });
      }
    } catch (err) {
      console.error("Something went wrong", err.message);
    } finally {
      helper("none", "visible", "100%", addButton);
    }
  };

  // Add Button;
  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    handleCryptoExchnange();
  });
});
