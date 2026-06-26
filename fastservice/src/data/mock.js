// Dados de demonstração. Quando a API real estiver integrada (VITE_API_URL),
// a camada em src/lib/api.js passa a buscar do backend; estes dados servem de fallback.

export const SERVICES = [
  {
    id: "limpeza",
    name: "Limpeza",
    tagline: "Residencial",
    rating: 4.9,
    jobs: 320,
    price: 120,
    icon: "Sparkles",
    desc: "Limpeza completa de ambientes com profissionais avaliados e produtos inclusos.",
    includes: [
      "Limpeza de cômodos e banheiros",
      "Produtos e equipamentos",
      "Profissional verificado",
      "Garantia de satisfação",
    ],
    eta: "Hoje, a partir das 13h",
  },
  {
    id: "montagem",
    name: "Montagem",
    tagline: "Móveis e instalações",
    rating: 4.7,
    jobs: 280,
    price: 95,
    icon: "Hammer",
    desc: "Montagem e instalação de móveis e suportes com ferramentas próprias e acabamento incluso.",
    includes: [
      "Montagem de móveis em geral",
      "Instalação de suportes e prateleiras",
      "Ferramentas inclusas",
      "Acabamento garantido",
    ],
    eta: "Amanhã, a partir das 9h",
  },
  {
    id: "manutencao",
    name: "Manutenção",
    tagline: "Elétrica e hidráulica",
    rating: 4.8,
    jobs: 480,
    price: 90,
    icon: "Wrench",
    desc: "Reparos elétricos e hidráulicos com diagnóstico rápido e atendimento no mesmo dia.",
    includes: [
      "Diagnóstico incluso",
      "Troca de tomadas e disjuntores",
      "Reparo de vazamentos",
      "Atendimento no mesmo dia",
    ],
    eta: "Hoje, a partir das 14h",
  },
  {
    id: "pintura",
    name: "Pintura",
    tagline: "Paredes e ambientes",
    rating: 4.6,
    jobs: 140,
    price: 150,
    icon: "PaintRoller",
    desc: "Pintura de paredes e ambientes com preparo de superfície e acabamento profissional.",
    includes: [
      "Preparo e proteção do ambiente",
      "Tinta e materiais inclusos",
      "Acabamento uniforme",
      "Limpeza ao final",
    ],
    eta: "Esta semana",
  },
  {
    id: "jardinagem",
    name: "Jardinagem",
    tagline: "Jardins e gramados",
    rating: 4.7,
    jobs: 95,
    price: 80,
    icon: "Trees",
    desc: "Poda, corte de grama e cuidado de plantas com equipamentos inclusos.",
    includes: [
      "Corte e aparo de grama",
      "Poda de plantas e arbustos",
      "Recolhimento de resíduos",
      "Equipamentos inclusos",
    ],
    eta: "Esta semana",
  },
];

export const PROFESSIONALS = {
  montagem: { name: "Diego Souza", initials: "DS", color: "#5b4fe9", rating: 4.8 },
  limpeza: { name: "Ana Paula Reis", initials: "AR", color: "#15a85a", rating: 4.9 },
  manutencao: { name: "Carlos Mendes", initials: "CM", color: "#f0a020", rating: 4.8 },
};

export const HISTORY = [
  { id: "h1", service: "Eletricista", date: "12 jun 2025", status: "Concluído", price: 120, icon: "Zap" },
  { id: "h2", service: "Limpeza", date: "03 jun 2025", status: "Concluído", price: 120, icon: "Sparkles" },
  { id: "h3", service: "Montagem", date: "28 mai 2025", status: "Em andamento", price: 95, icon: "Hammer" },
  { id: "h4", service: "Reparo hidráulico", date: "15 mai 2025", status: "Concluído", price: 90, icon: "Droplet" },
  { id: "h5", service: "Montagem", date: "02 mai 2025", status: "Cancelado", price: 95, icon: "Hammer" },
];

export const REORDER = [
  { id: "r1", service: "Manutenção elétrica", pro: "Carlos M.", price: 90, icon: "Zap" },
  { id: "r2", service: "Limpeza residencial", pro: "Ana Paula", price: 120, icon: "Sparkles" },
  { id: "r3", service: "Montagem de móveis", pro: "Diego S.", price: 95, icon: "Hammer" },
];

export const COMPLAINTS = [
  { id: "c1", title: "Atraso no atendimento", code: "#FS-20498", date: "10 jun 2025", status: "Em análise" },
  { id: "c2", title: "Serviço incompleto", code: "#FS-20471", date: "28 mai 2025", status: "Resolvido" },
];

export const CONVERSATIONS = [
  { id: "carlos", name: "Carlos Mendes", initials: "CM", color: "#5b4fe9", last: "Combinado, chego às 14h 👍", time: "14:02", unread: 1, online: true },
  { id: "ana", name: "Ana Paula Reis", initials: "AR", color: "#15a85a", last: "Passo a amanhã de manhã?", time: "09:30", unread: 0, online: false },
  { id: "diego", name: "Diego Souza", initials: "DS", color: "#f0a020", last: "Obrigado pelo serviço!", time: "Ontem", unread: 0, online: false },
  { id: "suporte", name: "Suporte FastService", initials: "FS", color: "#ff7a59", last: "Como podemos ajudar?", time: "Seg", unread: 0, online: true },
];

export const MESSAGES = {
  carlos: [
    { from: "them", text: "Olá! Vi seu chamado de manutenção elétrica.", time: "13:40" },
    { from: "them", text: "Posso passar hoje à tarde?", time: "13:41" },
    { from: "me", text: "Perfeito! Pode ser às 14h?", time: "13:45" },
    { from: "me", text: "Endereço é o de sempre.", time: "13:45" },
    { from: "them", text: "Combinado, chego às 14h.", time: "13:48" },
  ],
};

export const PAYMENTS = [
  { id: "p1", brand: "Visa", last4: "4242", exp: "06/27", primary: true, icon: "CreditCard" },
  { id: "p2", brand: "Master", last4: "8810", exp: "02/26", primary: false, icon: "CreditCard" },
  { id: "p3", brand: "Pix", last4: "", exp: "pagam01@gmail.com", primary: false, icon: "QrCode" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Carlos está a caminho", body: "Chegada estimada em 8 min · 1,2 km", time: "agora", icon: "Truck", tone: "primary", unread: true },
  { id: "n2", title: "Pagamento aprovado", body: "R$ 90,00 · Manutenção elétrica", time: "2 h", icon: "CheckCircle2", tone: "success", unread: true },
  { id: "n3", title: "Avalie seu atendimento", body: "Como foi a limpeza residencial?", time: "Ontem", icon: "Star", tone: "warning", unread: false },
  { id: "n4", title: "Promoção da semana", body: "20% off na primeira montagem", time: "2 dias", icon: "Tag", tone: "spark", unread: false },
];

// Pontos do mapa (estes serão substituídos pela sua API: listar/cadastrar pontos do usuário).
// Centro: Atitus Educação — Passo Fundo, RS
export const PASSO_FUNDO = { lat: -28.2628, lng: -52.4067 };
export const ATITUS = { lat: -28.2336, lng: -52.3936 };

export const INITIAL_POINTS = [
  { id: 1, name: "Minha casa", lat: -28.2628, lng: -52.4067, type: "home" },
  { id: 2, name: "Atitus — Passo Fundo", lat: -28.2336, lng: -52.3936, type: "work" },
  { id: 3, name: "Apto da família", lat: -28.2510, lng: -52.4150, type: "home" },
];
