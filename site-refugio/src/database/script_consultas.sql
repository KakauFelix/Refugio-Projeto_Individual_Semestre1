-- drop database refugio;
use refugio;

select * from usuario;
select * from filmesSeries;
select * from curtidas;

select filmesSeries.*, count(idCurtida) as qtd_curtidas,  statusCurtida as curtidaUsuario from filmesSeries
left join curtidas on curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
where fkUsuario = 2
group by idFilmeSerie, titulo, anoLancamento, sinopse, fkCategoria, fkGenero, imgCapa, statusCurtida;

select filmesSeries.*, count(idCurtida) as qtd_curtidas, ifnull(statusCurtida, 0)  as curtidaUsuario from filmesSeries
left join curtidas on curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
-- where fkUsuario = 2 and curtidaUsuario = null
group by idFilmeSerie, titulo, anoLancamento, sinopse, fkCategoria, fkGenero, imgCapa, statusCurtida;

select fkUsuario, statusCurtida from curtidas 
left join filmesSeries on fkFilmeSerie = idFilmeSerie 
group by fkUsuario, statusCurtida;

select fkUsuario, statusCurtida from curtidas 
right join filmesSeries on fkFilmeSerie = idFilmeSerie group by fkUsuario, statusCurtida;

insert into curtidas values
	(1, 2, 1, 1),
	(1, 2, 2, 0),
	(1, 1, 2, 1);


SELECT filmesSeries.*, COUNT(curtidas.idCurtida) AS quantidade_curtidas,
    (CASE WHEN curtidas.idCurtida IS NULL THEN 0 ELSE 1 END) AS usuario_curtiu
FROM filmesSeries
LEFT JOIN curtidas ON filmesSeries.idFilmeSerie = curtidas.fkFilmeSerie
    AND curtidas.fkUsuario = 2
GROUP BY idFilmeSerie, titulo, anoLancamento, sinopse, fkCategoria, fkGenero, imgCapa;


    
-- Consultando quantas postagens existem noo banco 
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
LEFT JOIN categoria ON filmesSeries.fkCategoria - categoria.idCategoria;
