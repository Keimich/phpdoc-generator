const vscode = require('vscode');
const OpenAI = require('openai');

function activate(context) {
	let disposable = vscode.commands.registerCommand('phpdoc-generator.gerarPHPDoc', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Nenhuma função PHP selecionada');
			return;
		}

		if (editor.document.languageId !== 'php') {
			vscode.window.showInformationMessage('O comando PHPDoc Generator só pode ser usado em arquivos PHP.');
			return;
		}

		const text = getText(editor);
		if (!text && !text.includes('function')) {
			vscode.window.showInformationMessage('Por favor, selecione uma função PHP antes de gerar o PHPDoc.');
			return;
		}

		const phpDoc = await send2GPT(text);
		if (phpDoc && phpDoc !== false && phpDoc != 'False') {
			await insertPHPDoc(phpDoc, editor);
		}
	});

	context.subscriptions.push(disposable);

	let disposableKey = vscode.commands.registerCommand('phpdoc-generator.insertApiKey', async function () {
		const apiKey = await vscode.window.showInputBox({
			placeHolder: "Insira a chave da API da OpenAI aqui",
			prompt: "Insira sua chave da API da OpenAI para usar com o PHPDoc Generator",
			ignoreFocusOut: true
		});

		if (apiKey) {
			const config = vscode.workspace.getConfiguration('phpdoc-generator');
			await config.update('openaiApiKey', apiKey, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage('Chave da API da OpenAI salva com sucesso.');
		}
	});

	context.subscriptions.push(disposableKey);
}

function deactivate() { }

function getText(editor) {
	const selection = editor.selection;
	const text = editor.document.getText(selection);
	return text;
}

async function send2GPT(texto) {
	const config = vscode.workspace.getConfiguration('phpdoc-generator');
	const apiKey = config.get('openaiApiKey');

	if (!apiKey) {
		vscode.window.showInformationMessage('Por favor, configure sua chave da API da OpenAI nas configurações da extensão PHPDoc Generator.');
		return false;
	}

	const openai = new OpenAI({ apiKey });

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{
				"role": "user", "content": `Retorne APENAS o PHPDoc (com o máximo de informações e boas praticas de documentação) para a função/método abaixo.

				função/método:
				\n\n${texto}\n\n/
				
				Use o trecho de codigo abaixo como referencia para criar o PHPDoc:
				/**
				 * Calcula a soma dos quadrados de um array
				 *
				 * Faz um loop sobre cada elemento da matriz, eleva-o ao quadrado e adiciona-o ao total. 
				 * Retorna total.
				 * 
				 * Esta função também pode ser implementada usando array_reduce();
				 * 
				 * @param array $arr
				 * @return int
				 * @throws Exception Se o elemento na matriz não for um número inteiro
				 */`
			}],
		});

		if (response.choices && response.choices.length > 0 && response.choices[0].message.content.trim() !== '') {
			const phpDoc = response.choices[0].message.content.trim();
			return phpDoc;
		} else {
			vscode.window.showInformationMessage('Não foi possível gerar o PHPDoc para essa função/método.');
			return false;
		}
	} catch (error) {
		console.error('Erro ao enviar requisição para a API do ChatGPT:', error);
		vscode.window.showErrorMessage('Erro ao enviar requisição para a API do ChatGPT');
		return false;
	}
}

async function insertPHPDoc(phpDoc, editor) {
	const selection = editor.selection;
	const start = new vscode.Position(selection.start.line, 0);

	await editor.edit(editBuilder => {
		editBuilder.insert(start, phpDoc + "\n");
	});
}

module.exports = {
	activate,
	deactivate
};
