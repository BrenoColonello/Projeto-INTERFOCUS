using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using INTERFOCUS_PROJETO.Models;
using Microsoft.Azure.Amqp;


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
            var Aluno = sessao.Query<Mutuario>()
                .Where(c => c.Codigo == id)
                .FirstOrDefault();
            if (Aluno == null)
            {
                erros.Add(new ValidationResult("Registro não encontrado",
                    new[] { "id" }));
                return null;
            }

            sessao.Delete(Aluno);
            transaction.Commit();
            return Aluno;
        }

    }


}