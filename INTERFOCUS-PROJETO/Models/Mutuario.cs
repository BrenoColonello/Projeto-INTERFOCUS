using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INTERFOCUS_PROJETO.Models
{
    public class Mutuario
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "CPF é obrigatório")]

        private string cpf;
        public string Cpf
        {
            get { return cpf; }
            set
            {
                if (verificarCpf(value, out List<ValidationResult> erros))
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
        public DateOnly Nascimento { get; set; }
        public string? Email { get; set; }



        private bool verificarCpf(string cpf, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            if (cpf.Length == 11)
            {
                StringBuilder componentesSb = new StringBuilder();

                for (int i = 0; i < 9; i++)
                {
                    componentesSb.Append(cpf[i]);
                }

                string? primeiroDigito = calcularPrimeiroDigito(cpf, out erros);
                if (erros.Count > 0)
                {
                    return false;
                }
                string componentes;
                componentes = componentesSb.Append(primeiroDigito).ToString();
                //segundo digito
                string? segundoDigito = calcularSegundoDigito(componentes, out erros);

                if (erros.Count > 0)
                {
                    return false;
                }

                componentesSb.Append(segundoDigito);
                string verificador = componentesSb.ToString();

                return verificador.Equals(cpf);

            }
            else
            {
                erros.Add(new ValidationResult($"Tamnho esperado era 11 digitos porem foi inserido {cpf.Length} digitos"));
                return false;
            }
        }

        private string? calcularPrimeiroDigito(string cpf, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            int total = 0;
            int pos = 0;
            for (int multiplicador = 10; multiplicador >= 2; multiplicador--)
            {
                string digito = cpf[pos].ToString();
                int valor;
                if (int.TryParse(digito, out valor) == false)
                {
                    erros.Add(new ValidationResult($"Não é possivel realizar a conversão de {digito} para inteiro"));
                    return null;
                }
                total += valor * multiplicador;
                pos++;
            }
            int primeiroDigito = total % 11;
            if (primeiroDigito < 2)
            {
                primeiroDigito = 0;
            }
            else
            {
                primeiroDigito = 11 - primeiroDigito;

            }
            return primeiroDigito.ToString();
        }

        
    
     private string? calcularSegundoDigito(string cpf, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            int total = 0;
            int pos = 0;
            for (int peso = 11; peso >= 2; peso--)
            {
                string digito = cpf[pos].ToString();

                if (int.TryParse(digito, out int valor) == false)
                {
                    erros.Add(new ValidationResult($"Erro ao converter{digito} para inteiro"));
                    return null;
                }

                total += (valor * peso);
                pos++;
            }
            int verificador = total % 11;
            if (verificador < 2)
            {
                verificador = 0;
            }
            else
            {
                verificador = 11 - verificador;
            }
            return verificador.ToString();
        }


    }
}