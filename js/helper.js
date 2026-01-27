const crypto = document.getElementById("crypto-select");
const amount = document.getElementById("token-amount");
const loading = document.getElementById("loading");

export function helper(display, pinter, opacity, addButton) {
  loading.style.display = display;

  crypto.style.pointerEvents = pinter;
  crypto.style.opacity = opacity;

  amount.style.pointerEvents = pinter;
  amount.style.opacity = opacity;

  addButton.style.pointerEvents = pinter;
  addButton.style.opacity = opacity;
}
