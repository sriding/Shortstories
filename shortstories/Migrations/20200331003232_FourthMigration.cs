using Microsoft.EntityFrameworkCore.Migrations;

namespace shortstories.Migrations
{
    public partial class FourthMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ChapterTitle",
                table: "StoryChapters",
                type: "varchar(80)",
                maxLength: 80,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(80)",
                oldMaxLength: 80,
                oldNullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ChapterTitle",
                table: "StoryChapters",
                type: "varchar(80)",
                maxLength: 80,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(80)",
                oldMaxLength: 80);

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
    }
}
