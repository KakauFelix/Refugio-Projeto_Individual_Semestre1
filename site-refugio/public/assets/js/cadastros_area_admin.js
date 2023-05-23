fetch("/genero/listar").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            // var feed = document.getElementById("feed_container");
            // var mensagem = document.createElement("span");
            // mensagem.innerHTML = "Nenhum resultado encontrado."
            // feed.appendChild(mensagem);   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";
            select_genero_filme.innerHTML = `
                <option value="0" disabled selected>Selecione...</option>
            `;

            for (let i = 0; i < resposta.length; i++) {
                var genero = resposta[i];

                select_genero_filme.innerHTML += `
                    <option value="${genero.idGenero}">${genero.genero}</option>
                `;
            }

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

fetch("/categoria/listar").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            // var feed = document.getElementById("feed_container");
            // var mensagem = document.createElement("span");
            // mensagem.innerHTML = "Nenhum resultado encontrado."
            // feed.appendChild(mensagem);   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";
            select_categoria_filme.innerHTML = `
                <option value="0" disabled selected>Selecione...</option>
            `;

            for (let i = 0; i < resposta.length; i++) {
                var categoria = resposta[i];

                select_categoria_filme.innerHTML += `
                    <option value="${categoria.idCategoria}">${categoria.categoria}</option>
                `;
            }

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

fetch("/produtor/listar").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            // var feed = document.getElementById("feed_container");
            // var mensagem = document.createElement("span");
            // mensagem.innerHTML = "Nenhum resultado encontrado."
            // feed.appendChild(mensagem);   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";
            select_roteirista_filme.innerHTML = `
                <option value="0" disabled selected>Selecione...</option>
            `;

            select_diretor_filme.innerHTML = `
                <option value="0" disabled selected>Selecione...</option>
            `;

            for (let i = 0; i < resposta.length; i++) {
                var produtor = resposta[i];

                select_roteirista_filme.innerHTML += `
                    <option value="${produtor.idProdutor}">${produtor.nome}</option>
                `;

                select_diretor_filme.innerHTML += `
                    <option value="${produtor.idProdutor}">${produtor.nome}</option>
                `;
            }

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

function cadastrarFilmeSerie() {
    var tituloVar = ipt_titulo_filme.value;
    var anoLancamentoVar = ipt_data_lancamento.value;
    var generoVar = select_genero_filme.value;
    var categoriaVar = select_categoria_filme.value;
    var roteiristaVar = select_roteirista_filme.value;
    var diretorVar = select_diretor_filme.value;
    var sinopseVar = ipt_sinopse.value;
    var imgCapa = ipt_img_capa.value;

    console.log(imgCapa);

    const formData = new FormData();
    formData.append('imgCapa', ipt_img_capa.files[0]);
    formData.append('titulo', tituloVar);
    formData.append('anoLancamento', anoLancamentoVar);
    formData.append('genero', generoVar);
    formData.append('categoria', categoriaVar);
    formData.append('roteirista', roteiristaVar);
    formData.append('diretor', diretorVar);
    formData.append('sinopse', sinopseVar);

    if (tituloVar == "" || anoLancamentoVar == "" || generoVar == "" || categoriaVar == "", roteiristaVar == "" || diretorVar == "" || sinopseVar == "" || imgCapa == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else if (anoLancamentoVar >= 1895 && anoLancamentoVar.length != 4) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ano inválido.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        fetch("/filmeSerie/have", {
            method: "POST",
            body : formData
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "cadastros.html";
                }, "1500")

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }

}

function cadastrarProdutor() {
    var nomeProdutorVar = ipt_nome_produtor.value;

    if (nomeProdutorVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        // Enviando o valor da nova input
        fetch("/produtor/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeProdutorServer: nomeProdutorVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "cadastros.html";
                }, "1500")

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;

    }

}

function cadastrarGenero() {
    var nomeGeneroVar = ipt_nome_genero.value;

    if (nomeGeneroVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        // Enviando o valor da nova input
        fetch("/genero/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeGeneroServer: nomeGeneroVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "cadastros.html";
                }, "1500")

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;

    }

}

function cadastrarCategoria() {
    var nomeCategoriaVar = ipt_nome_categoria.value;

    if (nomeCategoriaVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        // Enviando o valor da nova input
        fetch("/categoria/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeCategoriaServer: nomeCategoriaVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "cadastros.html";
                }, "1500")

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;

    }
    
}