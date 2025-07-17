using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using INTERFOCUS_PROJETO.Models;

namespace INTERFOCUS_PROJETO.Services

{
    public class ComandoService
    {
        public static float SomarDividas(Mutuario mutuario)
        {
            float soma = 0;
            foreach (var divida in mutuario.DividasDoMutuario)
            {
                if (divida.Situacao == false)
                {
                    soma += divida.Valor;
                }
            }
            return soma;
        }
    }
}