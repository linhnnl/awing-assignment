using FindChest.Models;
using FindChest.Services;
using FindChest.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FindChest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FindChestController : ControllerBase
    {
        private readonly FindChestBDContext _context;
        public FindChestController(FindChestBDContext context)
        {
            _context = context;
        }

        // POST: api/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateMap([FromBody] MapViewModel mapVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int n = mapVM.RowCount;
            int m = mapVM.ColumnCount;
            int p = mapVM.ChestTypeCount;

            if (p > n * m)
            {
                return BadRequest(new { message = "ChestTypeCount must be less than or equal to RowCount × ColumnCount." });
            }

            int treasureCount = 0;
            foreach (var row in mapVM.MapData)
            {
                if (row == null)
                {
                    return BadRequest(new { message = "Invalid Input" });
                }

                foreach (var val in row)
                {
                    if (val == p) treasureCount++;
                    if (val < 1 || val > p)
                    {
                        return BadRequest(new { message = $"Matrix must only contain values between 1 and {p}" });
                    }
                }
            }

            if (treasureCount != 1)
            {
                return BadRequest(new { message = $"Only one treasure chest of type {p} is allowed on the map." });
            }
            mapVM.MinFuel = FindMinFuelService.FindMinFuel(mapVM.MapData, p);

            Map map = mapVM.ToModel();
            _context.Maps.Add(map);
            await _context.SaveChangesAsync();

            return Ok(map);
        }

        // GET: api/listmap
        [HttpGet("listmap")]
        public async Task<IActionResult> SearchMap(int? row, int? column, int? typeCount)
        {
            var listmaps = await _context.Maps
                .FromSqlInterpolated($"CALL listMap({row}, {column}, {typeCount})")
                .ToListAsync();
            return Ok(listmaps);
        }

        // GET: api/getbyid
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMapById(int id)
        {
            var map = await _context.Maps.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }
            return Ok(map);
        }

        // GET: api/updateMinFuel
        [HttpPost("updateminfuel/{id}")]
        public async Task<IActionResult> UpdateMinFuel(int id)
        {
            var map = await _context.Maps.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }

            var p = map.ChestTypeCount;
            var data = JsonSerializer.Deserialize<List<List<int>>>(map.MapData);
            var newMinFuel = FindMinFuelService.FindMinFuel(data, p);

            _context.Maps.FromSqlRaw("CALL UpdateMinFuel({0}, {1})",id, newMinFuel);
            await _context.SaveChangesAsync();

            return Ok(newMinFuel);
        }

    }
}
