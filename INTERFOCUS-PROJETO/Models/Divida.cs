
using System.ComponentModel.DataAnnotations;
using INTERFOCUS_PROJETO.Models;

public class Divida
{
    [Required]
    public int Id { get; set; }


    private int valor;

    [Required(ErrorMessage = "É necessário incluir um valor")]
    public int Valor
    {
        get { return valor; }
        set
        {
            if (value < 0)
            {
                throw new ArgumentOutOfRangeException("value", "Valor deve ser maior que 0");
            }
            valor = value;
        }
    }

    private bool situacao;
    public bool Situacao
    {
        get { return situacao; }
        set
        {

        }
    }

    private DateTime? datacriacao;
    public DateTime? DataCriacao
    {
        get { return datacriacao; }
        set
        {
            // if (datacriacao.CompareTo(DateTime.Now) > 0)
            // {
            //     throw new ArgumentException("Data de criação ")
            // }
            if (value.Value.CompareTo(DataPagamento) > 0 && DataPagamento.HasValue)
            {
                throw new ArgumentException("Data de criação não pode ocorrer após a data de pagamento");
            }
            datacriacao = value;
        }
    }

    private DateTime? datapagamento;
    public DateTime? DataPagamento
    {
        get { return datapagamento; }
        set
        {
            if (value.HasValue && value.Value.CompareTo(DataCriacao) < 0)
            {
                throw new ArgumentException("Data de pagamento não pode ocorrer antes da data de criação");
            }
            datapagamento = value;
        }
    }

    [Required(ErrorMessage = "É necessário fornecer descrição para a divida")]
    public string Descricao { get; set; }


    public virtual Mutuario DividaMutuario { get; set; }

}
