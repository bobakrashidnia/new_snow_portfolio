import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: {
          "hero.greeting": "Hi, I'm",
          "hero.role": "Senior Full Stack Developer & IT Support",
          "hero.description": "Bachelor's in Computer Science",
          "tech.title": "Tech",
          "tech.subtitle": "Stack",
          "contact.title": "Contact",
          "contact.subtitle": "Me",
          "contact.heading": "Let's talk.",
          "contact.intro": "Have a role, a project, or just want to exchange ideas? Send me a message.",
          "contact.name": "Name",
          "contact.namePh": "Your name",
          "contact.email": "Email",
          "contact.emailPh": "your@email.com",
          "contact.message": "Message",
          "contact.messagePh": "What's on your mind?",
          "contact.send": "Send Message",
          "contact.sending": "Sending...",
          "contact.invalidEmail": "Please enter a valid email",
          "contact.error": "Something went wrong. Please try again.",
          "contact.sent": "Sent!",
          "contact.thanks": "I'll get back to you soon.",
          "projects.title": "My",
          "projects.subtitle": "Projects",
          "projects.open": "View project",
          "projects.soon": "More Coming Soon",
          "projects.list": [
            {
              title: "Verify It",
              description: "Platform that helps used-vehicle buyers check whether an online listing is genuine: paste the link and find out if the owner registered it. Born as verifiCAR, 3rd place at Startup Weekend Cyber Security 2025.",
              tech: ["React", "TypeScript", "Vite", "Vitest"],
              link: "https://thuanykamers.github.io/verify-it/",
              image: "images/projects/capaVerifyIt-v2.webp",
              cover: "images/projects/capaVerifyIt-v2.webp"
            },
            {
              title: "Electronic Time-Tracking System",
              description: "Web system for working hours and time banks built for Brazilian labour law (CLT and Ordinance 671), with a tamper-proof audit trail and an AI assistant for admins.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capaPonto-v2.webp",
              cover: "images/projects/capaPonto-v2.webp"
            },
            {
              title: "Secure Cloud: CEI Snoopy",
              description: "University extension project: moved the records of a public daycare centre to a secure cloud and trained its staff to manage them.",
              tech: ["Google Drive", "Cloud", "Digital Training"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaNuvem-v3.webp",
              cover: "images/projects/capaNuvem-v3.webp"
            },
            {
              title: "Youth Agency in the Digital Age",
              description: "University extension project: 8 weeks of digital literacy workshops for 27 students, bringing an unused school computer lab back into use.",
              tech: ["Digital Literacy", "Scratch", "Teaching"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaProtag-v3.webp",
              cover: "images/projects/capaProtag-v3.webp"
            },
            {
              title: "Dress Up E-commerce",
              description: "T-shirt store built as a team project, with product pages, a shopping cart and a simulated checkout.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.webp"
            }
          ],
          "achievements.title": "My",
          "achievements.subtitle": "Achievements",
          "achievements.sw.badge": "3rd Place",
          "achievements.sw.date": "April 25-27, 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brazil",
          "achievements.sw.description": "Competed in a 54-hour hackathon focused on cybersecurity, developing the MVP of VerifiCAR — a solution where buyers can verify if a vehicle ad link is authentic.",
          "achievements.sw.theme": "Cybersecurity",
          "achievements.sw.placement": "Placement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Location",
          "achievements.certs.title": "Certificates",
          "achievements.certs.linkedin": "View on LinkedIn",
          "nav.experience": "Experience",
          "nav.international": "International",
          "nav.techStack": "Tech Stack",
          "nav.projects": "Projects",
          "nav.achievements": "Achievements",
          "nav.contact": "Contact",
          "exp.title": "IT",
          "exp.subtitle": "Experience",
          "exp.sp.role": "Software Developer Intern",
          "exp.sp.period": "May 2025 - July 2025",
          "exp.sp.tasks": [
            "Full-stack development of a working prototype of a web-based time tracking system (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), including role-based access control for employees, administrators and support, and version control with Git and GitHub.",
            "Integration of the Meta API to send password recovery links and codes securely, improving security and usability.",
            "Connection of the OpenAI API (GPT) so that database queries can be made in natural language.",
            "Implementation of complex business logic (dynamic calendar for time calculation, chat ticket system) and compliance with Brazilian labour law (CLT) and the time recording ordinance (Portaria 671) through audit-proof data modelling."
          ],
          "exp.sp.captions": ["Home Office Day", "Prototype System", "The Corporate Office"],
          "exp.sp.doc": "Project documentation",
          "exp.sp.docUrl": "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
          "exp.nsc.role": "IT Intern",
          "exp.nsc.period": "Sept 2024 - May 2025",
          "exp.nsc.tasks": [
            "User support for the JD Edwards ERP system and handling of around 400 support tickets in ServiceNow in line with security standards.",
            "Design of the SharePoint folder structure, migration of over 1,000 documents from Confluence and creation of new system documentation.",
            "Independent setup of over 50 user accounts (Active Directory, Google Admin) and adjustment of permissions for about 20% of staff."
          ],
          "exp.nsc.captions": ["Main Entrance", "First Day in Office", "Selfie in Office", "Women's Day", "Carnaval", "Interns Meeting", "Interns Meeting 2"],
          "exp.flex.role": "Customer Service Representative",
          "exp.flex.period": "Jun 2020 - July 2022",
          "exp.flex.tasks": [
            "Answer phone calls about credit card issues and help the customer to solve problems with the app.",
            "Help colleagues solve complex problems.",
            "Provide customer support via chat.",
            "Utilize Salesforce to verify customer data and provide accurate guidance and instructions."
          ],
          "exp.flex.captions": ["Main Entrance", "End of Salesforce Training", "Christmas"],
          "intl.title": "International",
          "intl.subtitle": "Experience",
          "intl.experiences": "experiences",
          "intl.brazil": "Brazil",
          "intl.brazil.jobs": [
            { "period": "2022-23", "role": "Store Manager", "company": "Cacau Show - Shopping Continente — São José", "description": "Managed daily store operations in a mall environment. Led customer service and sales. Handled inventory control, store layout, and stockroom logistics. Trained and supervised new staff. Managed documents and reports using Master Retail PDV." },
            { "period": "2018", "role": "English Teacher", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Taught ESL to middle school students (6th–9th grade). Created tests and assignments to assess proficiency. Developed interactive games and activities to boost engagement and participation." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Line Operator", "company": "Hanon Systems — Palmela, Setúbal", "description": "Worked on the production line of automotive components for AutoEuropa (Volkswagen Group), following strict quality and cycle-time standards. Performed technical part inspections to ensure compliance with automotive industry norms, preventing defects on the final assembly line. Collaborated in a high-pace industrial environment, maintaining productivity and operational safety." },
            { "period": "2023-24", "role": "Waitress at 5-Star Hotel", "company": "Talenter — Lisboa", "description": "Premium service at a 5-star hotel and casino, covering breakfast, dinner, and coffee breaks. Worked large-scale events at the hotel and casino. Wine service and international guest relations, requiring polished etiquette and multilingual fluency. Managed multiple tables simultaneously during peak hours while maintaining quality and guest satisfaction." },
            { "period": "2023", "role": "Line Operator", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operated on a tomato product manufacturing line (sauces and concentrates), ensuring smooth filling and packaging processes. Strictly applied food hygiene and safety standards (HACCP) to guarantee product integrity. Performed visual and technical inspection of the production line to identify and remove non-conforming products." }
          ],
          "intl.germany": "Germany",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Picking parcel bags and loading them onto roll carts (12 bags per cart) for delivery. Scanner-guided staging of roll carts at the assigned handover points for delivery drivers. Managing the material cycle: collecting empty roll carts and preparing empty bags for the night shift to fill." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Handling logistics processes in a high-volume distribution centre, with a focus on Problem Solve and quality control. Carrying out Induct and Stow processes and ensuring inventory accuracy. Scanner-guided picking of parcel bags and staging of roll carts for delivery drivers. Meeting productivity and occupational safety targets. Daily collaboration in a multilingual team (working language: English)." }
          ]
        }
      },
      PT: {
        translation: {
          "hero.greeting": "Olá, eu sou",
          "hero.role": "Desenvolvedora Júnior e Suporte de TI",
          "hero.description": "Bacharel em Sistemas de Informação",
          "tech.title": "Stack",
          "tech.subtitle": "Tecnológica",
          "contact.title": "Fale",
          "contact.subtitle": "Comigo",
          "contact.heading": "Vamos conversar.",
          "contact.intro": "Tem uma vaga, um projeto ou só quer trocar uma ideia? Me mande uma mensagem.",
          "contact.name": "Nome",
          "contact.namePh": "Seu nome",
          "contact.email": "Email",
          "contact.emailPh": "seu@email.com",
          "contact.message": "Mensagem",
          "contact.messagePh": "O que você tem em mente?",
          "contact.send": "Enviar mensagem",
          "contact.sending": "Enviando...",
          "contact.invalidEmail": "Por favor, digite um email válido",
          "contact.error": "Algo deu errado. Tente novamente.",
          "contact.sent": "Enviado!",
          "contact.thanks": "Respondo em breve.",
          "projects.title": "Meus",
          "projects.subtitle": "Projetos",
          "projects.open": "Ver projeto",
          "projects.soon": "Mais em breve",
          "projects.list": [
            {
              title: "Verify It",
              description: "Plataforma que ajuda quem compra veículo usado a conferir se um anúncio online é verdadeiro: cole o link e descubra se o dono registrou o anúncio. Nasceu como verifiCAR, 3º lugar no Startup Weekend Cyber Security 2025.",
              tech: ["React", "TypeScript", "Vite", "Vitest"],
              link: "https://thuanykamers.github.io/verify-it/",
              image: "images/projects/capaVerifyIt-v2.webp",
              cover: "images/projects/capaVerifyIt-v2.webp"
            },
            {
              title: "Sistema de Ponto Eletrônico",
              description: "Sistema web de jornada e banco de horas conforme a CLT e a Portaria 671, com trilha de auditoria à prova de alteração e assistente de IA para administradores.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3eb3f2d9e43b81dba454c7e49c96e539",
              image: "images/projects/capaPonto-v2.webp",
              cover: "images/projects/capaPonto-v2.webp"
            },
            {
              title: "Nuvem Segura: CEI Snoopy",
              description: "Projeto de extensão: migração dos registros de uma creche pública para uma nuvem segura e capacitação da equipe para gerenciá-los.",
              tech: ["Google Drive", "Nuvem", "Capacitação Digital"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaNuvem-v3.webp",
              cover: "images/projects/capaNuvem-v3.webp"
            },
            {
              title: "Protagonismo Juvenil na Era Digital",
              description: "Projeto de extensão: 8 semanas de oficinas de letramento digital para 27 alunos, reativando o laboratório de informática da escola.",
              tech: ["Letramento Digital", "Scratch", "Ensino"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaProtag-v3.webp",
              cover: "images/projects/capaProtag-v3.webp"
            },
            {
              title: "Dress Up E-commerce",
              description: "Loja de camisetas feita em equipe, com páginas de produtos, carrinho de compras e checkout simulado.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.webp"
            }
          ],
          "achievements.title": "Minhas",
          "achievements.subtitle": "Conquistas",
          "achievements.sw.badge": "3º Lugar",
          "achievements.sw.date": "25 a 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competição de 54 horas focada em cibersegurança, onde desenvolvemos o MVP do VerifiCAR — uma solução onde compradores podem verificar se o link de um anúncio de veículo é autêntico.",
          "achievements.sw.theme": "Cibersegurança",
          "achievements.sw.placement": "Colocação",
          "achievements.sw.dateLabel": "Data",
          "achievements.sw.locationLabel": "Local",
          "achievements.certs.title": "Certificados",
          "achievements.certs.linkedin": "Ver no LinkedIn",
          "nav.experience": "Experiência",
          "nav.international": "Internacional",
          "nav.techStack": "Tecnologias",
          "nav.projects": "Projetos",
          "nav.achievements": "Conquistas",
          "nav.contact": "Contato",
          "exp.title": "Experiência em",
          "exp.subtitle": "TI",
          "exp.sp.role": "Estagiária de Desenvolvimento de Software",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Desenvolvimento full-stack de um protótipo funcional de sistema web de ponto eletrônico (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), com controle de acesso por perfil para funcionários, administradores e suporte, e versionamento de código com Git e GitHub.",
            "Integração da API da Meta para envio seguro de links e códigos de recuperação de senha, melhorando a segurança e a usabilidade.",
            "Conexão da API da OpenAI (GPT) para que consultas ao banco de dados possam ser feitas em linguagem natural.",
            "Implementação de lógica de negócio complexa (calendário dinâmico para cálculo de horas, sistema de chamados via chat) e conformidade com a CLT e a Portaria 671 por meio de modelagem de dados auditável."
          ],
          "exp.sp.captions": ["Dia de Home Office", "Sistema Protótipo", "O Escritório"],
          "exp.sp.doc": "Documentação do projeto",
          "exp.sp.docUrl": "https://skinny-protest-638.notion.site/Sistema-de-Ponto-Eletr-nico-3eb3f2d9e43b81dba454c7e49c96e539",
          "exp.nsc.role": "Estagiária de TI",
          "exp.nsc.period": "Set 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Suporte aos usuários do ERP JD Edwards e atendimento de cerca de 400 chamados no ServiceNow, seguindo os padrões de segurança.",
            "Criação da estrutura de pastas no SharePoint, migração de mais de 1.000 documentos do Confluence e elaboração de nova documentação dos sistemas.",
            "Criação autônoma de mais de 50 contas de usuário (Active Directory, Google Admin) e ajuste de permissões de cerca de 20% dos colaboradores."
          ],
          "exp.nsc.captions": ["Entrada Principal", "Primeiro Dia no Escritório", "Selfie no Escritório", "Dia da Mulher", "Carnaval", "Reunião de Estagiários", "Reunião de Estagiários 2"],
          "exp.flex.role": "Atendente de SAC",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Atender por telefone sobre problemas com cartão de crédito e auxiliar o cliente na resolução de problemas com o aplicativo.",
            "Auxiliar colegas na resolução de problemas complexos.",
            "Atender o cliente via chat.",
            "Utilizar o Salesforce para verificar dados de clientes e fornecer orientações precisas."
          ],
          "exp.flex.captions": ["Entrada Principal", "Fim do Treinamento Salesforce", "Natal"],
          "intl.title": "Experiência",
          "intl.subtitle": "Internacional",
          "intl.experiences": "experiências",
          "intl.brazil": "Brasil",
          "intl.brazil.jobs": [
            { "period": "2022-23", "role": "Gerente de Loja", "company": "Cacau Show - Shopping Continente — São José", "description": "Gerenciar operações diárias da loja em ambiente de shopping. Liderar vendas e atender clientes. Controlar estoque, layout da loja e logística do depósito. Treinar e supervisionar novos funcionários. Gerenciar documentos e relatórios com o sistema Master Retail PDV." },
            { "period": "2018", "role": "Professora de Inglês", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Lecionar inglês para alunos do ensino fundamental (6º ao 9º ano). Elaborar provas e atividades para avaliar o progresso dos alunos. Criar jogos interativos e atividades criativas para engajar os alunos e aumentar a participação." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Operadora de Linha", "company": "Hanon Systems — Palmela, Setúbal", "description": "Operar na linha de produção de componentes automotivos para a AutoEuropa (Grupo Volkswagen) e seguir padrões rigorosos de qualidade e tempo de ciclo. Inspecionar tecnicamente peças para garantir conformidade com normas da indústria automotiva. Colaborar em ambiente industrial de alta cadência e manter produtividade e segurança operacional." },
            { "period": "2023-24", "role": "Garçonete em Hotel 5 Estrelas", "company": "Talenter — Lisboa", "description": "Atender com alto padrão em hotel 5 estrelas e cassino no café da manhã, jantar e coffee breaks. Participar de grandes eventos no hotel e cassino. Servir vinhos e atender clientes internacionais, com postura polida e fluência em idiomas. Gerenciar múltiplas mesas simultaneamente em horários de pico e manter qualidade e satisfação do cliente." },
            { "period": "2023", "role": "Operadora de Linha", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operar em linha de produção de derivados de tomate (molhos e concentrados) e garantir a fluidez do envase e embalagem. Aplicar rigorosamente as normas de higiene e segurança alimentar (HACCP) para garantir a integridade do produto. Inspecionar visual e tecnicamente a esteira para identificar e remover produtos fora do padrão." }
          ],
          "intl.germany": "Alemanha",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Separação de sacos de pacotes e carregamento em carrinhos (12 sacos por carrinho) para a entrega. Posicionamento dos carrinhos com auxílio de scanner nos pontos de entrega designados aos motoristas. Gestão do ciclo de materiais: coleta dos carrinhos vazios e preparação dos sacos vazios para o turno da noite encher." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Execução de processos logísticos em um centro de distribuição de alto volume, com foco em Problem Solve e controle de qualidade. Realização dos processos de Induct e Stow, garantindo a precisão do inventário. Separação de sacos de pacotes e posicionamento de carrinhos com auxílio de scanner para os motoristas de entrega. Cumprimento das metas de produtividade e de segurança do trabalho. Colaboração diária em uma equipe multilíngue (idioma de trabalho: inglês)." }
          ]
        }
      },
      ES: {
        translation: {
          "hero.greeting": "Hola, soy",
          "hero.role": "Desarrolladora Junior y Soporte de TI",
          "hero.description": "Licenciatura en Sistemas de Información",
          "tech.title": "Mis",
          "tech.subtitle": "Tecnologías",
          "contact.title": "Habla",
          "contact.subtitle": "Conmigo",
          "contact.heading": "Hablemos.",
          "contact.intro": "¿Tienes una vacante, un proyecto o solo quieres intercambiar ideas? Envíame un mensaje.",
          "contact.name": "Nombre",
          "contact.namePh": "Tu nombre",
          "contact.email": "Email",
          "contact.emailPh": "tu@email.com",
          "contact.message": "Mensaje",
          "contact.messagePh": "¿Qué tienes en mente?",
          "contact.send": "Enviar mensaje",
          "contact.sending": "Enviando...",
          "contact.invalidEmail": "Por favor, ingresa un email válido",
          "contact.error": "Algo salió mal. Inténtalo de nuevo.",
          "contact.sent": "¡Enviado!",
          "contact.thanks": "Te responderé pronto.",
          "projects.title": "Mis",
          "projects.subtitle": "Proyectos",
          "projects.open": "Ver proyecto",
          "projects.soon": "Más próximamente",
          "projects.list": [
            {
              title: "Verify It",
              description: "Plataforma que ayuda a quien compra un vehículo usado a comprobar si un anuncio en línea es auténtico: pega el enlace y descubre si el dueño lo registró. Nació como verifiCAR, 3.er lugar en el Startup Weekend Cyber Security 2025.",
              tech: ["React", "TypeScript", "Vite", "Vitest"],
              link: "https://thuanykamers.github.io/verify-it/",
              image: "images/projects/capaVerifyIt-v2.webp",
              cover: "images/projects/capaVerifyIt-v2.webp"
            },
            {
              title: "Sistema de Control de Asistencia",
              description: "Sistema web de jornada laboral y banco de horas conforme a la legislación laboral brasileña (CLT y Portaria 671), con registro de auditoría inalterable y asistente de IA para administradores.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capaPonto-v2.webp",
              cover: "images/projects/capaPonto-v2.webp"
            },
            {
              title: "Nube Segura: CEI Snoopy",
              description: "Proyecto de extensión universitaria: migración de los registros de una guardería pública a una nube segura y capacitación del equipo para gestionarlos.",
              tech: ["Google Drive", "Nube", "Capacitación Digital"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaNuvem-v3.webp",
              cover: "images/projects/capaNuvem-v3.webp"
            },
            {
              title: "Jóvenes Protagonistas en la Era Digital",
              description: "Proyecto de extensión universitaria: 8 semanas de talleres de alfabetización digital para 27 alumnos, reactivando el laboratorio de informática de la escuela.",
              tech: ["Alfabetización Digital", "Scratch", "Enseñanza"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaProtag-v3.webp",
              cover: "images/projects/capaProtag-v3.webp"
            },
            {
              title: "Dress Up E-commerce",
              description: "Tienda de camisetas desarrollada en equipo, con páginas de productos, carrito de compras y checkout simulado.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.webp"
            }
          ],
          "achievements.title": "Mis",
          "achievements.subtitle": "Logros",
          "achievements.sw.badge": "3er Lugar",
          "achievements.sw.date": "25 al 27 de abril de 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasil",
          "achievements.sw.description": "Competencia de 54 horas enfocada en ciberseguridad, donde desarrollamos el MVP de VerifiCAR — una solución donde los compradores pueden verificar si el enlace de un anuncio de vehículo es auténtico.",
          "achievements.sw.theme": "Ciberseguridad",
          "achievements.sw.placement": "Posición",
          "achievements.sw.dateLabel": "Fecha",
          "achievements.sw.locationLabel": "Ubicación",
          "achievements.certs.title": "Certificados",
          "achievements.certs.linkedin": "Ver en LinkedIn",
          "nav.experience": "Experiencia",
          "nav.international": "Internacional",
          "nav.techStack": "Tecnologías",
          "nav.projects": "Proyectos",
          "nav.achievements": "Logros",
          "nav.contact": "Contacto",
          "exp.title": "Experiencia en",
          "exp.subtitle": "TI",
          "exp.sp.role": "Pasante de Desarrollo de Software",
          "exp.sp.period": "May 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Desarrollo full-stack de un prototipo funcional de un sistema web de control horario (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), con control de acceso por roles para empleados, administradores y soporte, y control de versiones con Git y GitHub.",
            "Integración de la API de Meta para enviar de forma segura enlaces y códigos de recuperación de contraseña, mejorando la seguridad y la usabilidad.",
            "Conexión de la API de OpenAI (GPT) para que las consultas a la base de datos puedan hacerse en lenguaje natural.",
            "Implementación de lógica de negocio compleja (calendario dinámico para el cálculo de horas, sistema de tickets por chat) y cumplimiento de la legislación laboral brasileña (CLT) y de la normativa de registro de jornada (Portaria 671) mediante un modelado de datos auditable."
          ],
          "exp.sp.captions": ["Día de Home Office", "Sistema Prototipo", "La Oficina"],
          "exp.sp.doc": "Documentación del proyecto",
          "exp.sp.docUrl": "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
          "exp.nsc.role": "Pasante de TI",
          "exp.nsc.period": "Sep 2024 - May 2025",
          "exp.nsc.tasks": [
            "Soporte a usuarios del ERP JD Edwards y gestión de unos 400 tickets en ServiceNow conforme a los estándares de seguridad.",
            "Diseño de la estructura de carpetas de SharePoint, migración de más de 1.000 documentos desde Confluence y creación de nueva documentación de sistemas.",
            "Creación autónoma de más de 50 cuentas de usuario (Active Directory, Google Admin) y ajuste de permisos para cerca del 20% del personal."
          ],
          "exp.nsc.captions": ["Entrada Principal", "Primer Día en la Oficina", "Selfie en la Oficina", "Día de la Mujer", "Carnaval", "Reunión de Pasantes", "Reunión de Pasantes 2"],
          "exp.flex.role": "Representante de Atención al Cliente",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Atención telefónica sobre problemas con tarjetas de crédito y ayuda al cliente en la resolución de problemas con la aplicación.",
            "Ayuda a colegas en la resolución de problemas complejos.",
            "Atención al cliente vía chat.",
            "Utilización de Salesforce para verificar datos de clientes y proporcionar orientación precisa."
          ],
          "exp.flex.captions": ["Entrada Principal", "Fin del Entrenamiento Salesforce", "Navidad"],
          "intl.title": "Experiencia",
          "intl.subtitle": "Internacional",
          "intl.experiences": "experiencias",
          "intl.brazil": "Brasil",
          "intl.brazil.jobs": [
            { "period": "2022-23", "role": "Gerente de Tienda", "company": "Cacau Show - Shopping Continente — São José", "description": "Gestionó operaciones diarias de la tienda en centro comercial. Lideró atención al cliente y ventas. Controló inventario, disposición de la tienda y logística. Capacitó y supervisó nuevos empleados. Gestionó documentos y reportes con Master Retail PDV." },
            { "period": "2018", "role": "Profesora de Inglés", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Enseñó inglés a alumnos de secundaria (6º a 9º grado). Elaboró exámenes y actividades para evaluar el progreso. Creó juegos interactivos y actividades creativas para aumentar la participación." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Operadora de Línea", "company": "Hanon Systems — Palmela, Setúbal", "description": "Trabajo en línea de producción de componentes automotrices para AutoEuropa (Grupo Volkswagen), siguiendo estándares rigurosos de calidad y tiempo de ciclo. Inspección técnica de piezas para garantizar conformidad con normas de la industria automotriz. Colaboración en ambiente industrial de alta cadencia, manteniendo productividad y seguridad operacional." },
            { "period": "2023-24", "role": "Camarera en Hotel 5 Estrellas", "company": "Talenter — Lisboa", "description": "Servicio de alto nivel en hotel 5 estrellas y casino, cubriendo desayuno, cena y coffee breaks. Participación en grandes eventos del hotel y casino. Servicio de vinos y atención a clientes internacionales, con etiqueta refinada y fluidez en idiomas. Gestión de múltiples mesas simultáneamente en horarios pico, manteniendo calidad y satisfacción del cliente." },
            { "period": "2023", "role": "Operadora de Línea", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Operación en línea de producción de derivados de tomate (salsas y concentrados), asegurando la fluidez del envasado y embalaje. Aplicación rigurosa de normas de higiene y seguridad alimentaria (HACCP). Inspección visual y técnica de la cinta para identificar y retirar productos fuera de estándar." }
          ],
          "intl.germany": "Alemania",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Recogida de bolsas de paquetes y carga en carros (12 bolsas por carro) para el reparto. Ubicación de los carros guiada por escáner en los puntos de entrega asignados a los conductores de reparto. Gestión del ciclo de material: recogida de carros vacíos y preparación de bolsas vacías para que el turno de noche las llene." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Gestión de procesos logísticos en un centro de distribución de alto volumen, con foco en Problem Solve y control de calidad. Ejecución de los procesos de Induct y Stow, garantizando la precisión del inventario. Recogida de bolsas de paquetes y ubicación de carros guiadas por escáner para los conductores de reparto. Cumplimiento de los objetivos de productividad y de seguridad laboral. Colaboración diaria en un equipo multilingüe (idioma de trabajo: inglés)." }
          ]
        }
      },
      DE: {
        translation: {
          "hero.greeting": "Hallo, ich bin",
          "hero.role": "Junior-Entwicklerin & IT-Support",
          "hero.description": "Bachelor in Informationssystemen",
          "tech.title": "Mein",
          "tech.subtitle": "Tech-Stack",
          "contact.title": "Schreib",
          "contact.subtitle": "Mir",
          "contact.heading": "Lass uns reden.",
          "contact.intro": "Du hast eine Stelle, ein Projekt oder willst dich einfach austauschen? Schreib mir eine Nachricht.",
          "contact.name": "Name",
          "contact.namePh": "Dein Name",
          "contact.email": "E-Mail",
          "contact.emailPh": "deine@email.com",
          "contact.message": "Nachricht",
          "contact.messagePh": "Was hast du auf dem Herzen?",
          "contact.send": "Nachricht senden",
          "contact.sending": "Wird gesendet...",
          "contact.invalidEmail": "Bitte gib eine gültige E-Mail ein",
          "contact.error": "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
          "contact.sent": "Gesendet!",
          "contact.thanks": "Ich melde mich bald.",
          "projects.title": "Meine",
          "projects.subtitle": "Projekte",
          "projects.open": "Projekt ansehen",
          "projects.soon": "Bald mehr",
          "projects.list": [
            {
              title: "Verify It",
              description: "Plattform, die Käufern von Gebrauchtfahrzeugen hilft zu prüfen, ob ein Online-Inserat echt ist: Link einfügen und sehen, ob der Besitzer es registriert hat. Entstanden als verifiCAR, 3. Platz beim Startup Weekend Cyber Security 2025.",
              tech: ["React", "TypeScript", "Vite", "Vitest"],
              link: "https://thuanykamers.github.io/verify-it/",
              image: "images/projects/capaVerifyIt-v2.webp",
              cover: "images/projects/capaVerifyIt-v2.webp"
            },
            {
              title: "Elektronisches Zeiterfassungssystem",
              description: "Websystem für Arbeitszeit und Zeitkonten nach brasilianischem Arbeitsrecht (CLT und Verordnung 671), mit manipulationssicherem Audit-Trail und KI-Assistent für Administratoren.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Elektronisches-Zeiterfassungssystem-3e73f2d9e43b811490d5f15f543f2024",
              image: "images/projects/capaPonto-v2.webp",
              cover: "images/projects/capaPonto-v2.webp"
            },
            {
              title: "Sichere Cloud: CEI Snoopy",
              description: "Hochschul-Praxisprojekt: Migration der Unterlagen einer öffentlichen Kita in eine sichere Cloud und Schulung des Teams im Umgang damit.",
              tech: ["Google Drive", "Cloud", "Digitale Schulung"],
              link: "https://skinny-protest-638.notion.site/Sichere-Cloud-Das-Ged-chtnis-des-CEI-Snoopy-sch-tzen-3e43f2d9e43b81038633d97c5c6fe43f",
              image: "images/projects/capaNuvem-v3.webp",
              cover: "images/projects/capaNuvem-v3.webp"
            },
            {
              title: "Jugendliche als Gestalter im digitalen Zeitalter",
              description: "Hochschul-Praxisprojekt: 8 Wochen Workshops zu digitaler Kompetenz für 27 Schüler, um den ungenutzten Computerraum der Schule wieder in Betrieb zu nehmen.",
              tech: ["Digitale Kompetenz", "Scratch", "Unterricht"],
              link: "https://skinny-protest-638.notion.site/Jugendliche-als-Gestalter-im-digitalen-Zeitalter-3e43f2d9e43b81478b7bf569adaff087",
              image: "images/projects/capaProtag-v3.webp",
              cover: "images/projects/capaProtag-v3.webp"
            },
            {
              title: "Dress Up E-Commerce",
              description: "Im Team entwickelter T-Shirt-Shop mit Produktseiten, Warenkorb und simuliertem Checkout.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.webp"
            }
          ],
          "achievements.title": "Meine",
          "achievements.subtitle": "Erfolge",
          "achievements.sw.badge": "3. Platz",
          "achievements.sw.date": "25. bis 27. April 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brasilien",
          "achievements.sw.description": "54-Stunden-Hackathon mit Schwerpunkt Cybersicherheit, bei dem wir das MVP von VerifiCAR entwickelten — eine Lösung, mit der Käufer überprüfen können, ob der Link einer Fahrzeuganzeige authentisch ist.",
          "achievements.sw.theme": "Cybersicherheit",
          "achievements.sw.placement": "Platzierung",
          "achievements.sw.dateLabel": "Datum",
          "achievements.sw.locationLabel": "Ort",
          "achievements.certs.title": "Zertifikate",
          "achievements.certs.linkedin": "Auf LinkedIn ansehen",
          "nav.experience": "Erfahrung",
          "nav.international": "International",
          "nav.techStack": "Tech-Stack",
          "nav.projects": "Projekte",
          "nav.achievements": "Erfolge",
          "nav.contact": "Kontakt",
          "exp.title": "IT",
          "exp.subtitle": "Erfahrung",
          "exp.sp.role": "Software-Entwicklungspraktikantin",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Full-Stack-Entwicklung eines funktionsfähigen Prototyps eines webbasierten Zeiterfassungssystems (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React) inklusive rollenbasierter Zugriffskontrolle für Mitarbeitende, Administratoren und Support sowie Versionsverwaltung mit Git und GitHub.",
            "Integration der Meta-API zum sicheren Versand von Links und Codes zur Passwortwiederherstellung, was Sicherheit und Benutzerfreundlichkeit verbesserte.",
            "Anbindung der OpenAI-API (GPT), sodass Datenbankabfragen in natürlicher Sprache möglich sind.",
            "Umsetzung komplexer Geschäftslogik (dynamischer Kalender zur Zeitberechnung, Chat-Ticketsystem) und Einhaltung des brasilianischen Arbeitsrechts (CLT) sowie der Zeiterfassungsverordnung (Portaria 671) durch revisionssichere Datenmodellierung."
          ],
          "exp.sp.captions": ["Home-Office-Tag", "Prototyp-System", "Das Büro"],
          "exp.sp.doc": "Projektdokumentation",
          "exp.sp.docUrl": "https://skinny-protest-638.notion.site/Elektronisches-Zeiterfassungssystem-3e73f2d9e43b811490d5f15f543f2024",
          "exp.nsc.role": "IT-Praktikantin",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Anwenderbetreuung für das ERP-System JD Edwards und Bearbeitung von rund 400 Support-Tickets in ServiceNow gemäß Sicherheitsstandards.",
            "Konzeption der SharePoint-Ordnerstruktur, Migration von über 1.000 Dokumenten aus Confluence und Erstellung neuer Systemdokumentation.",
            "Selbstständige Einrichtung von über 50 Benutzerkonten (Active Directory, Google Admin) und Anpassung der Berechtigungen für etwa 20% der Belegschaft."
          ],
          "exp.nsc.captions": ["Haupteingang", "Erster Tag im Büro", "Selfie im Büro", "Frauentag", "Karneval", "Praktikantentreffen", "Praktikantentreffen 2"],
          "exp.flex.role": "Kundendienstmitarbeiterin",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Telefonische Betreuung bei Kreditkartenproblemen und Hilfe bei der Lösung von App-Problemen.",
            "Unterstützung von Kollegen bei komplexen Problemen.",
            "Kundenbetreuung per Chat.",
            "Nutzung von Salesforce zur Überprüfung von Kundendaten und Bereitstellung präziser Anleitungen."
          ],
          "exp.flex.captions": ["Haupteingang", "Ende des Salesforce-Trainings", "Weihnachten"],
          "intl.title": "Internationale",
          "intl.subtitle": "Erfahrung",
          "intl.experiences": "Erfahrungen",
          "intl.brazil": "Brasilien",
          "intl.brazil.jobs": [
            { "period": "2022-23", "role": "Filialleiterin", "company": "Cacau Show - Shopping Continente — São José", "description": "Leitete den täglichen Filialbetrieb im Einkaufszentrum. Führte Kundenservice und Verkauf. Kontrollierte Lagerbestand, Ladenlayout und Logistik. Schulte und beaufsichtigte neue Mitarbeiter. Verwaltete Dokumente und Berichte mit Master Retail PDV." },
            { "period": "2018", "role": "Englischlehrerin", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Unterrichtete Englisch für Schüler der Sekundarstufe (6.–9. Klasse). Erstellte Prüfungen und Aufgaben zur Leistungsbewertung. Entwickelte interaktive Spiele und kreative Aktivitäten zur Steigerung der Beteiligung." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Linienoperatorin", "company": "Hanon Systems — Palmela, Setúbal", "description": "Arbeit an der Produktionslinie für Automobilkomponenten für AutoEuropa (Volkswagen-Konzern) unter strikten Qualitäts- und Taktzeitstandards. Technische Teileinspektion zur Sicherstellung der Konformität mit Automobilindustrienormen. Zusammenarbeit in einem hochfrequenten Industrieumfeld bei Aufrechterhaltung von Produktivität und Arbeitssicherheit." },
            { "period": "2023-24", "role": "Kellnerin im 5-Sterne-Hotel", "company": "Talenter — Lissabon", "description": "Erstklassiger Service in einem 5-Sterne-Hotel und Casino bei Frühstück, Abendessen und Kaffeepausen. Einsatz bei Großveranstaltungen im Hotel und Casino. Weinservice und internationale Gästebetreuung mit gepflegtem Auftreten und Sprachgewandtheit. Gleichzeitige Betreuung mehrerer Tische in Stoßzeiten bei Wahrung von Qualität und Gästezufriedenheit." },
            { "period": "2023", "role": "Linienoperatorin", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Arbeit an der Produktionslinie für Tomatenprodukte (Soßen und Konzentrate) mit Sicherstellung reibungsloser Abfüll- und Verpackungsprozesse. Strikte Anwendung von Hygiene- und Lebensmittelsicherheitsstandards (HACCP). Visuelle und technische Kontrolle des Förderbands zur Identifizierung und Entfernung nicht konformer Produkte." }
          ],
          "intl.germany": "Deutschland",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Kommissionieren von Paketsäcken und Beladen von Rollwagen (12 Säcke pro Wagen) für die Zustellung. Scannergestütztes Bereitstellen der Rollwagen an den zugewiesenen Übergabepunkten für die Zusteller. Steuerung des Materialkreislaufs: Einsammeln leerer Rollwagen und Vorbereiten leerer Säcke für die Befüllung durch die Nachtschicht." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Abwicklung logistischer Prozesse in einem Verteilzentrum mit hohem Volumen, mit Schwerpunkt auf Problem Solve und Qualitätskontrolle. Durchführung von Induct- und Stow-Prozessen und Sicherstellung der Bestandsgenauigkeit. Scannergestütztes Kommissionieren von Paketsäcken und Bereitstellen von Rollwagen für die Zusteller. Einhaltung von Produktivitäts- und Arbeitssicherheitszielen. Tägliche Zusammenarbeit in einem mehrsprachigen Team (Arbeitssprache: Englisch)." }
          ]
        }
      },
      FR: {
        translation: {
          "hero.greeting": "Bonjour, je suis",
          "hero.role": "Développeuse Junior & Support Informatique",
          "hero.description": "Licence en Systèmes d'Information",
          "tech.title": "Ma",
          "tech.subtitle": "Stack Tech",
          "contact.title": "Me",
          "contact.subtitle": "Contacter",
          "contact.heading": "Discutons.",
          "contact.intro": "Un poste, un projet ou simplement envie d'échanger ? Envoie-moi un message.",
          "contact.name": "Nom",
          "contact.namePh": "Votre nom",
          "contact.email": "E-mail",
          "contact.emailPh": "votre@email.com",
          "contact.message": "Message",
          "contact.messagePh": "Qu'avez-vous en tête ?",
          "contact.send": "Envoyer le message",
          "contact.sending": "Envoi...",
          "contact.invalidEmail": "Veuillez saisir un e-mail valide",
          "contact.error": "Une erreur s'est produite. Veuillez réessayer.",
          "contact.sent": "Envoyé !",
          "contact.thanks": "Je vous répondrai bientôt.",
          "projects.title": "Mes",
          "projects.subtitle": "Projets",
          "projects.open": "Voir le projet",
          "projects.soon": "Bientôt plus",
          "projects.list": [
            {
              title: "Verify It",
              description: "Plateforme qui aide les acheteurs de véhicules d'occasion à vérifier si une annonce en ligne est authentique : collez le lien et découvrez si le propriétaire l'a enregistrée. Née sous le nom de verifiCAR, 3e place au Startup Weekend Cyber Security 2025.",
              tech: ["React", "TypeScript", "Vite", "Vitest"],
              link: "https://thuanykamers.github.io/verify-it/",
              image: "images/projects/capaVerifyIt-v2.webp",
              cover: "images/projects/capaVerifyIt-v2.webp"
            },
            {
              title: "Système de Pointage Électronique",
              description: "Système web de gestion du temps de travail et des heures conforme au droit du travail brésilien (CLT et Portaria 671), avec piste d'audit infalsifiable et assistant IA pour les administrateurs.",
              tech: ["PHP", "MySQL", "React", "TypeScript", "APIs"],
              link: "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
              image: "images/projects/capaPonto-v2.webp",
              cover: "images/projects/capaPonto-v2.webp"
            },
            {
              title: "Cloud Sécurisé : CEI Snoopy",
              description: "Projet d'extension universitaire : migration des archives d'une crèche publique vers un cloud sécurisé et formation de l'équipe à leur gestion.",
              tech: ["Google Drive", "Cloud", "Formation Numérique"],
              link: "https://skinny-protest-638.notion.site/Secure-Cloud-Protecting-the-Memory-of-CEI-Snoopy-3e43f2d9e43b81b5af28f88955de4e04",
              image: "images/projects/capaNuvem-v3.webp",
              cover: "images/projects/capaNuvem-v3.webp"
            },
            {
              title: "Jeunes Acteurs à l'Ère Numérique",
              description: "Projet d'extension universitaire : 8 semaines d'ateliers de culture numérique pour 27 élèves, pour remettre en service la salle informatique de l'école.",
              tech: ["Culture Numérique", "Scratch", "Enseignement"],
              link: "https://skinny-protest-638.notion.site/Youth-Agency-in-the-Digital-Age-3e43f2d9e43b8127a463f0bcc7a742e6",
              image: "images/projects/capaProtag-v3.webp",
              cover: "images/projects/capaProtag-v3.webp"
            },
            {
              title: "Dress Up E-commerce",
              description: "Boutique de t-shirts réalisée en équipe, avec pages produits, panier et paiement simulé.",
              tech: ["HTML", "CSS", "JavaScript"],
              link: "https://thuanykamers.github.io/DressUP/",
              image: "images/projects/dressup.webp"
            }
          ],
          "achievements.title": "Mes",
          "achievements.subtitle": "Réalisations",
          "achievements.sw.badge": "3ème Place",
          "achievements.sw.date": "25 au 27 avril 2025",
          "achievements.sw.location": "São José, Santa Catarina, Brésil",
          "achievements.sw.description": "Compétition de 54 heures axée sur la cybersécurité, où nous avons développé le MVP de VerifiCAR — une solution permettant aux acheteurs de vérifier si le lien d'une annonce de véhicule est authentique.",
          "achievements.sw.theme": "Cybersécurité",
          "achievements.sw.placement": "Classement",
          "achievements.sw.dateLabel": "Date",
          "achievements.sw.locationLabel": "Lieu",
          "achievements.certs.title": "Certificats",
          "achievements.certs.linkedin": "Voir sur LinkedIn",
          "nav.experience": "Expérience",
          "nav.international": "International",
          "nav.techStack": "Technologies",
          "nav.projects": "Projets",
          "nav.achievements": "Réalisations",
          "nav.contact": "Contact",
          "exp.title": "Expérience en",
          "exp.subtitle": "TI",
          "exp.sp.role": "Stagiaire en Développement Logiciel",
          "exp.sp.period": "Mai 2025 - Jul 2025",
          "exp.sp.tasks": [
            "Développement full-stack d'un prototype fonctionnel de système web de pointage (PHP, MySQL, HTML, CSS, JavaScript, TypeScript, React), avec contrôle d'accès par rôle pour les employés, les administrateurs et le support, et gestion de versions avec Git et GitHub.",
            "Intégration de l'API Meta pour envoyer de façon sécurisée les liens et codes de récupération de mot de passe, améliorant la sécurité et l'ergonomie.",
            "Connexion de l'API OpenAI (GPT) pour permettre des requêtes en langage naturel sur la base de données.",
            "Mise en œuvre d'une logique métier complexe (calendrier dynamique pour le calcul des heures, système de tickets par chat) et conformité au droit du travail brésilien (CLT) et à l'ordonnance sur l'enregistrement du temps de travail (Portaria 671) grâce à une modélisation des données auditable."
          ],
          "exp.sp.captions": ["Jour de Télétravail", "Système Prototype", "Le Bureau"],
          "exp.sp.doc": "Documentation du projet",
          "exp.sp.docUrl": "https://skinny-protest-638.notion.site/Electronic-Time-Tracking-System-3373f2d9e43b80148ce6d1cb4740ea06",
          "exp.nsc.role": "Stagiaire en Informatique",
          "exp.nsc.period": "Sep 2024 - Mai 2025",
          "exp.nsc.tasks": [
            "Support aux utilisateurs de l'ERP JD Edwards et traitement d'environ 400 tickets dans ServiceNow conformément aux normes de sécurité.",
            "Conception de l'arborescence SharePoint, migration de plus de 1 000 documents depuis Confluence et rédaction d'une nouvelle documentation des systèmes.",
            "Création autonome de plus de 50 comptes utilisateurs (Active Directory, Google Admin) et ajustement des droits d'environ 20% du personnel."
          ],
          "exp.nsc.captions": ["Entrée Principale", "Premier Jour au Bureau", "Selfie au Bureau", "Journée de la Femme", "Carnaval", "Réunion des Stagiaires", "Réunion des Stagiaires 2"],
          "exp.flex.role": "Représentante du Service Client",
          "exp.flex.period": "Jun 2020 - Jul 2022",
          "exp.flex.tasks": [
            "Répondre aux appels téléphoniques concernant les problèmes de carte de crédit et aider les clients à résoudre les problèmes avec l'application.",
            "Aider les collègues à résoudre des problèmes complexes.",
            "Support client par chat.",
            "Utilisation de Salesforce pour vérifier les données clients et fournir des instructions précises."
          ],
          "exp.flex.captions": ["Entrée Principale", "Fin de la Formation Salesforce", "Noël"],
          "intl.title": "Expérience",
          "intl.subtitle": "Internationale",
          "intl.experiences": "expériences",
          "intl.brazil": "Brésil",
          "intl.brazil.jobs": [
            { "period": "2022-23", "role": "Responsable de Magasin", "company": "Cacau Show - Shopping Continente — São José", "description": "Géré les opérations quotidiennes du magasin en centre commercial. Dirigé le service client et les ventes. Contrôlé les stocks, l'agencement et la logistique. Formé et supervisé les nouveaux employés. Géré les documents et rapports avec Master Retail PDV." },
            { "period": "2018", "role": "Professeure d'Anglais", "company": "CAIC Prof. Febrônio Tancredo de Oliveira — Palhoça", "description": "Enseigné l'anglais à des collégiens (6e à 9e année). Conçu des examens et activités pour évaluer les progrès. Créé des jeux interactifs et activités créatives pour stimuler la participation." }
          ],
          "intl.portugal": "Portugal",
          "intl.portugal.jobs": [
            { "period": "2023-24", "role": "Opératrice de Ligne", "company": "Hanon Systems — Palmela, Setúbal", "description": "Travail sur la ligne de production de composants automobiles pour AutoEuropa (Groupe Volkswagen), suivant des normes strictes de qualité et de temps de cycle. Inspection technique des pièces pour assurer la conformité aux normes de l'industrie automobile. Collaboration dans un environnement industriel à haute cadence, maintenant productivité et sécurité opérationnelle." },
            { "period": "2023-24", "role": "Serveuse dans un Hôtel 5 Étoiles", "company": "Talenter — Lisbonne", "description": "Service haut de gamme dans un hôtel 5 étoiles et casino, couvrant petit-déjeuner, dîner et pauses café. Participation à de grands événements de l'hôtel et du casino. Service de vins et relations avec une clientèle internationale, exigeant une étiquette soignée et une maîtrise des langues. Gestion de plusieurs tables simultanément aux heures de pointe, maintenant qualité et satisfaction client." },
            { "period": "2023", "role": "Opératrice de Ligne", "company": "FIT - Fomento da Indústria do Tomate — Palmela, Setúbal", "description": "Travail sur une ligne de production de dérivés de tomate (sauces et concentrés), assurant la fluidité du conditionnement et de l'emballage. Application rigoureuse des normes d'hygiène et de sécurité alimentaire (HACCP). Inspection visuelle et technique du convoyeur pour identifier et retirer les produits non conformes." }
          ],
          "intl.germany": "Allemagne",
          "intl.germany.jobs": [
            { "period": "2026", "role": "Sortation Associate", "company": "Amazon — Euskirchen", "description": "Préparation des sacs de colis et chargement sur des chariots (12 sacs par chariot) pour la livraison. Mise en place des chariots, guidée par scanner, aux points de remise attribués aux livreurs. Gestion du cycle du matériel : récupération des chariots vides et préparation des sacs vides que l'équipe de nuit remplira." },
            { "period": "2025-26", "role": "Sortation Associate", "company": "Amazon — Aachen", "description": "Gestion de processus logistiques dans un centre de distribution à fort volume, avec un accent sur le Problem Solve et le contrôle qualité. Réalisation des processus Induct et Stow en garantissant l'exactitude des stocks. Préparation des sacs de colis et mise en place des chariots, guidées par scanner, pour les livreurs. Respect des objectifs de productivité et de sécurité au travail. Collaboration quotidienne au sein d'une équipe multilingue (langue de travail : anglais)." }
          ]
        }
      }
    },
    lng: "EN",
    fallbackLng: "EN",
    interpolation: { escapeValue: false }
  });

export default i18n;