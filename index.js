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
    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Selecione suas metas",
        choices: [...metas],
        instructions: false
    })
    
    metas.forEach((m) => {
        m.check = false
    })

    if (respostas.length == 0) {
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.check = true
    })

    console.log("Meta(s) concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.check
    })

    if (realizadas.length == 0) {
        console.log("Não há metas realizadas")
        return
    }

    await select({
        message: "Metas realizadas -> " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.check
    })

    if (abertas.length == 0) {
        console.log("Não há metas abertas")
        return
    }

    await select({
        message: "Metas abertas -> " + abertas.length,
        choices: [...abertas]
    })
}

const excluirMetas = async () => {
    const excluidas = metas.map((meta) => {
        return { value: meta.value, check: false }
    })

    const itensExcluidos = await checkbox({
        message: "Selecione as metas que deseja excluir",
        choices: [...metas],
        instructions: false
    })

    if (itensExcluidos.length == 0) {
        console.log("Não há itens para excluir")
    }

    itensExcluidos.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) excluída(s) com sucesso")
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Excluir metas",
                    value: "excluir"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "excluir":
                await excluirMetas()
                break
            case "sair":
                return
        }
    }

}

start()
