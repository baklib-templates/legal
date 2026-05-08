import { Controller } from "@hotwired/stimulus";

function slugify(text) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export default class extends Controller {
  static targets = ["links"];

  connect() {
    this.contentEl = document.querySelector('[data-toc-scope="true"]');
    if (!this.contentEl || !this.hasLinksTarget) return;

    this.build();
    this.observe();
  }

  disconnect() {
    if (this.observer) this.observer.disconnect();
  }

  build() {
    const headings = Array.from(
      this.contentEl.querySelectorAll("h2, h3")
    ).filter((h) => (h.textContent || "").trim().length > 0);

    if (headings.length === 0) {
      this.element.classList.add("hidden");
      return;
    }

    const used = new Map();
    const items = headings.map((h) => {
      const level = h.tagName.toLowerCase() === "h3" ? 3 : 2;
      const base = slugify(h.textContent);
      let id = h.id || base || `sec-${Math.random().toString(36).slice(2)}`;
      const n = used.get(id) || 0;
      used.set(id, n + 1);
      if (n > 0) id = `${id}-${n + 1}`;
      h.id = id;
      return { id, text: h.textContent.trim(), level };
    });

    this.linksTarget.innerHTML = items
      .map((it) => {
        const indent = it.level === 3 ? "pl-3" : "";
        return `
          <a href="#${it.id}"
             class="toc-link block ${indent} text-slate-600 hover:text-slate-900"
             data-toc-id="${it.id}">
            ${it.text}
          </a>`;
      })
      .join("");

    this.links = Array.from(this.linksTarget.querySelectorAll(".toc-link"));
  }

  observe() {
    const headings = Array.from(this.contentEl.querySelectorAll("h2, h3")).filter(
      (h) => h.id
    );
    if (headings.length === 0) return;

    const setActive = (id) => {
      this.links.forEach((a) => {
        const active = a.dataset.tocId === id;
        a.classList.toggle("font-semibold", active);
        a.classList.toggle("text-slate-900", active);
      });
    };

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] }
    );

    headings.forEach((h) => this.observer.observe(h));
  }
}

