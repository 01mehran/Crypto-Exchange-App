export function liTag({ crypto, amount, price, totalValue }) {
  return `
      <div>
        <p> Crypto name : <span class="crypto-name">${
          crypto.charAt(0).toUpperCase() + crypto.slice(1)
        }</span></p>
        <p> Token amount: <span class="token-amount">${amount}</span></p>
        <p> Each token price: <span class="token-price">$${price}</span></p>
        <p>Total price : <span class="total-price">$${totalValue.toFixed(
          2,
        )}</span> </p>
      </div>

      <div class="btnCo">
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
      </div>
        `;
}
