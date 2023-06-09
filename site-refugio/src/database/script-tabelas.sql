CREATE DATABASE  refugio;
USE refugio;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    tpUsuario TINYINT NOT NULL,
    CONSTRAINT ckTpUsuario CHECK (tpUsuario IN (0 , 1)),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(25) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    imgUsuario VARCHAR(100)
);

CREATE TABLE categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(50) NOT NULL
);

CREATE TABLE genero (
    idGenero INT PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(50) NOT NULL
);

CREATE TABLE filmesSeries (
    idFilmeSerie INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    anoLancamento INT(4) NOT NULL,
    sinopse VARCHAR(500) NOT NULL,
    fkCategoria INT NOT NULL,
    CONSTRAINT fkCategoriaFilme FOREIGN KEY (fkCategoria)
        REFERENCES categoria (idCategoria),
    fkGenero INT NOT NULL,
    CONSTRAINT fkGeneroFilme FOREIGN KEY (fkGenero)
        REFERENCES genero (idGenero),
    imgCapa VARCHAR(100) NOT NULL
);

CREATE TABLE produtor (
    idProdutor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE producao (
    idProducao INT AUTO_INCREMENT NOT NULL,
    fkFilmeSerie INT NOT NULL,
    CONSTRAINT fkSerieFilmeProducao FOREIGN KEY (fkFilmeSerie)
        REFERENCES filmesSeries (idFilmeSerie),
    fkRoteirista INT NOT NULL,
    CONSTRAINT fkRoteiristaProducao FOREIGN KEY (fkRoteirista)
        REFERENCES produtor (idProdutor),
    fkDiretor INT NOT NULL,
    CONSTRAINT fkDiretorProducao FOREIGN KEY (fkDiretor)
        REFERENCES produtor (idProdutor),
    dtProducao DATE NOT NULL,
    CONSTRAINT pkProducao PRIMARY KEY (idProducao , fkFilmeSerie , fkRoteirista , fkDiretor)
);

CREATE TABLE curtidas (
    idCurtida INT AUTO_INCREMENT NOT NULL,
    fkUsuario INT NOT NULL,
    CONSTRAINT fkUsuarioCurtida FOREIGN KEY (fkUsuario)
        REFERENCES usuario (idUsuario),
    fkFilmeSerie INT NOT NULL,
    CONSTRAINT fkSerieFilmeCurtida FOREIGN KEY (fkFilmeSerie)
        REFERENCES filmesSeries (idFilmeSerie),
    statusCurtida TINYINT NOT NULL,
    CONSTRAINT ckStatusCurtida CHECK (statusCurtida IN (0 , 1)),
    CONSTRAINT pkCurtida PRIMARY KEY (idCurtida , fkUsuario , fkFilmeSerie)
);

CREATE TABLE favoritos (
    idFavorito INT AUTO_INCREMENT NOT NULL,
    fkUsuario INT NOT NULL,
    CONSTRAINT fkUsuarioFavorito FOREIGN KEY (fkUsuario)
        REFERENCES usuario (idUsuario),
    fkGenero INT,
    CONSTRAINT fkGeneroFavorito FOREIGN KEY (fkGenero)
        REFERENCES genero (idGenero),
    fkFilmeSerie INT,
    CONSTRAINT fkSerieFilmeFavorito FOREIGN KEY (fkFilmeSerie)
        REFERENCES filmesSeries (idFilmeSerie),
    CONSTRAINT pkFavorito PRIMARY KEY (idFavorito , fkUsuario)
);

CREATE TABLE postagemForum (
    idPostagemForum INT AUTO_INCREMENT NOT NULL,
    fkUsuario INT NOT NULL,
    CONSTRAINT fkUsuarioPostagem FOREIGN KEY (fkUsuario)
        REFERENCES usuario (idUsuario),
    dataHora DATETIME NOT NULL,
    mensagem VARCHAR(500) NOT NULL,
    CONSTRAINT pkPostagemForum PRIMARY KEY (idPostagemForum , fkUsuario)
);
