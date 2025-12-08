// Dados de login (simulado)
const usuarios = {
    'Admin': {
        senha: 'Admin',
        nome: 'Administrador',
        tipo: 'admin'
    },
    '123.456.789-00': {
        senha: '123456',
        nome: 'João Silva',
        tipo: 'cliente'
    }
};

// Evento de submit do formulário
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('senha').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Verificar credenciais
    if (usuarios[cpf] && usuarios[cpf].senha === senha) {
        // Login bem-sucedido
        const usuario = usuarios[cpf];
        
        // Salvar dados do usuário no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify({
            cpf: cpf,
            nome: usuario.nome,
            tipo: usuario.tipo
        }));
        
        // Redirecionar para o dashboard
        window.location.href = 'index.html';
    } else {
        // Login falhou
        errorMessage.textContent = 'CPF ou senha incorretos. Tente: Admin / Admin';
        errorMessage.style.display = 'block';
        
        // Limpar mensagem de erro após 5 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
});

// Verificar se já está logado
window.addEventListener('load', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = 'index.html';
    }
});

// Formatação automática de CPF (opcional)
// document.getElementById('cpf').addEventListener('input', function(e) {
//     let value = e.target.value.replace(/\D/g, '');
    
//     if (value.length <= 11) {
//         value = value.replace(/(\d{3})(\d)/, '$1.$2');
//         value = value.replace(/(\d{3})(\d)/, '$1.$2');
//         value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
//         e.target.value = value;
//     }
// });
