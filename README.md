# Sistema de Gestão de Água - Rio Grande

Protótipo front-end em HTML, CSS e JavaScript puro para demonstração do sistema de gestão de água e saneamento da cidade de Rio Grande - RS.

## 📁 Estrutura de Arquivos

```
frontend-agua-riogrande/
├── login.html          # Página de login
├── dashboard.html      # Dashboard principal
├──style.css      # Estilos CSS
├── js/
│   ├── login.js       # Lógica de login
│   └── dashboard.js   # Lógica do dashboard
└── README.md          # Este arquivo
```

## 🚀 Como Usar

1. **Abra o arquivo `login.html`** em seu navegador
2. **Faça login** com as credenciais:
   - **CPF**: `Admin`
   - **Senha**: `Admin`
   
   Ou use um dos usuários de teste:
   - CPF: `123.456.789-00` | Senha: `123456`

3. **Explore o dashboard** com as seguintes funcionalidades:
   - **Aba Mapa**: Visualize o status do abastecimento regiões de Rio Grande
   - **Aba Contas**: Veja suas contas e pague as pendentes
   - **Aba Avisos**: Acompanhe notificações e alertas do sistema

## ✨ Funcionalidades

### Login
- Autenticação por CPF e senha
- Validação de credenciais
- Mensagens de erro
- Formatação automática de CPF
- Redirecionamento automático se já estiver logado

### Dashboard
- **Mapa de Abastecimento**: 
  - Visualização de regiões de Rio Grande
  - Status codificado por cores (Normal, Intermitente, Sem Água, Manutenção)
  - Descrição detalhada de cada região

- **Gestão de Contas**:
  - Lista de contas de água
  - Informações de consumo e valores
  - Status (Pendente, Paga, Vencida)
  - Botão para pagar contas pendentes
  - Confirmação de pagamento

- **Notificações**:
  - Avisos gerais do sistema
  - Alertas de manutenção
  - Dicas de consumo consciente

### Design
- Interface responsiva (mobile e desktop)
- Tema azul água
- Animações suaves
- Ícones SVG
- Feedback visual em todas as interações

## 🎨 Personalização

### Cores
As cores principais estão definidas no CSS e podem ser facilmente alteradas:
- **Primária**: `#0891b2` (azul ciano)
- **Secundária**: `#0c4a6e` (azul escuro)
- **Fundo**: Gradiente de `#ecfeff` para `#dbeafe`

### Dados
Os dados são simulados e estão nos arquivos JavaScript:
- **Usuários**: `js/login.js`
- **Regiões**: `js/dashboard.js`
- **Contas**: `js/dashboard.js`
- **Notificações**: `js/dashboard.js`

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔒 Segurança

**ATENÇÃO**: Este é um protótipo para demonstração. Em produção, você deve:
- Implementar autenticação real no backend
- Usar HTTPS
- Criptografar senhas
- Validar dados no servidor
- Implementar proteção contra CSRF e XSS

## 👥 Equipe

Desenvolvido pela equipe **Four Elements** para o trabalho de Engenharia de Software.

## 📄 Licença

Este é um projeto acadêmico para fins de demonstração.
