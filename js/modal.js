class CountryModal extends HTMLElement {
  static get observedAttributes() {
    return ["for"];
  }
  constructor() {
    super();
    this.nameFor = "";

    const style = `
    #open-modal{
      color: #91d5ff;
    }
    #text-country{
      margin: 0px;
    }
    .modal {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: none;
      position: fixed;
      overflow: auto;
      transition: display 5s;
      padding-top: 100px;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content {
      width: 40%;
      margin: auto;
      border: 1px solid #888;
      padding: 20px;
      background-color: #fefefe;
      border-radius: 9px 9px 9px 9px;
      -moz-border-radius: 9px 9px 9px 9px;
      -webkit-border-radius: 9px 9px 9px 9px;
    }
    #close-modal {
      color: #f5222d;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: #000;
      cursor: pointer;
      text-decoration: none;
    }
    `;

    const html = `
    <div id="open-modal">
      <p id="text-country"></p>
    </div>
    <div id="component-modal" class="modal">
      <div class="modal-content">
        <span id="close-modal">&times;</span>
        <p id="continent"></p>
      </div>
    </div>
   `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      ${style}
    </style>
    ${html}
    `;

    this.continent = this.shadowRoot.getElementById("continent");
    this.open_modal = this.shadowRoot.querySelector("#open-modal");
    this.close_modal = this.shadowRoot.getElementById("close-modal");
    this.nameCountry = this.shadowRoot.querySelector("#text-country");
    this.component_modal = this.shadowRoot.getElementById("component-modal");
  }

  connectedCallback() {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.length
          ? (this.nameCountry.innerHTML = mutation.addedNodes[0].textContent)
          : "";
        let objContinents = {
          pe: "Perú, Pertenece a LATAM.",
          cl: "Chile, Pertenece a LATAM.",
          pa: "Panamá, Pertenecea LATAM.",
          bo: "Bolivia, Pertene a LATAM.",
          br: "Brasíl, Pertenece a LATAM.",
          ec: "Ecuador, Pertenece a LATAM.",
          uy: "Uruguay, Pertenece a LATAM.",
          co: "Colombia, Pertenece a LATAM.",
          py: "Paraguay, Pertenece a LATAM.",
          ve: "Venezuela, Pertenece a LATAM.",
          sv: "El Salvador, Pertenece a LATAM.",
          am: "Alemania, No Pertenece a LATAM.",
          [null || undefined || ""]: "Sin Asignación",
        };
        this.continent.innerText = objContinents[this.nameFor];
      });
    });

    observer.observe(this, { childList: true });

    this.open_modal.addEventListener("click", (e) => {
      this.component_modal.style.display = "block";
    });

    this.close_modal.addEventListener("click", (e) => {
      this.component_modal.style.display = "none";
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.nameFor = newValue;
  }

  disconnectedCallback() {
    this.open_modal.addEventListener("click", () => {});
    this.close_modal.addEventListener("click", () => {});
  }
}
customElements.define("country-modal", CountryModal);
