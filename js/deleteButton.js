export function deleteButton({ li, list }) {
  li.querySelector(".delete-btn").addEventListener("click", () => {
    list.removeChild(li);
  });
}
