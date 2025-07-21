
--DROP SEQUENCE if exists cliente_seq cascade;
--DROP SEQUENCE if exists divida_seq cascade;
--drop table cliente, divida cascade;


CREATE SEQUENCE mutuario_seq;
CREATE SEQUENCE divida_seq;


CREATE TABLE IF NOT EXISTS mutuario(
	id INTEGER NOT NULL DEFAULT nextval('mutuario_seq') PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cpf CHAR(11) UNIQUE NOT NULL ,
	nascimento DATE NOT NULL,
	email VARCHAR(100)
	--limite_disponivel DECIMAL(8,2) NOT NULL DEFAULT 200
);

CREATE TABLE IF NOT EXISTS divida(
	id INTEGER NOT NULL DEFAULT nextval('divida_seq') PRIMARY KEY,
	valor DECIMAL(8,2) NOT NULL CHECK (valor > 0),
	situacao BOOL DEFAULT false,
	dataCriacao TIMESTAMP NOT NULL DEFAULT current_timestamp,
	dataPagamento TIMESTAMP CHECK (dataPagamento IS NULL OR dataPagamento > dataCriacao),
	descricao text not null,
	id_mutuario INTEGER NOT NULL REFERENCES mutuario(id) on delete cascade
);
