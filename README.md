# PHPDoc Generator para VSCode

PHPDoc Generator é uma extensão do Visual Studio Code que facilita a geração de documentação PHPDoc para funções e métodos PHP, utilizando a poderosa API de linguagem natural do GPT-3.5 Turbo da OpenAI.

## Características

- **Geração Automática de PHPDoc**: Seleciona uma função PHP no seu código e gera automaticamente um comentário PHPDoc para ela.
- **Integração com a API do GPT-3.5 Turbo**: Utiliza a capacidade avançada do modelo de linguagem GPT-3.5 Turbo para criar comentários precisos e detalhados.
- **Configuração de Chave API**: Permite que você insira sua própria chave da API da OpenAI para uso com a extensão.

## Pré-requisitos

- Visual Studio Code instalado.
- Chave API válida da OpenAI.

## Como Usar

1. **Instalação**: Instale a extensão PHPDoc Generator no Visual Studio Code.
2. **Configuração da Chave da API**: 
   - Use o comando "Inserir Chave da API da OpenAI para PHPDoc Generator" para configurar sua chave da API.
   - Você pode encontrar esta opção na paleta de comandos (`Ctrl+Shift+P` ou `Cmd+Shift+P` no Mac).
3. **Uso**:
   - Abra um arquivo PHP no editor.
   - Selecione a função ou método PHP para o qual deseja gerar o PHPDoc.
   - Execute o comando "Gerar PHPDoc" a partir da paleta de comandos.
   - O PHPDoc será inserido automaticamente acima da função ou método selecionado.

## Configuração

Para configurar a chave da API da OpenAI:

1. Abra a paleta de comandos.
2. Procure por "Inserir Chave da API da OpenAI para PHPDoc Generator".
3. Insira sua chave da API e confirme.

## Problemas Conhecidos

- A extensão só funciona em arquivos PHP e requer que o texto selecionado seja uma função ou método PHP válido.
- A precisão do PHPDoc gerado depende da qualidade do texto selecionado e da capacidade do modelo GPT-3.5 Turbo da OpenAI.

## Suporte

Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para criar uma issue no repositório do GitHub da extensão.
