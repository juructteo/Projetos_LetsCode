create table Agencia (
	Id int generated always as identity,
	agencia varchar (6) not null,
	primary key (agencia)
)

insert into Agencia (agencia) values ('6585'),('5482'), ('4583')
select * from Agencia

create table Conta (
	id int generated always as identity,
	conta varchar (10) not null,
	codAgencia varchar,
	saldo decimal(10,2) default 0,
	ativada boolean default true,
	primary key (conta),
	constraint FK_Conta_Agencia foreign key (codAgencia) references Agencia(agencia)
)


insert into Conta (conta, codAgencia ,saldo) values ('101570',(select agencia from Agencia where id = 1),0),('524896',(select agencia from Agencia where id = 1),0),('524638',(select agencia from Agencia where id = 1),0),
		('547196', (select agencia from Agencia where id = 2),3500), ('442833', (select agencia from Agencia where Id = 2),1700)

select * from Conta


			
create table Cliente (
	Id int generated always as identity,
	nome varchar (60) not null,
	cpf varchar (14) not null,
	agenciaId varchar,
	contaId varchar,
	email varchar (60) not null,
	senha varchar (500) not null,
	dtNasciment date not null,
	validado boolean not null default false,
	excluido boolean not null default false,
	primary key (cpf),
	constraint FK_Cliente_Agencia foreign key (agenciaId) references Agencia(agencia),
	constraint FK_Cliente_Conta foreign key (contaId) references Conta (conta)
) 


insert into Cliente (nome, cpf, email, senha, dtNasciment,agenciaId,contaId) 
values ('Julia Téo','224.558.695-54','julia@email','Jujub@','24-01-1995', '6585', '101570')

insert into Cliente (nome, cpf, email, senha, dtNasciment,agenciaId,contaId) 
values ('Leandro Patricio','224.882.487-54','leandro@email','senha123','27-08-1992', '6585','524896'),
('Danilo Téo','885.158.487-45','danilo@email','senha789','26-08-1996', '5482','547196'),
('Paula Patricio','885.882.852-45','paula@email','senha000','13-01-1990','5482', '442833')

select * from Cliente


update Conta set saldo = 1500 where id = (select id from Conta where conta = '101570')
update Conta set saldo = 2000 where id = (select id from Conta where conta = '524896')


-----Item 1--------------

create view TotalAgencias as
select m.agencia, count(*) as Qtd, sum(p.saldo) as ValorTotal from Agencia m
inner join Conta p on m.agencia = p.codAgencia
group by p.codAgencia, m.agencia

select * from TotalAgencias



-----Item 2-------------------

create table Transferencias (
	id int generated always as identity,
	agenciaIDorigem varchar, 
	contaIDorigem varchar,
	agenciaIDdestino varchar,
	contaIDdestino varchar,
	valorTrans int not null,
	dtaTransferencia date not null,
	primary key (id),
	constraint FK_Transferencias_AOrigem foreign key (agenciaIDorigem) references Agencia (agencia),
	constraint FK_Transferencias_ADestino foreign key (agenciaIDdestino) references Agencia (agencia),
	constraint FK_Transferencias_COrigem foreign key (contaIDorigem) references Conta (conta),
	constraint FK_Transferencias_CDestino foreign key (contaIDdestino) references Conta (conta)
	
)

insert into Transferencias (agenciaIDorigem, contaIDorigem,agenciaIDdestino,contaIDdestino, valorTrans,dtaTransferencia)
values ( '6585','101570', '5482','442833', 150, '10-05-2022')


create view histTransf as
select 
	agenciaIDorigem,
	contaIDorigem,
	agenciaIDdestino,
	contaIDdestino,
	valorTrans,
	to_char(dtaTransferencia, 'DD/MM/YYYY')
	
	from Transferencias
	
	select * from histTransf 
	
------Item 3----------
create or replace procedure transacoes (contaIDorigem varchar,contaIDdestino varchar, valorTrans dec)
language plpgsql
as $$
begin 
	update Conta set saldo = saldo - valorTrans
	where conta = contaIDorigem;

	update Conta set saldo = saldo + valorTrans
	where conta = contaIDdestino;
	
	insert into Transferencias ( contaIDorigem, contaIDdestino, valorTrans, dtaTransferencia)
	values (contaIDorigem, contaIDdestino, valorTrans, now());
	
	commit;
	
end;$$



call transacoes ('101570','442833',100)
call transacoes ('442833','524638',100)

----Item 4---------

select c.conta, count(*) as Qtd, sum(tr.valorTrans) as exportacao, sum(te.valorTrans) as importacao from Conta as c
left join transferencias as tr on c.conta = tr.contaIDorigem
left join transferencias as te on c.conta = te.contaiddestino 
group by c.conta






drop table Cliente cascade
drop table conta cascade
drop table AgenciaConta
drop table transferencias  cascade
drop procedure transacoes
drop table Agencia


create or replace function transferencia (agenciaIDOrigem int, agenciaIDDestino int, contaIDOrigem int, contaIDDestino int, valor int) returns void
language plpgsql as 
$$
begin
    if valor < 0 then 
        valor = -valor;
    end if;

    if ((select saldo from conta where id = contaIDOrigem ) - valor <0) then
        RAISE EXCEPTION 'Saldo insuficiente';
    else
        update conta set saldo = saldo - valor
        where id = contaIDOrigem;


        update conta set saldo = saldo + valor
        where id = contaIDDestino;

        insert into historicoTransacao (agenciaOrigem, agenciaDestino, contaOrigem, contaDestino, tipo, dtTransacao, valor) 
        values (agenciaIDOrigem, agenciaIDDestino, contaIDOrigem, contaIDDestino, 'Transferencia', now(), valor); 
    end if;
end $$;

