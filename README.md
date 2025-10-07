# 🧩 Sistema de Admissão de Funcionários

Este projeto é um **sistema de admissão de funcionários**, dividido em **dois módulos principais**:  
- **Módulo RH:** voltado para o time de Recursos Humanos, responsável pela criação e gestão dos processos de admissão.  
- **Módulo Colaborador:** acessado pelo futuro colaborador para envio de informações e documentos necessários à sua admissão.

> ⚠️ Este repositório contém **apenas o Front-end** da aplicação, desenvolvido em **React.js + TypeScript + Vite**.  
> O **Back-end** foi desenvolvido por **Gabriel Alan Shumabucoro** e está disponível em **https://github.com/Haise777**.  
>  
> O sistema é **integrado ao TOTVS Protheus**, onde as admissões são registradas após a validação final.

---

## 🚀 Tecnologias Utilizadas

- **React.js** – Biblioteca para construção da interface do usuário  
- **TypeScript** – Tipagem estática e maior segurança no desenvolvimento  
- **Vite** – Ferramenta de build rápida e moderna  
- **Axios** – Comunicação com a API  
- **React Router DOM** – Controle de rotas e navegação  
- **Tailwind CSS / Styled Components (se aplicável)** – Estilização da aplicação  

---

## 🧠 Visão Geral do Fluxo

O sistema de admissão segue um **fluxo dividido em etapas**, identificadas por letras:

### **A – Criação de Templates (RH)**
O usuário do RH cria **templates de vagas**, que contêm informações básicas reutilizáveis.  
Esses templates evitam que a equipe precise recriar as mesmas estruturas de vaga repetidamente.

---

### **B – Criação de Contratação (RH)**
Após criar o template, o RH inicia o processo de **contratação**, inserindo informações iniciais do colaborador, regras de documentação e dados específicos.  
Ao final desta etapa, um **link único é gerado**, que será enviado ao colaborador.

---

### **C – Envio de Informações (Colaborador)**
O colaborador acessa o link e preenche **todos os dados necessários**, além de **anexar documentos e comprovantes** exigidos para a admissão.

---

### **D – Validação de Processo (RH)**
Somente usuários autorizados do RH têm acesso à **página de validação**.  
Nesta etapa, é possível revisar todo o processo (A → C) e:
- ✅ **Validar e concluir** o processo, ou  
- ❌ **Rejeitar**, informando o motivo.

Se rejeitado, o processo retorna para as etapas **B e C**, permitindo que RH e colaborador façam as correções antes de uma nova validação.

---

### **E – Integração com o Protheus**
Após a validação, os dados são enviados ao **sistema TOTVS Protheus**.  
- Se aceito, a admissão é **concluída com sucesso**.  
- Se houver erro, o sistema captura a **mensagem de erro retornada pelo Protheus** e permite que o processo volte ao estado de rejeição para correção e novo envio.

---

## 🔗 Integração com o Back-end

Para que o sistema funcione corretamente, é necessário configurar a **URL base da API** (endpoint do back-end).  
No arquivo `.env`, adicione:

