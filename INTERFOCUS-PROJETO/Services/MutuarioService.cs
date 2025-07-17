using System.ComponentModel.DataAnnotations;
using INTERFOCUS_PROJETO.Models;
using NHibernate;
using NHibernate.Linq;


namespace INTERFOCUS_PROJETO.Services

{

    public class MutuarioService
    {
        private readonly ISessionFactory session;
        public MutuarioService(ISessionFactory session)
        {
            this.session = session;
        }

        public static bool Validar(Mutuario mutuario, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(mutuario,
                new ValidationContext(mutuario),
                erros,
                true
            );
            return valido;
        }

        public bool Registrar(Mutuario mutuario, out List<ValidationResult> erros)
        {
            if (Validar(mutuario, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Save(mutuario);
                transaction.Commit();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Editar(Mutuario mutuario, out List<ValidationResult> erros)
        {
            if (Validar(mutuario, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();

                foreach (var divida in mutuario.DividasDoMutuario)
                {
                    divida.MutuarioDaDivida = mutuario;
                }


                sessao.Merge(mutuario);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public Mutuario Excluir(int id, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var mutuario = sessao.Query<Mutuario>()
                .Where(c => c.Id == id).Fetch(c => c.DividasDoMutuario)
                .FirstOrDefault();
            if (mutuario == null)
            {
                erros.Add(new ValidationResult("Registro não encontrado",
                    new[] { "id" }));
                return null;
            }

            sessao.Delete(mutuario);
            transaction.Commit();
            return mutuario;
        }

        //TODO Paginamento, skip e take

        public List<Mutuario> Listar(int page)
        {
            using var sessao = session.OpenSession();
            var mutuarios = sessao.Query<Mutuario>()
                       .ToList();

            mutuarios = mutuarios.OrderByDescending(c => ComandoService.SomarDividas(c))
            .Skip((page - 1) * 10)
            .Take(10)
            .ToList();

            return mutuarios;
        }

        public List<Mutuario> Listar(string busca, int page)
        {
            using var sessao = session.OpenSession();
            var mutuarios = sessao.Query<Mutuario>()
                .Where(c => c.Nome.Contains(busca) ||
                            c.Email.Contains(busca)
                            )
                .OrderBy(c => c.Id)
                .ToList();

            mutuarios = mutuarios.OrderByDescending(c => ComandoService.SomarDividas(c))
            .Skip((page - 1) * 10)
            .Take(10)
            .ToList();

            return mutuarios;
        }

        public Mutuario GetMutuario(int id)
        {
            using var sessao = session.OpenSession();
            Mutuario mutuario = sessao.Query<Mutuario>()
            .Where(c => c.Id == id)
            .FirstOrDefault();
            return mutuario;
        }


    }
}


