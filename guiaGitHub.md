📑 Guia de Versionamento e Fluxo de Trabalho (Git / GitHub)
Metodologia de Desenvolvimento de Software do Grupo

1. Estratégia de Branches (Ramificações)
Para garantir a organização e que o código de ninguém seja perdido ou sobrescrevido acidentalmente, utilizaremos o seguinte padrão:

main: É a nossa branch de produção. Ninguém deve commitar ou empurrar código diretamente para ela. Ela conterá apenas as versões prontas e testadas que serão enviadas para a avaliação dos professores.

dev: É a nossa branch de integração de desenvolvimento. Tudo o que terminarmos de fazer nas nossas branches pessoais será reunido aqui para testes conjuntos.

Branches Pessoais: Cada integrante do grupo terá uma branch própria baseada na dev para trabalhar livremente sem interferir no código dos outros.

Exemplo: feature-pedro, feature-joao, feature-lucas.

2. Fluxo de Trabalho Diário (Passo a Passo)
Sempre que você for iniciar uma nova tarefa ou continuar o seu desenvolvimento, siga estritamente estes passos:

Atualize seu ambiente local com o código mais recente que o grupo integrando na dev:

Mude para a dev: git checkout dev

Puxe as novidades: git pull origin dev

Volte para a sua branch pessoal e traga as atualizações da dev para ela:

Mude para sua branch: git checkout feature-seu-nome

Mescle as atualizações: git merge dev

Faça suas alterações nos arquivos do projeto.

Salve e envie o seu progresso para o GitHub (veja a legenda de comandos abaixo).

3. Legenda e Guia Rápido de Comandos
Aqui está o significado e a função de cada comando que utilizaremos no dia a dia do nosso projeto acadêmico:

📥 Preparando e Salvando Alterações Locais
git status

O que faz: Mostra o estado atual do seu diretório de trabalho. Ele exibe quais arquivos foram modificados, quais foram criados e o que está pronto para ser salvo. Use sempre antes de commitar.

git add .

O que faz: Prepara todas as modificações e novos arquivos do diretório atual para serem incluídos no próximo commit (salvamento). O ponto (.) indica "tudo".

git commit -m "Mensagem explicativa"

O que faz: Cria um ponto de salvamento na história do projeto com as alterações que foram preparadas pelo git add. A mensagem entre aspas deve ser curta e descrever exatamente o que foi feito (ex: git commit -m "Estrutura inicial do HTML do Reaproveita Ai").

🔀 Navegando e Criando Branches
git branch

O que faz: Lista todas as branches existentes no seu repositório local e indica em qual delas você está trabalhando no momento.

git checkout [nome-da-branch]

O que faz: Muda o seu ambiente de trabalho para a branch especificada.

Exemplo: git checkout dev faz você mudar para a branch de desenvolvimento.

git checkout -b [nome-da-nova-branch]

O que faz: Cria uma nova branch com o nome especificado e muda automaticamente para ela. Apenas o primeiro integrante precisará criar a branch dev usando isso.

Exemplo: git checkout -b feature-pedro

🚀 Sincronizando com o GitHub (Remoto)
git pull origin [nome-da-branch]

O que faz: Puxa e mescla as alterações que estão no repositório remoto (GitHub) para a sua branch local atual. Essencial para garantir que você não está trabalhando em código desatualizado.

git push origin [nome-da-branch]

O que faz: Envia os seus commits locais para o repositório remoto no GitHub, permitindo que os outros membros do grupo vejam e utilizem o seu código.

Exemplo: git push origin feature-pedro

4. Regras de Boa Convivência no Git
Commits Pequenos e Frequentes: Não faça alterações gigantescas para commitar tudo de uma vez. Faça uma pequena parte (ex: criar um formulário), teste e faça o commit.

Nunca mexa na branch do colega: Se precisar de algo que está na branch do outro, peça para ele subir para a dev e faça o processo de atualização (item 2 do guia).

Comunicação antes do Merge: Quando alguém terminar uma funcionalidade em sua branch pessoal e der o push, avise no grupo do WhatsApp antes de abrir um Pull Request para juntar o código na branch dev.