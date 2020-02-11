using Microsoft.EntityFrameworkCore.Migrations;

namespace shortstories.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserModelId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    TimeOfCreation = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UserUsername = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    UserPassword = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserModelId);
                });

            migrationBuilder.CreateTable(
                name: "Profile",
                columns: table => new
                {
                    ProfileModelId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    TimeOfCreation = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    ProfileDescription = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profile", x => x.ProfileModelId);
                    table.ForeignKey(
                        name: "FK_Profile_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserModelId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Followers",
                columns: table => new
                {
                    FollowersModelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FollowersId = table.Column<string>(nullable: true),
                    ProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Followers", x => x.FollowersModelId);
                    table.ForeignKey(
                        name: "FK_Followers_Profile_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profile",
                        principalColumn: "ProfileModelId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Story",
                columns: table => new
                {
                    StoryModelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryTitle = table.Column<string>(nullable: true),
                    StoryPages = table.Column<int>(nullable: false),
                    StoryThumbsUp = table.Column<int>(nullable: false),
                    ProfileId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Story", x => x.StoryModelId);
                    table.ForeignKey(
                        name: "FK_Story_Profile_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profile",
                        principalColumn: "ProfileModelId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StoryChapters",
                columns: table => new
                {
                    StoryChaptersId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageNumber = table.Column<int>(nullable: false),
                    ChapterTitle = table.Column<string>(nullable: true),
                    ChapterContent = table.Column<string>(nullable: true),
                    ChapterTheme = table.Column<string>(nullable: true),
                    StoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryChapters", x => x.StoryChaptersId);
                    table.ForeignKey(
                        name: "FK_StoryChapters_Story_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Story",
                        principalColumn: "StoryModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoryGenres",
                columns: table => new
                {
                    StoryGenresId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryGenre = table.Column<string>(nullable: true),
                    StoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryGenres", x => x.StoryGenresId);
                    table.ForeignKey(
                        name: "FK_StoryGenres_Story_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Story",
                        principalColumn: "StoryModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoryTags",
                columns: table => new
                {
                    StoryTagsId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoryTag = table.Column<string>(nullable: true),
                    StoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryTags", x => x.StoryTagsId);
                    table.ForeignKey(
                        name: "FK_StoryTags_Story_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Story",
                        principalColumn: "StoryModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Followers_ProfileId",
                table: "Followers",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Profile_UserId",
                table: "Profile",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Story_ProfileId",
                table: "Story",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_StoryChapters_StoryId",
                table: "StoryChapters",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_StoryGenres_StoryId",
                table: "StoryGenres",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_StoryTags_StoryId",
                table: "StoryTags",
                column: "StoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Followers");

            migrationBuilder.DropTable(
                name: "StoryChapters");

            migrationBuilder.DropTable(
                name: "StoryGenres");

            migrationBuilder.DropTable(
                name: "StoryTags");

            migrationBuilder.DropTable(
                name: "Story");

            migrationBuilder.DropTable(
                name: "Profile");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
