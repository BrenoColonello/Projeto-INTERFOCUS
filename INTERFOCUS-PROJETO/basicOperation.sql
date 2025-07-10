-- Mutuario
insert into mutuario (nome, cpf, nascimento, email) 
	values ('Breno', '47446709898', '2003-10-03', 'brenosony1@gmail.com');
select * from mutuario;

-- Divida
insert into divida (valor, situacao, descricao, id_mutuario)
	values
	(5000,FALSE, 'comprinha teste do banco', 1);

select * from divida;