class FormBuilderPedra {
    constructor() {
        this.languageSystem = window.languageSystem;
        this.init();
    }

    async init() {
        await this.buildForm();
        this.setupEventListeners();
    }

    async buildForm() {
        const formContainer = document.getElementById("form-container");
        if (!formContainer) {
            console.error("Container do formulário não encontrado");
            return;
        }

        formContainer.innerHTML = "";
        formContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

        // Obter traduções do sistema
        const t = this.languageSystem.getTranslations('form');

        const campos = [
            {
                label: t.tier,
                tipo: "select",
                id: "tier",
                options: ["T2", "T3", "T4", "T5", "T6", "T7", "T8", t.todos_beta || "Todos (BETA)"],
                values: [2, 3, 4, 5, 6, 7, 8, "all"],
                selected: 2
            },
            {
                label: t.encantamento,
                tipo: "select",
                id: "encantamento",
            },
            {
                label: t.cidadeCompra,
                tipo: "select",
                id: "cidadeCompra",
                options: ["Bridgewatch", "Fort Sterling", "Lymhurst", "Martlock", "Thetford", "Caerleon", "Brecilien"]
            },
            {
                label: t.cidadeVenda,
                tipo: "select",
                id: "cidadeVenda",
                options: ["Bridgewatch", "Fort Sterling", "Lymhurst", "Martlock", "Thetford", "Caerleon", "Brecilien"]
            },
            {
                label: t.quantidade,
                tipo: "number",
                id: "quantidade",
                value: "1",
                min: "1"
            },
            {
                label: t.taxaImposto,
                tipo: "number",
                id: "taxaImposto",
                value: "0",
                min: "0"
            },
            {
                label: t.taxaRetorno,
                tipo: "number",
                id: "taxaRetorno",
                value: "53.9",
                min: "0",
                max: "100",
                step: "0.1"
            }
        ];

        campos.forEach(campo => {
            const fieldDiv = document.createElement("div");
            fieldDiv.className = "space-y-2";

            const label = document.createElement("label");
            label.className = "block text-gray-300 font-medium";
            label.textContent = campo.label;
            label.htmlFor = campo.id;

            let input;
            if (campo.tipo === "select") {
                input = document.createElement("select");
                input.className = "w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500";
                input.id = campo.id;
                input.name = campo.id;

                if (campo.id !== "encantamento") {
                    campo.options.forEach((optionText, i) => {
                        const option = document.createElement("option");
                        option.value = campo.values ? campo.values[i] : optionText;
                        option.textContent = optionText;
                        if (campo.selected !== undefined && campo.values[i] === campo.selected) {
                            option.selected = true;
                        }
                        input.appendChild(option);
                    });
                }

                if (campo.id === "tier") {
                    input.addEventListener("change", (e) => {
                        this.atualizarEncantamentos(parseInt(e.target.value));
                    });
                }
            } else {
                input = document.createElement("input");
                input.type = campo.tipo;
                input.className = "w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500";
                input.id = campo.id;
                input.name = campo.id;
                if (campo.value) input.value = campo.value;
                if (campo.min) input.min = campo.min;
                if (campo.max) input.max = campo.max;
                if (campo.step) input.step = campo.step;
            }

            fieldDiv.appendChild(label);
            fieldDiv.appendChild(input);
            formContainer.appendChild(fieldDiv);
        });

        const tierInicial = parseInt(document.getElementById("tier").value);
        this.atualizarEncantamentos(tierInicial);
        this.addCalculateButton();
    }

    atualizarEncantamentos(tier) {
        const encantamentoSelect = document.getElementById("encantamento");
        if (!encantamentoSelect) return;

        encantamentoSelect.innerHTML = '';
        const t = this.languageSystem.getTranslations('form');

        if (tier === 2 || tier === 3 || tier == "all") {
            const option = document.createElement("option");
            option.value = 0;
            option.textContent = "0";
            option.selected = true;
            encantamentoSelect.appendChild(option);

            if (tier == "all") {
                const warning = document.createElement("div");
                warning.className = "mt-2 text-yellow-400 text-sm";
                warning.textContent = t.aviso_todos_tiers || "Encantamento aplicado apenas para T4+";
                encantamentoSelect.parentNode.appendChild(warning);
            }
        } else {
            [0, 1, 2, 3, 4].forEach(value => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value.toString();
                if (value === 0) option.selected = true;
                encantamentoSelect.appendChild(option);
            });
        }
    }

    addCalculateButton() {
        const formContainer = document.getElementById("form-container");
        if (!formContainer) return;

        const t = this.languageSystem.getTranslations('form');

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "flex items-end";

        const button = document.createElement("button");
        button.className = "w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 transform hover:scale-105";
        button.innerHTML = `<i class="fas fa-calculator mr-2"></i>${t.calcular}`;
        button.type = "button";
        button.onclick = () => {
            const tier = document.getElementById('tier').value;
            if (tier === "all") {
                if (typeof calcularall === 'function') {
                    calcularall();
                } else {
                    console.error("Função calcularall não encontrada");
                }
            } else {
                if (typeof calcular === 'function') {
                    calcular();
                } else {
                    console.error("Função calcular não encontrada");
                }
            }
        };

        buttonDiv.appendChild(button);
        formContainer.appendChild(buttonDiv);
    }

    setupEventListeners() {
        document.addEventListener('languageChanged', () => {
            this.buildForm();
        });
    }
}

// Inicialização com fallback seguro
document.addEventListener("DOMContentLoaded", () => {
    const initFormBuilder = () => {
        try {
            new FormBuilderPedra();
        } catch (error) {
            console.error("Erro ao iniciar FormBuilder:", error);
            // Fallback extremo - mostra formulário básico
            const container = document.getElementById("form-container");
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-red-500">
                        <p>Erro ao carregar o formulário. Recarregue a página.</p>
                        <button onclick="window.location.reload()" class="mt-2 px-4 py-2 bg-red-600 rounded">
                            Recarregar
                        </button>
                    </div>
                `;
            }
        }
    };

    if (window.languageSystem) {
        initFormBuilder();
    } else {
        const timeout = setTimeout(() => {
            console.warn("Timeout - Iniciando com fallback de traduções");
            window.languageSystem = {
                getTranslations: () => ({
                    tier: "Tier",
                    encantamento: "Encantamento",
                    cidadeCompra: "Cidade de Compra",
                    cidadeVenda: "Cidade de Venda",
                    quantidade: "Quantidade",
                    taxaImposto: "Taxa de Imposto",
                    taxaRetorno: "Taxa de Retorno",
                    calcular: "Calcular"
                })
            };
            initFormBuilder();
        }, 2000);

        document.addEventListener('languageSystemReady', () => {
            clearTimeout(timeout);
            initFormBuilder();
        });
    }
});