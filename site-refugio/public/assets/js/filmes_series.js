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

            for (let i = 0; i < resposta.length; i++) {
                var produtor = resposta[i];

                tbody_produtor.innerHTML += `
                    <tr>
                        <td id="campo_id">${produtor.idProdutor}</td>
                        <td>${produtor.nome}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="editarProdutor(${produtor.idProdutor})"></td>
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

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";

            for (let i = 0; i < resposta.length; i++) {
                var genero = resposta[i];

                tbody_genero.innerHTML += `
                    <tr>
                        <td id="campo_id">${genero.idGenero}</td>
                        <td>${genero.genero}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="editarGenero(${genero.idGenero})"></td>
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

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";

            for (let i = 0; i < resposta.length; i++) {
                var categoria = resposta[i];

                tbody_categoria.innerHTML += `
                    <tr>
                        <td id="campo_id">${categoria.idCategoria}</td>
                        <td>${categoria.categoria}</td>
                        <td id="campo_icons"><img src="../../assets/images/icons/icon_editar.png" alt="icone de editar" onclick="editarCategoria(${categoria.idCategoria})"></td>
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