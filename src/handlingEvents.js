export function editHandler() {
  const editButtons = document.querySelectorAll(".btn-danger");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // const itemId = btn.getAttribute('data-id');
      const dropdownMenu = btn.closest('tr').querySelector('.dropdown-menu');

      dropdownMenu.classList.toggle('show');
    })
  })
};

export function handleDropdownValue() {
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const newValue = item.getAttribute('data-value');
      const dropdownButton = item.closest('.dropdown').querySelector('.dropdown-toggle');
      const dropdownMenu = this.closest('.dropdown-menu');

      dropdownButton.textContent = newValue;

      let newClass;
      switch (newValue) {
        case "В пути":
          newClass = "btn-primary";
          break;
        case "Ожидает отправки":
          newClass = "btn-warning";
          break;
        case "Доставлен":
          newClass = "btn-success";
          break;
      }

      dropdownButton.classList.remove("btn-success", "btn-warning", "btn-primary", "btn-secondary");
      dropdownButton.classList.add(newClass);

      updateDropdownItems(dropdownMenu, newValue)
      dropdownMenu.classList.remove('show');
    });
  });
}

function updateDropdownItems(dropdownMenu, selectedValue) {
  const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

  dropdownItems.forEach(item => {
    if (item.getAttribute('data-value') === selectedValue) {
      item.style.display = 'none';  // Hide the selected option
    } else {
      item.style.display = '';  // Show the remaining options
    }
  });
}
