const regioes = [
  { nome: "Centro", status: "normal", descricao: "Abastecimento normal", lat: -32.0350545, lng: -52.09838 },
  { nome: "Cassino", status: "normal", descricao: "Abastecimento normal", lat: -32.1917, lng: -52.1583 },
  { nome: "Quinta", status: "intermitente", descricao: "Abastecimento intermitente", lat: -32.072530, lng: -52.260135 },
  { nome: "Parque Marinha", status: "normal", descricao: "Abastecimento normal", lat: -32.0969, lng: -52.1796 },
  { nome: "Torotama", status: "normal", descricao: "Abastecimento normal", lat: -31.928745, lng: -52.184838 },
  { nome: "Santa Rosa", status: "normal", descricao: "Abastecimento normal", lat: -32.082126, lng: -52.193651 }
];




const contas = [
    { id: 1, mesReferencia: "2024-11", valor: 8750, consumo: 12500, status: "paga", dataVencimento: "2024-11-10", dataPagamento: "2024-11-08" },
    { id: 2, mesReferencia: "2024-12", valor: 9200, consumo: 13100, status: "pendente", dataVencimento: "2024-12-10", dataPagamento: null },
    { id: 3, mesReferencia: "2025-01", valor: 8500, consumo: 12000, status: "pendente", dataVencimento: "2025-01-10", dataPagamento: null }
];

const notificacoes = [
    { id: 1, tipo: "geral", titulo: "Bem-vindo ao Sistema de Gestão de Água", mensagem: "Sistema de gestão de água e saneamento de Rio Grande está agora disponível para todos os cidadãos.", data: "2024-12-01" },
    { id: 2, tipo: "manutencao", titulo: "Manutenção Programada - Vila da quinta", mensagem: "Haverá manutenção preventiva na região da Quinta no dia 15/12. O abastecimento pode ser intermitente durante o período.", data: "2024-12-05" },
    { id: 3, tipo: "alerta", titulo: "Consumo Consciente", mensagem: "Evite desperdícios! Pequenas atitudes fazem grande diferença na preservação dos recursos hídricos.", data: "2024-12-03" },
    { id: 4, tipo: "alerta", titulo: "Sim", mensagem: "Agradecemos a todos pela apresentação. A partir de agr sua respiração automatica esta desligada, Kratos darksouls", data: "2024-12-03" }
];

function verificarAutenticacao() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(usuarioLogado);
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}

function showTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
}

function formatarMoeda(centavos) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}

function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

function renderizarContas() {
    const contasList = document.getElementById('contasList');
    if (contas.length === 0) {
        contasList.innerHTML = '<div class="empty-state">Nenhuma conta encontrada</div>';
        return;
    }
    contasList.innerHTML = contas.map(conta => `
        <div class="conta-item">
            <div class="conta-info">
                <h3>Referência: ${conta.mesReferencia}</h3>
                <p>Consumo: ${conta.consumo.toLocaleString('pt-BR')} litros</p>
                <p>Vencimento: ${formatarData(conta.dataVencimento)}</p>
                ${conta.dataPagamento ? `<p>Pago em: ${formatarData(conta.dataPagamento)}</p>` : ''}
            </div>
            <div class="conta-actions">
                <div class="conta-valor">
                    <div class="valor">${formatarMoeda(conta.valor)}</div>
                    <span class="badge ${conta.status}">${conta.status}</span>
                </div>
                ${conta.status === 'pendente' ? `<button class="btn-pagar" onclick="pagarConta(${conta.id})">Pagar</button>` : ''}
            </div>
        </div>
    `).join('');
}

function pagarConta(contaId) {
    const conta = contas.find(c => c.id === contaId);
    if (!conta) return;
    if (confirm(`Confirma o pagamento de ${formatarMoeda(conta.valor)}?`)) {
        conta.status = 'paga';
        conta.dataPagamento = new Date().toISOString().split('T')[0];
        renderizarContas();
        alert('Pagamento realizado com sucesso!');
    }
}

function renderizarNotificacoes() {
    const notificacoesList = document.getElementById('notificacoesList');
    if (notificacoes.length === 0) {
        notificacoesList.innerHTML = '<div class="empty-state">Nenhuma notificação no momento</div>';
        return;
    }
    notificacoesList.innerHTML = notificacoes.map(notif => `
        <div class="notificacao-item">
            <div class="notificacao-header">
                <h3>${notif.titulo}</h3>
                <span class="notificacao-tipo">${notif.tipo}</span>
            </div>
            <p>${notif.mensagem}</p>
            <div class="notificacao-data">${formatarData(notif.data)}</div>
        </div>
    `).join('');
}

window.addEventListener('load', function() {
    const usuario = verificarAutenticacao();
    if (!usuario) return;
    document.getElementById('welcomeMessage').textContent = `Bem-vindo, ${usuario.nome}!`;
    renderMapa();
    renderizarContas();
    renderizarNotificacoes();
});

function renderMapa() {
    const map = L.map('map').setView([-32.0349, -52.0975], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    regioes.forEach(r => {
        const cor = r.status === 'normal' ? '#10b981'
                  : r.status === 'intermitente' ? '#f59e0b'
                  : r.status === 'sem-agua' ? '#ef4444'
                  : '#3b82f6';
        L.circleMarker([r.lat, r.lng], {
            radius: 8,
            fillColor: cor,
            color: cor,
            weight: 1,
            fillOpacity: 0.7
        }).bindPopup(`<strong>${r.nome}</strong><br>${r.descricao}`).addTo(map);
    });
}
