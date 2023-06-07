fetch(`/filmeSerie/listar/${sessionStorage.getItem("ID_USUARIO")}`).then(function (resposta) {
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

            for (let i = 0; i < resposta.length; i++) {
                var filmeSerie = resposta[i];

                tbody_filme_serie.innerHTML += `
                    <tr>
                        <td id="campo_id">${filmeSerie.idFilmeSerie}</td>
                        <td>${filmeSerie.titulo}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_info.png" alt="icone de editar" onclick="abrirModalInfoFilme(${filmeSerie.idFilmeSerie})"></td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="abrirModalEditarFilme(${filmeSerie.idFilmeSerie})"></td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_excluir.png" alt="icone de excluir" onclick="excluirFilmeSerie(${filmeSerie.idFilmeSerie})"></td>
                    </tr>
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

            for (let i = 0; i < resposta.length; i++) {
                var produtor = resposta[i];

                tbody_produtor.innerHTML += `
                    <tr>
                        <td id="campo_id">${produtor.idProdutor}</td>
                        <td>${produtor.nome}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="abrirModalEditarProdutor(${produtor.idProdutor}, '${produtor.nome}')"></td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_excluir.png" alt="icone de excluir" onclick="excluirProdutor(${produtor.idProdutor})"></td>
                    </tr>
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

            for (let i = 0; i < resposta.length; i++) {
                var genero = resposta[i];

                tbody_genero.innerHTML += `
                    <tr>
                        <td id="campo_id">${genero.idGenero}</td>
                        <td>${genero.genero}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="abrirModalEditarGenero(${genero.idGenero}, '${genero.genero}')"></td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_excluir.png" alt="icone de editar" onclick="excluirGenero(${genero.idGenero})"></td>
                    </tr>
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

            for (let i = 0; i < resposta.length; i++) {
                var categoria = resposta[i];

                tbody_categoria.innerHTML += `
                    <tr>
                        <td id="campo_id">${categoria.idCategoria}</td>
                        <td>${categoria.categoria}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="abrirModalEditarCategoria(${categoria.idCategoria}, '${categoria.categoria}')"></td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_excluir.png" alt="icone de editar" onclick="excluirCategoria(${categoria.idCategoria})"></td>
                    </tr>
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

function excluirProdutor(idProdutor) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja excluir esse campo?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
            fetch(`/produtor/deletar/${idProdutor}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    swal({
                        icon: 'success',
                        title: 'Deletado!',
                        text: 'Seu arquivo foi excluído.',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location = "filmes_series.html"
                    });
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swal({
                icon: 'error',
                title: 'Cancelado!',
                text: 'Seu arquivo está a salvo :)',
                showConfirmButton: true
            });

        }
      });
}

function excluirGenero(idGenero) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja excluir esse campo?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
            fetch(`/genero/deletar/${idGenero}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    swal({
                        icon: 'success',
                        title: 'Deletado!',
                        text: 'Seu arquivo foi excluído.',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location = "filmes_series.html"
                    });
                    // window.location = "filmes_series.html"
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swal({
                icon: 'error',
                title: 'Cancelado!',
                text: 'Seu arquivo está a salvo :)',
                showConfirmButton: true
            });

        }
      });
}

function excluirCategoria(idCategoria) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja excluir esse campo?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
            fetch(`/categoria/deletar/${idCategoria}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    swal({
                        icon: 'success',
                        title: 'Deletado!',
                        text: 'Seu arquivo foi excluído.',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location = "filmes_series.html"
                    });
                    // window.location = "filmes_series.html"
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swal({
                icon: 'error',
                title: 'Cancelado!',
                text: 'Seu arquivo está a salvo :)',
                showConfirmButton: true
            });

        }
      });
}

function excluirFilmeSerie(idFilmeSerie) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja excluir esse campo?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
            fetch(`/filmeSerie/deletar/${idFilmeSerie}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
        
                if (resposta.ok) {
                    swal({
                        icon: 'success',
                        title: 'Deletado!',
                        text: 'Seu arquivo foi excluído.',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location = "filmes_series.html";
                    });
                    // window.location = "filmes_series.html"
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swal({
                icon: 'error',
                title: 'Cancelado!',
                text: 'Seu arquivo está a salvo :)',
                showConfirmButton: true
            });

        }
      });
}

function abrirModalEditarFilme(idFilmeSerie) {
    div_modal_editar.style.display = 'flex';

    fetch(`/filmeSerie/buscarInformacoes/${idFilmeSerie}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_modal_editar.innerHTML = `
                <center>
                    <span class="msgNadaEncontrado">
                        Não existe ou não foi encontrado postagens de filmes... :)
                    </span><br>
                    <button class="btnLimparFiltros" onclick="limparFiltros()">Recarregar Página</button>
                </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
            
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var filmeSerie = resposta[0];

                fetch("/genero/listar").then(function (resposta) {
                    if (resposta.ok) {
                        if (resposta.status == 204) {
                            console.log("Nenhum resultado encontrado.");
                            throw "Nenhum resultado encontrado!!";
                        }
                
                        resposta.json().then(function (resposta) {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));
                
                            select_genero_filme.innerHTML += `
                                <option value="0" disabled>Selecione...</option>
                            `;
                
                            for (let i = 0; i < resposta.length; i++) {
                                var genero = resposta[i];    

                                if (genero.idGenero == filmeSerie.idGenero) {
                                    select_genero_filme.innerHTML += `
                                        <option value="${genero.idGenero}" selected>${genero.genero}</option>
                                    `;
                                    
                                } else {
                                    select_genero_filme.innerHTML += `
                                        <option value="${genero.idGenero}">${genero.genero}</option>
                                    `;
                                }
                            }
                        });
                    } else {
                        throw ('Houve um erro na API!');
                    }
                }).catch(function (resposta) {
                    console.error(resposta);
                });

                fetch("/categoria/listar").then(function (resposta) {
                    if (resposta.ok) {
                        if (resposta.status == 204) { 
                            console.log("Nenhum resultado encontrado.");
                            throw "Nenhum resultado encontrado!!";
                        }
                
                        resposta.json().then(function (resposta) {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));
                
                            select_categoria_filme.innerHTML = `
                                <option value="0" disabled>Selecione...</option>
                            `;
                
                            for (let i = 0; i < resposta.length; i++) {
                                var categoria = resposta[i];

                                if (categoria.idCategoria == filmeSerie.idCategoria) {
                                    select_categoria_filme.innerHTML += `
                                        <option value="${categoria.idCategoria}" selected>${categoria.categoria}</option>
                                    `;
                                    
                                } else {
                                    select_categoria_filme.innerHTML += `
                                        <option value="${categoria.idCategoria}">${categoria.categoria}</option>
                                    `;
                            
                                }
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
                            console.log("Nenhum resultado encontrado.");
                            throw "Nenhum resultado encontrado!!";
                        }
                
                        resposta.json().then(function (resposta) {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));
                
                            select_roteirista_filme.innerHTML = `
                                <option value="0" disabled selected>Selecione...</option>
                            `;
                
                            select_diretor_filme.innerHTML = `
                                <option value="0" disabled selected>Selecione...</option>
                            `;
                
                            for (let i = 0; i < resposta.length; i++) {
                                var produtor = resposta[i];

                                if (produtor.nome == filmeSerie.roteirista) {
                                    select_roteirista_filme.innerHTML += `
                                        <option value="${produtor.idProdutor}" selected>${produtor.nome}</option>
                                    `;
                                } else {
                                    select_roteirista_filme.innerHTML += `
                                        <option value="${produtor.idProdutor}">${produtor.nome}</option>
                                    `;
                                    
                                }

                                if (produtor.nome == filmeSerie.diretor) {
                                    select_diretor_filme.innerHTML += `
                                        <option value="${produtor.idProdutor}" selected>${produtor.nome}</option>
                                    `;

                                } else {
                                    select_diretor_filme.innerHTML += `
                                        <option value="${produtor.idProdutor}">${produtor.nome}</option>
                                    `;
                                    
                                }
                
                
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
    
                div_modal_editar.innerHTML = `
                    <div class="box_modal">
                        <img src="../../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalEditar()" alt="icone fechar">
                        <div class="div_update_filme_serie">
                            <form class="forms_update_filme_serie">
                                <h2>Atualizar Filme/Serie <hr></h2>
                                <label>Titulo:</label>
                                <input type="text" id="ipt_titulo_filme" value="${filmeSerie.titulo}">
                                <div class="div_2campos">
                                    <div class="campo_div_2campos">
                                        <label>Imagem de Capa:</label>
                                        <input type="file" id="ipt_img_capa" value="../images/area-restrita/acervo/${filmeSerie.imgCapa}">
                                    </div>
                                    <div class="campo_div_2campos">
                                        <label>Ano de Lançamento:</label>
                                        <input type="number" id="ipt_data_lancamento" min="1895" value="${filmeSerie.anoLancamento}">
                                    </div>
                                </div>
                                <div class="div_2campos">
                                    <div class="campo_div_2campos">
                                        <label>Gênero:</label>
                                        <select id="select_genero_filme"></option>
                                        </select>
                                    </div>
                                    <div class="campo_div_2campos">
                                        <label>Categoria:</label>
                                        <select id="select_categoria_filme"></select>
                                    </div>
                                </div>
                                <label>Roteirista Principal:</label>
                                <select id="select_roteirista_filme"></select>
                                <label>Diretor Principal:</label>
                                <select id="select_diretor_filme"></select>
                                <label>Sinopse:</label>
                                <textarea id="ipt_sinopse" cols="30" rows="5" maxlength="700">${filmeSerie.sinopse}</textarea>
                            </form>
                            <button class="btnAtualizar" onclick="atualizarFilmeSerie(${filmeSerie.idFilmeSerie})">Atualizar filme/serie</button>
                        </div>
                    </div>
                `;

                console.log(ipt_img_capa.value);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function fecharModalEditar() {
    div_modal_editar.style.display = 'none';
}

function atualizarFilmeSerie(idFilmeSerie) {
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

    if (tituloVar == "" || anoLancamentoVar == "" || generoVar == "" || categoriaVar == "", roteiristaVar == "" || diretorVar == "" || sinopseVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else if (imgCapa == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Carregue a imagem de capa novamente para atualizar.',
            showConfirmButton: true,
        });
        
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
        fetch(`/filmeSerie/atualizar/${idFilmeSerie}`, {
            method: "PUT",
            body : formData
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Filme/Serie atualizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "filmes_series.html";
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

function abrirModalEditarProdutor(idProdutor, nomeProdutor) {
    div_modal_editar.style.display = 'flex';
    
    div_modal_editar.innerHTML = `
        <div class="box_modal">
            <img src="../../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalEditar()" alt="icone fechar">
            <div class="div_updates">
                <form>
                    <h2>Atualize o Roteirista ou Diretor <hr></h2>
                    <label>Nome:</label>
                    <input type="text" id="ipt_nome_produtor" value="${nomeProdutor}">
                </form>
                <button class="btnAtualizar" onclick="atualizarProdutor(${idProdutor})">Atualizar Produtor</button>
            </div>
        </div>
    `;
    
}

function atualizarProdutor(idProdutor) {
    var nomeProdutorVar = ipt_nome_produtor.value;

    if (nomeProdutorVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        
    } else {
        fetch(`/produtor/atualizar/${idProdutor}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeProdutor: nomeProdutorVar
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produtor atualizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "filmes_series.html";
                }, "1500");
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a atualização! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
    }
}

function abrirModalEditarGenero(idGenero, genero) {
    div_modal_editar.style.display = 'flex';
    
    div_modal_editar.innerHTML = `
        <div class="box_modal">
            <img src="../../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalEditar()" alt="icone fechar">
            <div class="div_updates">
                <form>
                    <h2>Atualize o Gênero <hr></h2>
                    <label>Nome:</label>
                    <input type="text" id="ipt_nome_genero" value="${genero}">
                </form>
                <button class="btnAtualizar" onclick="atualizarGenero(${idGenero})">Atualizar Genero</button>
            </div>
        </div>
    `;
    
}

function atualizarGenero(idGenero) {
    var generoVar = ipt_nome_genero.value;

    if (generoVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        
    } else {
        fetch(`/genero/atualizar/${idGenero}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                genero: generoVar
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Gênero atualizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "filmes_series.html";
                }, "1500");
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a atualização! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
    }
}

function abrirModalEditarCategoria(idCategoria, categoria) {
    div_modal_editar.style.display = 'flex';
    
    div_modal_editar.innerHTML = `
        <div class="box_modal">
            <img src="../../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalEditar()" alt="icone fechar">
            <div class="div_updates">
                <form>
                    <h2>Atualize a Categoria <hr></h2>
                    <label>Nome:</label>
                    <input type="text" id="ipt_nome_categoria" value="${categoria}">
                </form>
                <button class="btnAtualizar" onclick="atualizarCategoria(${idCategoria})">Atualizar Categoria</button>
            </div>
        </div>
    `;
    
}

function atualizarCategoria(idCategoria) {
    var categoriaVar = ipt_nome_categoria.value;

    if (categoriaVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        
    } else {
        fetch(`/categoria/atualizar/${idCategoria}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoria: categoriaVar
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categoria atualizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "filmes_series.html";
                }, "1500");
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a atualização! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
    }
}

function abrirModalInfoFilme(idFilmeSerie) {
    console.log(idFilmeSerie);
    
    fetch(`/filmeSerie/buscarInformacoes/${idFilmeSerie}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_modal_filme.innerHTML = `
                <center>
                    <span class="msgNadaEncontrado">
                        Não existe ou não foi encontrado postagens de filmes... :)
                    </span><br>
                </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
            
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var filmeSerie = resposta[0];

                div_modal_filme.innerHTML = `
                    <div class="box_modal">
                        <img src="../../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalFilme()" alt="icone fechar">
                        <div class="dados_filme">
                            <img class="img_capa" src="../../assets/images/area-restrita/acervo/${filmeSerie.imgCapa}" alt="capa do filme">
                            <div>
                                <h2>${filmeSerie.titulo} <hr></h2>
                                <p><b>Ano de Lançamento:</b> ${filmeSerie.anoLancamento}</p>
                                <p><b>Gênero:</b> ${filmeSerie.genero}</p>
                                <p><b>Categoria:</b>  ${filmeSerie.categoria}</p>
                                <p><b>Roteiro:</b> ${filmeSerie.roteirista}</p>
                                <p><b>Diretor:</b>  ${filmeSerie.diretor}</p>
                            </div>
                        </div>
                        <div><hr></div>
                        <div>
                            <p>${filmeSerie.sinopse}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });

    div_modal_filme.style.display = 'flex';
}

function fecharModalFilme() {
    div_modal_filme.style.display = 'none';
}