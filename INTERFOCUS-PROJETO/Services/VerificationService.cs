using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace INTERFOCUS_PROJETO.services
{
    public class VerificationService
    {
        public static string? calcularPrimeiroDigito(string cpf, out List<ValidationResult> erros)
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

        public static string? calcularSegundoDigito(string cpf, out List<ValidationResult> erros)
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

    public class ValidCpf : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {

            if (value is string)
            {
                    var erros = new List<ValidationResult>();
                string cpf = value.ToString()!;
                if (cpf.Length == 11)
            {
                StringBuilder componentesSb = new StringBuilder();
                for (int i = 0; i < 9; i++)
                {
                    componentesSb.Append(cpf[i]);
                }
                string? primeiroDigito = VerificationService.calcularPrimeiroDigito(cpf, out erros);
                if (erros.Count > 0)
                {
                    return false;
                }
                string componentes;
                componentes = componentesSb.Append(primeiroDigito).ToString();
                //segundo digito
                string? segundoDigito = VerificationService.calcularSegundoDigito(componentes, out erros);
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
            //! possivelmente tem erro
            return true;

        }
    }

    public class IsAdult : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is DateTime data)
            {
                if (DateTime.Today.AddYears(-18) < data)
                {
                    return false;
                }
                return true;
            }
            return false;
        }
    }
}
 