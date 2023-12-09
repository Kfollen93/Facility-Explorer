using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFacilityModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "City",
                table: "Facilities",
                newName: "Address_City");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Facilities",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "Address_State",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Street",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Zipcode",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Hours",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Insurance",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Payment",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeOfFacility",
                table: "Facilities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_State",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Address_Street",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Address_Zipcode",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Hours",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Insurance",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "Payment",
                table: "Facilities");

            migrationBuilder.DropColumn(
                name: "TypeOfFacility",
                table: "Facilities");

            migrationBuilder.RenameColumn(
                name: "Address_City",
                table: "Facilities",
                newName: "City");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Facilities",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
