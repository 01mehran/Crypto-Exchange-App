import { liTag } from "./liTag.js";
import { handleDeleteButton } from "./handleDeleteButton.js";
import { handleEdit } from "./handleEdit.js";
import { handleSave } from "./handleSave.js";
import { helper } from "./helper.js";

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

const cryptoo = document.getElementById("crypto-select");

cryptos.forEach((crp) => {
  const option = document.createElement("option");
  option.textContent = crp[0].toLocaleUpperCase() + crp.slice(1);
  option.value = crp;

  cryptoo.appendChild(option);
});

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-btn");

  const handleCryptoExchnange = async function () {
    // Sellect Elements;
    const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=";
    const crypto = document.getElementById("crypto-select").value;
    const amount = document.getElementById("token-amount").value;

    // const loading = document.getElementById("loading");
    const list = document.getElementById("list");

    try {
      if (crypto && amount) {
        // Show PreLoadindg;
        helper("block", "none", "60%", addButton);
        const res = await fetch(`${apiURL}${crypto}&vs_currencies=usd`);
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
