document.addEventListener("DOMContentLoaded", () => {
  const clac = async function () {
    // ----------------Sellect Elements;
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
        // ----------------------Get Each Token's Price;
        const price = data[crypto].usd;

        // ----------------------Calculate Total Price;
        const totalValue = price * amount;

        // ----------------------Create li Tag;
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
             <p> Crypto name : <span class="crypto-name">${
               crypto.charAt(0).toUpperCase() + crypto.slice(1)
             }</span></p>
              <p> Token amount: <span class="token-amount">${amount}</span></p>
             <p> Each token price: <span class="token-price">$${price}</span></p>
               <p>Total price : <span class="total-price">$${totalValue.toFixed(
                 2
               )}</span> </p>
            </div>

            <div class="btnCo">
              <button class="delete-btn">Delete</button>
              <button class="edit-btn">Edit</button>
            </div>`;

        // ---------------------Add 'li' Tag To Ul;
        list.appendChild(li);

        document.getElementById("token-amount").value = "";

        //--------------------- Delete Button;
        li.querySelector(".delete-btn").addEventListener("click", () => {
          list.removeChild(li);
        });

        // ---------------------Edit Button
        const editButton = li.querySelector(".edit-btn");

        editButton.addEventListener("click", async () => {
          if (editButton.textContent === "Edit") {
            const div = li.firstElementChild;
            const p = div.firstElementChild;
            const span = li.querySelector(".crypto-name");
            const tokenAmount = li.querySelector(".token-amount");

            //--------------------- Creat Select;
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
              opt.textContent =
                option.charAt(0).toUpperCase() + option.slice(1);
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
                  `${apiURL}${newCrypto}&vs_currencies=usd`
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
                li.querySelector(
                  ".total-price"
                ).textContent = `$${newTotalValue.toFixed(2)}`;

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
    clac();
  });
});
// ----------------------------------------------------------2----
