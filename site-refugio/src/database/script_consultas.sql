-- drop database refugio;
use refugio;

select * from usuario;
select * from filmesSeries;
select * from curtidas;
select * from postagemForum;
select * from produtor;
select * from genero;
select * from categoria;

    
-- Consultando quantas postagens existem no banco 
SELECT COUNT(*) AS qtd_postagens_forum FROM postagemForum;

-- Consulta dos filmes e series  para exibir no acervo
SELECT filmesSeries.*, 
    IFNULL(curtidas.qtdCurtidas, 0) AS qtdCurtidas,
    IFNULL(curtidas.usuarioCurtiu, 0) AS usuarioCurtiu
FROM filmesSeries
LEFT JOIN 
    (SELECT fkFilmeSerie, COUNT(*) AS qtdCurtidas, 
		MAX(CASE WHEN fkUsuario = 2 THEN 1 ELSE 0 END) AS usuarioCurtiu
    FROM curtidas GROUP BY fkFilmeSerie) 
    curtidas ON filmesSeries.idFilmeSerie = curtidas.fkFilmeSerie;
    
--
SELECT filmesSeries.idFilmeSerie, 
	filmesSeries.titulo, 
	filmesSeries.imgCapa, 
    IFNULL(curtidas.qtdCurtidas, 0) AS qtdCurtidas,
    IFNULL(curtidas.usuarioCurtiu, 0) AS usuarioCurtiu
FROM filmesSeries
LEFT JOIN 
    (SELECT fkFilmeSerie, COUNT(*) AS qtdCurtidas, 
		MAX(CASE WHEN fkUsuario = 2 THEN 1 ELSE 0 END) AS usuarioCurtiu
    FROM curtidas GROUP BY fkFilmeSerie) 
    curtidas ON filmesSeries.idFilmeSerie = curtidas.fkFilmeSerie
ORDER BY filmesSeries.titulo;

--
SELECT filmesSeries.*, 
	genero.genero, 
    categoria.categoria,
    IFNULL(curtidas.qtdCurtidas, 0) AS qtdCurtidas,
    IFNULL(curtidas.usuarioCurtiu, 0) AS usuarioCurtiu
FROM filmesSeries
LEFT JOIN 
    (SELECT fkFilmeSerie, COUNT(*) AS qtdCurtidas, 
		MAX(CASE WHEN fkUsuario = 2 THEN 1 ELSE 0 END) AS usuarioCurtiu
    FROM curtidas GROUP BY fkFilmeSerie) 
    curtidas ON filmesSeries.idFilmeSerie = curtidas.fkFilmeSerie
LEFT JOIN genero ON filmesSeries.fkGenero = genero.idGenero
LEFT JOIN categoria ON filmesSeries.fkCategoria - categoria.idCategoria
ORDER BY filmesSeries.titulo;

-- Consulta do ranking de filmes e series
SELECT filmesSeries.titulo, 
	COUNT(idCurtida) AS qtdCurtidas
FROM filmesSeries
LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
GROUP BY filmesSeries.titulo
ORDER BY qtdCurtidas DESC
LIMIT 5;

-- Consulta do ranking de gêneros
SELECT genero.genero, 
	COUNT(idCurtida) AS qtdCurtidas
FROM genero
LEFT JOIN filmesSeries ON filmesSeries.fkGenero = genero.idGenero
LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
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

-- insert into postagemForum values (null, 3, '2023-05-26 10:00:00', 'Que Loucura...'); 

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

truncate table curtidas;

SELECT usuario.*,
	COUNT(idCurtida) AS qtd_curtidas,
	COUNT(idPostagemForum) AS qtd_postagens
FROM usuario
LEFT JOIN curtidas ON curtidas.fkUsuario = usuario.idUsuario
LEFT JOIN postagemForum ON postagemForum.fkUsuario = usuario.idUsuario
WHERE username = 'usercomum' AND senha = '1234'
GROUP BY idUsuario , tpUsuario , nome , email , username , senha , imgUsuario;

UPDATE curtidas SET statusCurtida = 0
        WHERE fkFilmeSerie = 1 AND fkUsuario = 2;   

 --
 SELECT 
    fs.idFilmeSerie, 
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