class Contry extends HTMLElement {
  constructor() {
    super();

    const style = ``;

    const html = `<span></span>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    ${html}
    `;

    this.spanValue = this.shadowRoot.querySelector("span");
  }

  connectedCallback() {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length)
          this.spanValue.innerHTML = mutation.addedNodes[0].textContent;
      });
    });

    observer.observe(this, { childList: true });
  }
}

customElements.define("tag-country", Contry);
