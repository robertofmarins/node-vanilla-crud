interface Tecnologia {
    id: number;
    nome: string;
    nivel: string;
}

const API_URL = 'http://localhost:3000/api/dados';

async function carregarDados() {
    const res = await fetch(API_URL);
    const dados: Tecnologia[] = await res.json();
    const lista = document.getElementById('lista-tecs');
    if (!lista) return;

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
}

// Tornando as funções globais para o HTML acessar
(window as any).deletarTec = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarDados();
};

(window as any).prepararEdicao = (id: number, nome: string, nivel: string) => {
    (document.getElementById('nome') as HTMLInputElement).value = nome;
    (document.getElementById('nivel') as HTMLInputElement).value = nivel;
    (document.getElementById('btn-salvar') as HTMLButtonElement).innerText = "Atualizar";
    (document.getElementById('form-add') as any).dataset.editId = id;
};

document.getElementById('form-add')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as any;
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const nivel = (document.getElementById('nivel') as HTMLInputElement).value;
    const editId = form.dataset.editId;

    if (editId) {
        // Lógica de UPDATE
        await fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, nivel })
        });
        delete form.dataset.editId;
        (document.getElementById('btn-salvar') as HTMLButtonElement).innerText = "Adicionar";
    } else {
        // Lógica de CREATE
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, nivel })
        });
    }

    form.reset();
    carregarDados();
});

carregarDados();