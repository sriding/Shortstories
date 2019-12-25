using Microsoft.EntityFrameworkCore.Migrations;

namespace shortstories.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserProfileId",
                table: "User",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Followers",
                columns: table => new
                {
                    FollowersModelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfileId = table.Column<string>(nullable: true),
                    FollowersId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Followers", x => x.FollowersModelId);
                });

            migrationBuilder.CreateTable(
                name: "Profile",
                columns: table => new
                {
                    ProfileModelId = table.Column<string>(nullable: false),
                    ProfileDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profile", x => x.ProfileModelId);
                });

            migrationBuilder.CreateTable(
                name: "Story",
                columns: table => new
                {
                    StoryModelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfileId = table.Column<string>(nullable: true),
                    StoryTitle = table.Column<string>(nullable: true),
                    StoryPages = table.Column<int>(nullable: false),
                    StoryThumbsUp = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Story", x => x.StoryModelId);
                });

            migrationBuilder.CreateTable(
                name: "StoryChapters",
                columns: table => new
                {
                    StoryChaptersId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryId = table.Column<int>(nullable: false),
                    PageNumber = table.Column<int>(nullable: false),
                    ChapterTitle = table.Column<string>(nullable: true),
                    ChapterContent = table.Column<string>(nullable: true),
                    ChapterTheme = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryChapters", x => x.StoryChaptersId);
                });

            migrationBuilder.CreateTable(
                name: "StoryGenres",
                columns: table => new
                {
                    StoryGenresId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryId = table.Column<int>(nullable: false),
                    StoryGenre = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryGenres", x => x.StoryGenresId);
                });

            migrationBuilder.CreateTable(
                name: "StoryTags",
                columns: table => new
                {
                    StoryTagsId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryId = table.Column<int>(nullable: false),
                    StoryTag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryTags", x => x.StoryTagsId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Followers");

            migrationBuilder.DropTable(
                name: "Profile");

            migrationBuilder.DropTable(
                name: "Story");

            migrationBuilder.DropTable(
                name: "StoryChapters");

            migrationBuilder.DropTable(
                name: "StoryGenres");

            migrationBuilder.DropTable(
                name: "StoryTags");

            migrationBuilder.DropColumn(
                name: "UserProfileId",
                table: "User");
        }
    }
}
