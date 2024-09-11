const { select, input, checkbox } = require('@inquirer/prompts')

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Selecione suas metas",
        choices: [...metas],
        instructions: false
    })

    if (respostas.length == 0) {
        return
    }

    metas.forEach((m) => {
        m.check = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.check = true
    })

    console.log("Meta(s) concluída(s)")
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
                await listarMetas()
                break;
            case "sair":
                return;
        }
    }

}

start()
