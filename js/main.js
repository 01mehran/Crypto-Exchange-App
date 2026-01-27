import { liTag } from "./liTag.js";
import { handleDeleteButton } from "./handleDeleteButton.js";
import { handleEdit } from "./handleEdit.js";
import { handleSave } from "./handleSave.js";

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
            handleEdit({ li, editButton });
          } else if (editButton.textContent === "Save") {
            handleSave({ li, apiURL, loading, editButton });
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
