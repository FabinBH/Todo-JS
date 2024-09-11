const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "Beber água",
    check: false
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite sua meta: " })

    if (meta.length == 0) {
        console.log("É preciso escrever uma meta!")
        return
    }

    metas.push(
        { value: meta, check: false}
    )
}

const start = async () => {

    while (true) {
        const opcao = await select({
            message: 'MENU >',
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastro"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
    
        switch (opcao) {
            case "cadastro":
                await cadastrarMeta()
                break;
            case "listar":
                console.log("Vamos listar")
                break;
            case "sair":
                return;
        }
    }

}

start()
