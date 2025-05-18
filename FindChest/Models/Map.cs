using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FindChest.Models;

[Table("map")]
public partial class Map
{
    [Key]
    public int MapId { get; set; }

    public int RowCount { get; set; }

    public int ColumnCount { get; set; }

    public int ChestTypeCount { get; set; }

    [Column(TypeName = "text")]
    public string MapData { get; set; } = null!;

    public double? MinFuel { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }
}
