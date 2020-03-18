using Microsoft.EntityFrameworkCore.Migrations;

namespace shortstories.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileAvatar",
                table: "Profile",
                type: "varchar(25)",
                maxLength: 25,
                nullable: false,
                defaultValue: "animal-kingdom");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileAvatar",
                table: "Profile");
        }
    }
}
