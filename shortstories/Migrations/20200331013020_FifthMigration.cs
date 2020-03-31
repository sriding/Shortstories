using Microsoft.EntityFrameworkCore.Migrations;

namespace shortstories.Migrations
{
    public partial class FifthMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StoryContent",
                table: "Story",
                type: "varchar(8000)",
                maxLength: 8000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(8000)",
                oldMaxLength: 8000);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StoryContent",
                table: "Story",
                type: "varchar(8000)",
                maxLength: 8000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(8000)",
                oldMaxLength: 8000,
                oldNullable: true);
        }
    }
}
