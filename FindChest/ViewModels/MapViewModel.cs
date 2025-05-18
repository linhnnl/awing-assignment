using FindChest.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Xml.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Text.Json;

namespace FindChest.ViewModels
{
    public class MapViewModel
    {
        [Required(ErrorMessage = "RowCount không được để trống")]
        [Range(1, 500, ErrorMessage = "RowCount phải trong khoảng 1 đến 500")]
        public int RowCount { get; set; }

        [Required(ErrorMessage = "ColumnCount không được để trống")]
        [Range(1, 500, ErrorMessage = "ColumnCount phải trong khoảng 1 đến 500")]
        public int ColumnCount { get; set; }

        [Required(ErrorMessage = "ChestTypeCount không được để trống")]
        [Range(1, int.MaxValue, ErrorMessage = "ChestTypeCount phải lớn hơn 0")]
        public int ChestTypeCount { get; set; }

        [Required(ErrorMessage = "Bản đồ không được để trống")]
        public List<List<int>> MapData { get; set; } = null!;
        public double? MinFuel { get; set; }
        public DateTime? CreatedAt { get; set; }

        // Maps a ViewModel to a Map model for database operations.
        public Map ToModel()
        {
            return new Map
            {
                RowCount = this.RowCount,
                ColumnCount = this.ColumnCount,
                ChestTypeCount = this.ChestTypeCount,
                MapData = JsonSerializer.Serialize(this.MapData),
                MinFuel = this.MinFuel
            };
        }


    }
}
