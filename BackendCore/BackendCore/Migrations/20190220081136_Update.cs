using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendCore.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Avaible",
                table: "Products",
                newName: "Available");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Products",
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Available",
                table: "Products",
                newName: "Avaible");
        }
    }
}
