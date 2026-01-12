var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const API_URL = 'http://localhost:3000/api/dados';
function carregarDados() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL);
        const dados = yield res.json();
        const lista = document.getElementById('lista-tecs');
        if (!lista)
            return;
        lista.innerHTML = dados.map(tec => `
    <li class="card-tec">
        <div class="info-tec">
            <strong>${tec.nome}</strong> 
            <span>${tec.nivel}</span>
        </div>
        <div class="acoes">
            <button class="btn-edit" onclick="prepararEdicao(${tec.id}, '${tec.nome}', '${tec.nivel}')">✏️</button>
            <button class="btn-delete" onclick="deletarTec(${tec.id})">❌</button>
        </div>
    </li>
`).join('');
    });
}
// Tornando as funções globais para o HTML acessar
window.deletarTec = (id) => __awaiter(this, void 0, void 0, function* () {
    yield fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarDados();
});
window.prepararEdicao = (id, nome, nivel) => {
    document.getElementById('nome').value = nome;
    document.getElementById('nivel').value = nivel;
    document.getElementById('btn-salvar').innerText = "Atualizar";
    document.getElementById('form-add').dataset.editId = id;
};
(_a = document.getElementById('form-add')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    const form = e.target;
    const nome = document.getElementById('nome').value;
    const nivel = document.getElementById('nivel').value;
    const editId = form.dataset.editId;
    if (editId) {
        // Lógica de UPDATE
        yield fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, nivel })
        });
        delete form.dataset.editId;
        document.getElementById('btn-salvar').innerText = "Adicionar";
    }
    else {
        // Lógica de CREATE
        yield fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, nivel })
        });
    }
    form.reset();
    carregarDados();
}));
carregarDados();
