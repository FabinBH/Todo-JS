const start = () => {
    while (true) {
        let opcao = "cadastro"
        switch (opcao) {
            case "cadastro":
                console.log("Vamos cadastrar")
                break;
            case "listar":
                console.log("Vamos listar")
                break;
            case "sair":
                break;
        }
    }
}

start()
