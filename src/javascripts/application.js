import * as Turbo from "@hotwired/turbo"
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { Application } from "@hotwired/stimulus"
import LoadMoreController from "./../controllers/load_more_controller"

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()

import "./../controllers"
const application = Application.start()
application.register("load-more", LoadMoreController)

function wireLegalActions() {
  document.querySelectorAll("[data-legal-action]").forEach((el) => {
    if (el.dataset.legalWired === "1") return;
    el.dataset.legalWired = "1";
    el.addEventListener("click", async () => {
      const action = el.dataset.legalAction;
      if (action === "print" || action === "pdf") {
        window.print();
        return;
      }
      if (action === "copy_link") {
        try {
          await navigator.clipboard.writeText(window.location.href);
          el.classList.add("border-success");
          setTimeout(() => el.classList.remove("border-success"), 1200);
        } catch (e) {
          // fallback
          const input = document.createElement("input");
          input.value = window.location.href;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }
      }
    });
  });
}

document.addEventListener("turbo:load", () => {
  wireLegalActions();
});

wireLegalActions();
