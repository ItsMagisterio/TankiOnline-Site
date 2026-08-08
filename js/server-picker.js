(function () {
  "use strict";

  function initServerPicker() {
    var picker = document.querySelector(".server-picker");
    if (!picker) return;

    var control = picker.querySelector(".server-picker__control");
    var number = picker.querySelector(".server-picker__number");
    var options = picker.querySelectorAll(".server-picker__option");

    function updateSelectedServer(option) {
      number.textContent = option.getAttribute("data-server");
      Array.prototype.forEach.call(options, function (item) {
        var selected = item === option;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
      });
    }

    function closePicker() {
      picker.classList.remove("is-open");
      control.setAttribute("aria-expanded", "false");
    }

    control.setAttribute("role", "button");
    control.setAttribute("tabindex", "0");
    control.setAttribute("aria-expanded", "false");

    control.addEventListener("click", function () {
      var isOpen = picker.classList.toggle("is-open");
      control.setAttribute("aria-expanded", String(isOpen));
    });

    control.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        control.click();
      }
      if (event.key === "Escape") closePicker();
    });

    Array.prototype.forEach.call(options, function (option) {
      option.addEventListener("click", function () {
        updateSelectedServer(option);
        closePicker();
      });
    });

    document.addEventListener("click", function (event) {
      if (!picker.contains(event.target)) closePicker();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServerPicker);
  } else {
    initServerPicker();
  }
})();