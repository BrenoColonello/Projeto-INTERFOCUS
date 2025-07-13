using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using NHibernate;
using INTERFOCUS_PROJETO.Models;
using NHibernate.Linq;

namespace INTERFOCUS_PROJETO.Services
{
    public class DividaService
    {
        private readonly ISessionFactory session;
        public DividaService(ISessionFactory session)
        {
            this.session = session;
        }

        public static bool Validar(Divida divida, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(divida,
                new ValidationContext(divida),
                erros,
                true
            );
            return valido;
        }

        public bool Registrar(Divida divida, out List<ValidationResult> erros)
        {
            if (Validar(divida, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Save(divida);
                transaction.Commit();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Editar(Divida divida, out List<ValidationResult> erros)
        {
            if (Validar(divida, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Merge(divida);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public Divida Excluir(int id, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var divida = sessao.Query<Divida>()
                .Where(c => c.Id == id)
                .FirstOrDefault();
            if (divida == null)
            {
                erros.Add(new ValidationResult("Registro não encontrado",
                    new[] { "id" }));
                return null;
            }

            sessao.Delete(divida);
            transaction.Commit();
            return divida;
        }

        public List<Divida> Listar()
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
            //.Fetch(d => d.DividaCliente)
            //.ThenFetch(c => c.DividasDoCliente)
            .ToList();

            return dividas;
        }


        public List<Divida> Listar(string busca)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
            .Where(c => c.Descricao.Contains(busca))
                //.Fetch(c => c.DividaCliente)
                //.ThenFetch(c => c.DividasDoCliente) //||
                //c.Email.Contains(busca)).Fetch(c => c.DividasDoCliente)
                .OrderBy(c => c.Id)
                .ToList();
            return dividas;
        }

        public Divida GetDivida(int id)
        {
            using var sessao = session.OpenSession();
            Divida divida = sessao.Get<Divida>(id);
            return divida;
        }

    }
}
