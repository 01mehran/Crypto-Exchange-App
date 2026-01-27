export function handleDeleteButton({ li, list }) {
  li.querySelector(".delete-btn").addEventListener("click", () => {
    list.removeChild(li);
  });
}
