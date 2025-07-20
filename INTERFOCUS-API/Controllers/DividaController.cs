using Microsoft.AspNetCore.Mvc;
using INTERFOCUS_PROJETO.Services;
using System.ComponentModel.DataAnnotations;
using INTERFOCUS_PROJETO.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace INTERFOCUS_API.Controllers
{
    [Route("api/[controller]")]
    public class DividaController : ControllerBase
    {

        private readonly DividaService dividaService;

        public DividaController(DividaService dividaService)
        {
            this.dividaService = dividaService;
        }

        [HttpGet]
        public IActionResult Listar(int page = 1, string q = null)
        {
            var mutuarios = q == null ? dividaService.Listar(page) : dividaService.Listar(page, q);

            return Ok(mutuarios);

        }

        [HttpGet("{id}")]
        public IActionResult GetOneMutuario(int id)
        {
            var mutuario = dividaService.GetDivida(id);
            if (mutuario == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(mutuario);
            }
        }

        //FIXME possible problem
        [HttpPost]
        public IActionResult Registrar([FromBody] Divida divida)
        {
            if (divida == null)
            {
                return BadRequest(ModelState);
            }
            var sucess = dividaService.Registrar(divida, out List<ValidationResult> erros);
            if (!sucess)
            {
                return UnprocessableEntity(erros);
            }

            return Ok(divida);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Divida divida)
        {
            if (divida == null)
            {
                return BadRequest(ModelState);
            }
            var sucesso = dividaService.Editar(divida,
                out List<ValidationResult> erros);
            if (sucesso == false)
            {
                return UnprocessableEntity(erros);
            }
            return Ok(divida);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var divida = dividaService.Excluir(id, out _);
            if (divida == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(divida);
            }
        }

    }
}
