﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using shortstories.Data;

namespace shortstories.Migrations
{
    [DbContext(typeof(ShortstoriesContext))]
    partial class ShortstoriesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("shortstories.Models.FollowersModel", b =>
                {
                    b.Property<int>("FollowersModelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FollowersId")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("ProfileId")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("FollowersModelId");

                    b.HasIndex("ProfileId");

                    b.ToTable("Followers");
                });

            modelBuilder.Entity("shortstories.Models.ProfileModel", b =>
                {
                    b.Property<string>("ProfileModelId")
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("ProfileDescription")
                        .HasColumnType("varchar(500)")
                        .HasMaxLength(500);

                    b.Property<string>("TimeOfCreation")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("ProfileModelId");

                    b.HasIndex("UserId");

                    b.ToTable("Profile");
                });

            modelBuilder.Entity("shortstories.Models.StoryChaptersModel", b =>
                {
                    b.Property<int>("StoryChaptersId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ChapterContent")
                        .IsRequired()
                        .HasColumnType("varchar(3000)")
                        .HasMaxLength(3000);

                    b.Property<int>("ChapterNumber")
                        .HasColumnType("int");

                    b.Property<string>("ChapterTheme")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("ChapterTitle")
                        .HasColumnType("varchar(80)")
                        .HasMaxLength(80);

                    b.Property<int>("StoryId")
                        .HasColumnType("int");

                    b.HasKey("StoryChaptersId");

                    b.HasIndex("StoryId");

                    b.ToTable("StoryChapters");
                });

            modelBuilder.Entity("shortstories.Models.StoryGenresModel", b =>
                {
                    b.Property<int>("StoryGenresId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("StoryGenre")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<int>("StoryId")
                        .HasColumnType("int");

                    b.HasKey("StoryGenresId");

                    b.HasIndex("StoryId");

                    b.ToTable("StoryGenres");
                });

            modelBuilder.Entity("shortstories.Models.StoryModel", b =>
                {
                    b.Property<int>("StoryModelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ProfileId")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("StoryThumbsDown")
                        .HasColumnType("int");

                    b.Property<int>("StoryThumbsUp")
                        .HasColumnType("int");

                    b.Property<string>("StoryTitle")
                        .IsRequired()
                        .HasColumnType("varchar(80)")
                        .HasMaxLength(80);

                    b.HasKey("StoryModelId");

                    b.HasIndex("ProfileId");

                    b.ToTable("Story");
                });

            modelBuilder.Entity("shortstories.Models.StoryTagsModel", b =>
                {
                    b.Property<int>("StoryTagsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("StoryId")
                        .HasColumnType("int");

                    b.Property<string>("StoryTag")
                        .IsRequired()
                        .HasColumnType("varchar(25)")
                        .HasMaxLength(25);

                    b.HasKey("StoryTagsId");

                    b.HasIndex("StoryId");

                    b.ToTable("StoryTags");
                });

            modelBuilder.Entity("shortstories.Models.UserModel", b =>
                {
                    b.Property<string>("UserModelId")
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("TimeOfCreation")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("varchar(25)")
                        .HasMaxLength(25);

                    b.Property<string>("UserUsername")
                        .IsRequired()
                        .HasColumnType("varchar(25)")
                        .HasMaxLength(25);

                    b.HasKey("UserModelId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("shortstories.Models.FollowersModel", b =>
                {
                    b.HasOne("shortstories.Models.ProfileModel", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("shortstories.Models.ProfileModel", b =>
                {
                    b.HasOne("shortstories.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("shortstories.Models.StoryChaptersModel", b =>
                {
                    b.HasOne("shortstories.Models.StoryModel", "Story")
                        .WithMany()
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("shortstories.Models.StoryGenresModel", b =>
                {
                    b.HasOne("shortstories.Models.StoryModel", "Story")
                        .WithMany()
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("shortstories.Models.StoryModel", b =>
                {
                    b.HasOne("shortstories.Models.ProfileModel", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("shortstories.Models.StoryTagsModel", b =>
                {
                    b.HasOne("shortstories.Models.StoryModel", "Story")
                        .WithMany()
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
