using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using INTERFOCUS_PROJETO.services;
using INTERFOCUS_PROJETO.Services;

namespace INTERFOCUS_PROJETO.Models
{
    public class Mutuario

    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        [StringLength(100, ErrorMessage = "Nome acima da quantidade de caracteres permitidos")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "CPF é obrigatório")]
        private string cpf;
        public string Cpf
        {
            get { return cpf; }
            set
            {
                if (VerificationService.VerificarCpf(value, out List<ValidationResult> erros))
                {
                    cpf = value;
                }
                else
                {
                    Console.WriteLine(erros);
                    throw new ArgumentException("CPF inválido!");
                }
            }
        }


        [Required(ErrorMessage = "Data de Nascimento é obrigatório")]
        private DateTime nascimento;

        public DateTime Nascimento
        {
            get { return nascimento; }

            set
            {
                if (VerificationService.VerificarNascimento(value, out List<ValidationResult> erros) == false)
                {
                    Console.WriteLine(erros);
                    throw new ArgumentException("Data incorreta");
                }
                nascimento = value;
            }
        }
        private string email = null;
        public string? Email
        {
            get { return email; }
            set
            {
                if (value != null)
                {
                    email = value.ToLower();
                }
            }
        }

        public virtual IList<Divida> DividasDoMutuario { get; set; } = new List<Divida>();

    }
}