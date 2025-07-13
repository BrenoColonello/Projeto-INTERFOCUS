using System.ComponentModel.DataAnnotations;
using INTERFOCUS_PROJETO.Models;
using INTERFOCUS_PROJETO.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace INTERFOCUS_API.Controllers
{
    [Route("api/[controller]")]
    public class MutuarioController : ControllerBase
    {
        private readonly MutuarioService mutuarioService;

        public MutuarioController(MutuarioService mutuarioService)
        {
            this.mutuarioService = mutuarioService;
        }

        [HttpGet]
        public IActionResult Listar(string query = null)
        {
            var mutuarios = query == null ? mutuarioService.Listar() : mutuarioService.Listar(query);
            return Ok(mutuarios);
        }

        [HttpGet("{id}")]
        public IActionResult GetOneMutuario(int id)
        {
            var mutuario = mutuarioService.GetMutuario(id);
            if (mutuario == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(mutuario);
            }
        }

        [HttpPost]
        public IActionResult Registrar([FromBody] Mutuario mutuario)
        {
            if (mutuario == null)
            {
                return BadRequest(ModelState);
            }
            var sucess = mutuarioService.Registrar(mutuario, out List<ValidationResult> erros);
            if (!sucess)
            {
                return UnprocessableEntity(erros);
            }

            return Ok(mutuario);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Mutuario mutuario)
        {
            if (mutuario == null)
            {
                return BadRequest(ModelState);
            }
            var sucesso = mutuarioService.Editar(mutuario,
                out List<ValidationResult> erros);

            if (sucesso == false)
            {
                return UnprocessableEntity(erros);
            }
            return Ok(mutuario);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var mutuario = mutuarioService.Excluir(id, out _);
            if (mutuario == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(mutuario);
            }
        }

    }
}
