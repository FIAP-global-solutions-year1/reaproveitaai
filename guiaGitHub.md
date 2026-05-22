📑 Guia de Versionamento e Fluxo de Trabalho (Git / GitHub)
Metodologia de Desenvolvimento de Software do Grupo

1. Estratégia de Branches (Ramificações)
Para garantir a organização e que o código de ninguém seja perdido ou sobrescrevido acidentalmente, utilizaremos o seguinte padrão:

Temos diferentes tipos de branch:
main: 
// É a nossa branch de produção. A principal. NINGUÉM deve enviar commit ou push de código diretamente para ela! Ela contém apenas as versões prontas e que foram testadas antes na branch dev!

dev:
// É a nossa branch de integração de desenvolvimento. Tudo o que terminarmos de fazer nas nossas branches pessoais será reunido aqui para testes conjuntos.

branch pessoal: 
// Cada integrante do grupo deve ter uma branch pessoal própria, baseada na dev, para trabalhar livremente sem interferir no código dos outros.

Exemplo: feature-pedro, feature-joao, feature-lucas -- ou: branch-ph, branch-arthur, branch-ronaldinho

2. Fluxo de Trabalho Diário (Passo a Passo)
SEMPRE, ao iniciar uma tarefa ou continuar desenvolvendo, SEGUIR ESTES PASSOS:

ATUALIZE SEU AMBIENTE LOCAL COM O CÓDIGO MAIS RECENTE QUE O GRUPO INTEGROU NA BRANCH DEV:

// MUDE PARA A BRANCH DEV LOCAL: 
git checkout dev

// ATUALIZE AS NOVIDADES DA BRANCH DEV DE ORIGEM (Github) PARA A BRANCH DEV LOCAL (VScode): 
git pull origin dev

// AGORA, PARA ATUALIZAR A SUA BRANCH PESSOAL:

// VOLTE PARA A SUA BRANCH PESSOAL: 
git checkout nome-branch-pessoal

Por exemplo: git checkout branch-ph

// MESCLE AS ATUALIZAÇÕES DA BRANCH DEV COM A SUA BRANCH PESSOAL: 
git merge dev

// A partir de agora, pode continuar seu desenvolvimento e fazer suas alterações nos arquivos do projeto.
// Depois, PARA SALVAR e ENVIAR o seu progresso para o GitHub: 

// VERIFIQUE O STATUS ATUAL DOS SEUS ARQUIVOS MODIFICADOS:
git status

// CERTIFIQUE-SE QUE ESTA NA SUA BRANCH PESSOAL PRIMEIRO:
git checkout nome-branch-pessoal

Por exemplo: git checkout branch-ph

// ADICIONE OS ARQUIVOS A SEREM ENVIADOS:
git add .

// SALVA (como um snapshot) O SEU ENVIO JUNTO DE UM COMENTARIO:
git commit -m "Mensagem descritiva/explicativa"

// ENVIA TODOS SEUS COMMITS PARA A SUA BRANCH PESSOAL DE ORIGEM (Github):
git push origin nome-branch-pessoal

Por exemplo: git push origin branch-ph

///// UNINDO SUAS ALTERAÇÕES FEITAS NA SUA BRANCH PESSOAL COM A BRANCH DEV:
Agora é o momento de verificar se está tudo ok para mesclar e juntar os códigos que vc mandou pra sua branch pessoal, no github, junto com a branch dev, também no github.

Para isso: 
// Acesse o painel do projeto no github.
// Acesse o menu de "Pull Requests".
// Clique em "New pull request". 
// No menu superior, selecione, respectivamente:
    base: dev
    compare: sua-branch-pessoal
// Selecionado a 'base' e o 'compare' corretamente, clique no botão "Create pull request".
// Coloque um título explicativo/descritivo para seu Pull Request.
// Clique novamente em "Create pull request".
// Após a criar, o GitHub fará uma verificação automática.
// Se estiver tudo certo, clique no botão "Merge pull request".
// Para finalizar, clique em "Confirm merge".

(veja a legenda de comandos abaixo).

3. Legenda e Guia Rápido de Comandos
SIGNIFICADO E FUNÇÃO de cada comando que usamos no dia a dia:

📥 Preparando e Salvando Alterações Locais:

git status
// O que faz: Mostra o estado atual do seu diretório de trabalho. Ele exibe quais arquivos foram modificados, quais foram criados e o que está pronto para ser salvo. Use sempre antes de commitar.

git add .
// O que faz: Prepara todas as modificações e novos arquivos do diretório atual para serem incluídos no próximo commit (salvamento). O ponto (.) indica "tudo".

git commit -m "Mensagem descritiva/explicativa"
// O que faz: Cria um ponto de salvamento na história do projeto com as alterações que foram preparadas pelo git add. A mensagem entre aspas deve ser curta e descrever exatamente o que foi feito (ex: git commit -m "Estrutura inicial do HTML do Reaproveita Ai").

🔀 Navegando e Criando Branches:

git branch
// O que faz: Lista todas as branches existentes no seu repositório local e indica em qual delas você está trabalhando no momento.

git checkout [nome-da-branch]
// O que faz: Muda o seu ambiente de trabalho para a branch especificada.

Exemplo: git checkout dev faz você mudar para a branch de desenvolvimento.

git checkout -b [nome-da-nova-branch]
// O que faz: Cria uma nova branch com o nome especificado e muda automaticamente para ela. Apenas o primeiro integrante precisará criar a branch dev usando isso.

Exemplo: git checkout -b feature-pedro

🚀 Sincronizando com o GitHub (Remoto):

git pull origin [nome-da-branch]
// O que faz: Puxa e mescla as alterações que estão no repositório remoto (GitHub) para a sua branch local atual. Essencial para garantir que você não está trabalhando em código desatualizado.

git push origin [nome-da-branch]
// O que faz: Envia os seus commits locais para o repositório remoto no GitHub, permitindo que os outros membros do grupo vejam e utilizem o seu código.

Exemplo: git push origin feature-pedro

4. Regras de Boa Convivência no Git
Commits Pequenos e Frequentes: Não faça alterações gigantescas para commitar tudo de uma vez. Faça uma pequena parte (ex: criar um formulário), teste e faça o commit.

Nunca mexa na branch do colega: Se precisar de algo que está na branch do outro, peça para ele subir para a dev e faça o processo de atualização (item 2 do guia).

Comunicação antes do Merge: Quando alguém terminar uma funcionalidade em sua branch pessoal e der o push, avise no grupo do WhatsApp antes de abrir um Pull Request para juntar o código na branch dev.