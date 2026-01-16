console.log('JS carregado com sucesso');

// MODAL DE SERVIÇOS 
// MODAL DE CONTATO
const modalContato = document.getElementById('modalContato');
const abrirContato = document.getElementById('abrirContato');
const fecharContato = document.getElementById('modal-close-contato');

if (abrirContato && modalContato) {
  abrirContato.addEventListener('click', (e) => {
    e.preventDefault();
    modalContato.classList.add('active');
  });
}
if (fecharContato && modalContato) {
  // usar função centralizada para fechar e (quando aplicável) limpar o formulário
  fecharContato.addEventListener('click', () => {
    if (typeof fecharModalContato === 'function') {
      fecharModalContato();
    } else {
      modalContato.classList.remove('active');
    }
  });
  // Fechar ao clicar fora do conteúdo usando mesma função
  modalContato.addEventListener('click', (e) => {
    if (e.target === modalContato) {
      if (typeof fecharModalContato === 'function') {
        fecharModalContato();
      } else {
        modalContato.classList.remove('active');
      }
    }
  });
}

const modal = document.getElementById("modalServicos");
const modalTitulo = document.getElementById("modal-titulo");
const modalImagem = document.getElementById("modal-imagem");
const modalDescricao = document.getElementById("modal-texto");
const modalUso = document.getElementById("modal-uso");
const modalIndicado = document.getElementById("modal-indicado");
// selecionar especificamente o botão de fechar do modal de serviços
const fechaModal = document.querySelector("#modalServicos .modal-close");

const servicesData = {
  ongrid: {
    titulo: "Sistemas On-Grid",
    imagem: "assets/diagrama-on-grid-150.png",
    descricao: "Sistemas fotovoltaicos conectados à rede elétrica pública, permitindo a troca de energia com a concessionária.",
    uso: "Uso comum: Residências, comércios e indústrias conectados à rede elétrica.",
    indicado: "Indicado para: Residencial, Comercial e Empresarial."
  },
  offgrid: {
    titulo: "Sistemas Off-Grid",
    imagem: "assets/diagrama-off-grid-150.png",
    descricao: "Sistemas fotovoltaicos independentes da rede elétrica, ideais para locais remotos ou sem acesso à rede.",
    uso: "Uso comum: Sítios, fazendas, áreas rurais e locais isolados.",
    indicado: "Indicado para: Rural e locais sem acesso à rede pública."
  },
  zerogrid: {
    titulo: "Sistemas Zero-Grid",
    imagem: "assets/diagrama-zero-grid-150.png",
    descricao: "Sistemas fotovoltaicos que combinam a eficiência da energia solar com a autonomia total do sistema.",
    uso: "Uso comum: Projetos que exigem independência total da rede, com backup e controle inteligente.",
    indicado: "Indicado para: Residencial, Empresarial e Rural que buscam autonomia máxima."
  },
  hybrid: {
    titulo: "Sistemas Híbridos",
    imagem: "assets/diagrama-hibrido-150.png",
    descricao: "O sistema de geração de energia solar híbrido combina as principais vantagens dos sistemas On-Grid e Off-Grid, permitindo a conexão com a rede elétrica e, ao mesmo tempo, o uso de baterias para armazenamento de energia.",
    uso: "Uso comum: Residências que sofrem com quedas frequentes de energia, Comércios que não podem interromper suas atividades, Empresas que precisam proteger equipamentos sensíveis .",
    indicado: "Indicado para: Residencial, Empresarial e Rural que buscam autonomia máxima."
  }
};

// Abrir modal
document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const service = btn.dataset.service;
    const data = servicesData[service];

    if (!data) return;

    modalTitulo.textContent = data.titulo;
    modalImagem.src = data.imagem;
    modalDescricao.textContent = data.descricao;
    modalUso.textContent = data.uso;
    modalIndicado.textContent = data.indicado;

    if (modal) {
      modal.classList.add('active');
    }
  });
});

// Fechar modal
if (modal) {
  function closeModal() {
      modal.classList.remove('active');
      // Limpa campos do modal
      modalTitulo.textContent = '';
      modalImagem.src = '';
      modalDescricao.textContent = '';
      modalUso.textContent = '';
      modalIndicado.textContent = '';
  }

// Botão X
  if (fechaModal) {
    fechaModal.addEventListener('click', closeModal);
  }

// Clique fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
     closeModal();
    }
});
}

// função para abrir o modal (pode ser usada em outros contextos)
function abrirModal() {
  console.log('Abrir modal chamado');
  if (modal) {
    modal.classList.add('active');
  } else {
    console.error('Modal não encontrado');
  } 
}


// Botão de voltar ao topo
const topo = document.getElementById('topo');
window.addEventListener('scroll', () => {
  topo.style.display = window.scrollY > 400 ? 'block' : 'none';
});
topo.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// FAQ - expandir e recolher
const faqs = document.querySelectorAll('.faq-question');
faqs.forEach(f => f.addEventListener('click', () => {
  const ans = f.nextElementSibling;
  const open = ans.style.display === 'block';
  document.querySelectorAll('.faq-answer').forEach(a => a.style.display='none');
  document.querySelectorAll('.faq-question span').forEach(s=>s.textContent='+');
  ans.style.display = open ? 'none' : 'block';
  f.querySelector('span').textContent = open ? '+' : '-';
}));

// FAQ Toggle - Smooth Animation
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    const faqItem = this.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fecha todos os outros itens
    faqItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Abre o item clicado se não estava aberto
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// Destacar link do menu conforme a seção visível
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });


  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}); 

// Scroll suave para seções
const menuLinks = document.querySelectorAll('a[href^="#"]');

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Se não existir a seção alvo (ex: href="#"), tratar caso de CTA
    if (!targetSection) {
      if (this.classList.contains('cta-btn') && modalContato) {
        e.preventDefault();
        modalContato.classList.add('active');
      }
      return;
    }

    e.preventDefault();
    const headerOffset = 100; // Altura do cabeçalho
    const elementPosition = targetSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
}); 

// Garantir que todos os botões CTA abram o modal de contato (menu e hero)
document.querySelectorAll('a.cta-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // se o botão tiver href apontando a seção válida, deixamos o handler de scroll cuidar
    const href = this.getAttribute('href');
    if (href && href !== '#' && document.querySelector(href)) return;
    e.preventDefault();
    if (modalContato) modalContato.classList.add('active');
  });
});


// Menu móvel
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('header .nav');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Validação e envio do formulário de contato
const form = document.getElementById('formContato');

function fecharModalContato() {
  if (modalContato) modalContato.classList.remove('active');
  // limpar o formulário sempre que o modal for fechado
  limparFormulario();
}

// fechar pelo X do modal de contato
if (fecharContato) fecharContato.addEventListener('click', fecharModalContato);

// Fechar clicando fora do modal de contato
if (modalContato) {
  modalContato.addEventListener('click', (e) => {
    if (e.target === modalContato) {
      fecharModalContato();
    }
  });
}

function limparFormulario() {
  if (form) form.reset();
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // coletar e sanitizar valores
    const nome = (form.querySelector('[name="nome"]')?.value || '').trim();
    const telefone = (form.querySelector('[name="telefone"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const sistema = (form.querySelector('[name="sistema"]')?.value || '').trim();
    const politicaChecked = !!form.querySelector('[name="politica"]')?.checked;

    if (!politicaChecked) {
      alert('Por favor, aceite a Política de Privacidade.');
      return;
    }

    const fd = new FormData();
    fd.append('nome', nome);
    fd.append('telefone', telefone);
    fd.append('email', email);
    fd.append('sistema', sistema);
    fd.append('politica', politicaChecked ? '1' : '0');

    try {
      const res = await fetch('contato.php', {
        method: 'POST',
        body: fd
      });

      const json = await res.json().catch(() => ({ success: res.ok }));

      if (res.ok && json.success) {
        // abrir WhatsApp em nova aba com mensagem padrão
        const mensagem = `Olá! Meu nome é ${nome}. Gostaria de solicitar um orçamento para sistema ${sistema}. Telefone: ${telefone}.`;
        window.open(`https://wa.me/5599999999999?text=${encodeURIComponent(mensagem)}`, '_blank');

        // fechar (a limpeza será executada na função de fechar)
        fecharModalContato();
      } else {
        alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    }
  });
}


