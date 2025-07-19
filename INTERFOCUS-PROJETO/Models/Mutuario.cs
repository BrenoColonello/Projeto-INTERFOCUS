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
        [ValidCpf(ErrorMessage = "Cpf invalido")]
        public string Cpf { get; set; }


        [Required(ErrorMessage = "Data de Nascimento é obrigatório")]

        [IsAdult(ErrorMessage = "Necessário ser maior de 18 anos")]
        public DateTime Nascimento { get; set; }
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


        public float TotalEmAberto { get; set; }

        public virtual IList<Divida> DividasDoMutuario { get; set; } = new List<Divida>();

    }
} 