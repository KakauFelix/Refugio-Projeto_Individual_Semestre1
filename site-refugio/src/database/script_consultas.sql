use refugio;

select * from usuario;
select * from filmesSeries;
select * from curtidas;
select * from postagemForum;
select * from produtor;
select * from genero;
select * from categoria;

-- Buscando a quantidade de curtidas por genero 
SELECT genero.genero,
	COUNT(idCurtida) as qtdCurtidas
FROM genero
LEFT JOIN filmesSeries ON filmesSeries.fkGenero = genero.idGenero
LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
WHERE curtidas.statusCurtida = 1
GROUP BY genero.genero;
    
-- Consultando quantas postagens existem no banco 
SELECT COUNT(*) AS qtd_postagens_forum FROM postagemForum;

-- Consulta dos filmes e series  para exibir no acervo
 SELECT fs.idFilmeSerie, 
    fs.titulo, 
    fs.imgCapa, 
    IFNULL(c.quantidadeCurtidas, 0) AS qtdCurtidas,
    IFNULL(c.statusCurtida, 0) AS statusCurtida
FROM filmesSeries fs
LEFT JOIN 
    (SELECT fkFilmeSerie, 
        COUNT(*) AS quantidadeCurtidas,
        MAX(CASE WHEN fkUsuario = 2 THEN statusCurtida ELSE 0 END) AS statusCurtida
    FROM curtidas WHERE curtidas.statusCurtida = 1
    GROUP BY fkFilmeSerie) c ON fs.idFilmeSerie = c.fkFilmeSerie;
    
-- Consulta do ranking de filmes e series
SELECT filmesSeries.titulo, 
	COUNT(idCurtida) AS qtdCurtidas
FROM filmesSeries
LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
WHERE curtidas.statusCurtida = 1
GROUP BY filmesSeries.titulo
ORDER BY qtdCurtidas DESC
LIMIT 5;

-- Consulta do ranking de gêneros
SELECT genero.genero, 
	COUNT(idCurtida) AS qtdCurtidas
FROM genero
LEFT JOIN filmesSeries ON filmesSeries.fkGenero = genero.idGenero
LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
WHERE curtidas.statusCurtida = 1
GROUP BY genero.genero
ORDER BY qtdCurtidas DESC
LIMIT 3;

-- Consulta das postagens e o username dos seus respectivos usuarios
SELECT postagemForum.idPostagemForum, 
	usuario.username,
	DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
    postagemForum.mensagem
FROM postagemForum
JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
ORDER BY dataHora;

-- Consulta das postagens e o username dos seus respectivos usuarios de uma data especifica
SELECT postagemForum.idPostagemForum, 
	usuario.username,
	DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
    postagemForum.mensagem
FROM postagemForum
JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
WHERE postagemForum.dataHora LIKE '2023-05-26%'
ORDER BY dataHora;

-- Consulta das postagens e o username dos seus respectivos usuarios de um usuario especifico
SELECT postagemForum.idPostagemForum, 
	usuario.username,
	DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
    postagemForum.mensagem
FROM postagemForum
JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
WHERE usuario.username = 'mateus'
ORDER BY dataHora;

-- Consulta para buscar as informações de um filme especifico
SELECT filmesSeries.idFilmeSerie, 
	filmesSeries.titulo, 
	filmesSeries.anoLancamento, 
	filmesSeries.sinopse, 
	filmesSeries.imgCapa, 
	genero.genero, 
    categoria.categoria,
    roteirista.nome as roteirista,
    diretor.nome as diretor
FROM filmesSeries
LEFT JOIN genero ON filmesSeries.fkGenero = genero.idGenero
LEFT JOIN categoria ON filmesSeries.fkCategoria - categoria.idCategoria
LEFT JOIN produtor as roteirista ON filmesSeries.fkRoteiristaPrincipal = roteirista.idProdutor
LEFT JOIN produtor as diretor ON filmesSeries.fkDiretorPrincipal = diretor.idProdutor
WHERE filmesSeries.idFilmeSerie = 1;

-- Buscar curtida de um filme e usuario especifico
SELECT * FROM curtidas
WHERE fkFilmeSerie = 2 AND fkUsuario = 2;

-- Buscar a qtde de curtidas e de postagens de um determinado usuario
SELECT 
    (SELECT COUNT(*) FROM curtidas WHERE fkUsuario = 2 AND statusCurtida = 1) AS qtdCurtidas,
    (SELECT COUNT(*) FROM postagemForum WHERE fkUsuario = 2) AS qtdPostagens
FROM usuario WHERE idUsuario = 2;

-- Burcar filmes curtidos por um determinado usuario
SELECT filmesSeries.* FROM filmesSeries
JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
WHERE curtidas.fkUsuario = 2 AND curtidas.statusCurtida = 1;

SELECT fs.idFilmeSerie, 
	fs.titulo, 
	fs.imgCapa, 
	IFNULL(c.quantidadeCurtidas, 0) AS qtdCurtidas,
	IFNULL(c.statusCurtida, 0) AS statusCurtida
FROM filmesSeries fs
LEFT JOIN 
	(SELECT fkFilmeSerie, 
		COUNT(*) AS quantidadeCurtidas,
		MAX(CASE WHEN fkUsuario = 2 THEN statusCurtida ELSE 0 END) AS statusCurtida
	FROM curtidas WHERE curtidas.statusCurtida = 1
	GROUP BY fkFilmeSerie) c ON fs.idFilmeSerie = c.fkFilmeSerie
JOIN curtidas ON curtidas.fkFilmeSerie = fs.idFilmeSerie
WHERE curtidas.fkUsuario = 2 AND curtidas.statusCurtida = 1
ORDER BY fs.titulo;
