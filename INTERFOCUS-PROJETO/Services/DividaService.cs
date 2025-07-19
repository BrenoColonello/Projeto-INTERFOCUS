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

                Mutuario dono = sessao.Get<Mutuario>(divida.MutuarioDaDivida);
                if (dono == null)
                {
                    erros.Add(new ValidationResult("Mutuario não existe"));
                    return false;
                }

                if (divida.Situacao == false)
                {
                    var total = ComandoService.SomarDividas(dono);
                    total += divida.Valor;

                    if (total > 200)
                    {
                        erros.Add(new ValidationResult("Valor ultrapassa limite de 200 reais de divida por cliente"));
                        return false;
                    }
                }

                 using var transaction = sessao.BeginTransaction();


               // sessao.Merge(dono);
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

                Divida registrada = sessao.Get<Divida>(divida.Id);
                Mutuario dono = sessao.Get<Mutuario>(registrada.MutuarioDaDivida.Id);

                if (divida.Situacao == false)
                {
                    var total = ComandoService.SomarDividas(dono);
                    total = registrada.Situacao ? total : total - registrada.Valor;

                    if (total > 200 || (total + divida.Valor > 200))
                    {
                        return false;
                    }

                }

                sessao.Merge(divida);
                //sessao.Merge(dono);
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


            var dono = sessao.Get<Mutuario>(divida.MutuarioDaDivida.Id);
            dono.DividasDoMutuario.Remove(divida);
            // var dono = sessao.Get<Mutuario>(divida.MutuarioDaDivida);
            // dono.LimiteDisponivel += divida.Valor;

            sessao.Delete(divida);
            sessao.Merge(dono);
            transaction.Commit();
            return divida;
        }

        public List<Divida> Listar(int pagina)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
                .OrderBy(c => c.Id)
                .Skip((pagina - 1) * 10)
                .Take(10)

            .ToList();

            foreach (var divida in dividas)
            {
                divida.MutuarioDaDivida.DividasDoMutuario = null;
            }


            return dividas;
        }


        public List<Divida> Listar(int pagina, string busca)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
            .Where(c => c.Descricao.Contains(busca))
                .OrderBy(c => c.Id)
                .Skip((pagina - 1) * 10)
                .Take(10)
                .ToList();

            foreach (var divida in dividas)
            {
                divida.MutuarioDaDivida.DividasDoMutuario = null;
            }

            return dividas;
        }

        public Divida GetDivida(int id)
        {
            using var sessao = session.OpenSession();
            Divida divida = sessao.Get<Divida>(id);
            divida.MutuarioDaDivida.DividasDoMutuario = null!;
            return divida;
        }

    }
}
