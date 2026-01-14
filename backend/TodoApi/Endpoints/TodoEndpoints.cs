namespace TodoApi.Endpoints;

using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

public static class TodoEndpoints
{
    public static void MapTodoEndpoints(this WebApplication app)
    {
        app.MapGet("/tasks", async (TodoDbContext db) =>
        await db.TodoItems
        .OrderByDescending(x => x.CreatedAt)
        .ToListAsync());




        app.MapPost("/tasks", async (TodoDbContext db, TodoItem input) =>
        {
            var item = new TodoItem
            {
                Text = input.Text,
                Completed = input.Completed
            };

            db.TodoItems.Add(item);
            await db.SaveChangesAsync();

            return Results.Created($"/tasks/{item.Id}", item);
        });



        app.MapPut("/tasks/{id:int}", async (TodoDbContext db, int id, TodoItem input) =>
        {
            var item = await db.TodoItems.FindAsync(id);
            if (item is null)
            {
                return Results.NotFound();
            }
            item.Text = input.Text;
            item.Completed = input.Completed;

            await db.SaveChangesAsync();

            return Results.Ok(item);
        });

        app.MapDelete("/tasks/{id:int}", async (TodoDbContext db, int id) =>
        {
            var item = await db.TodoItems.FindAsync(id);
            if (item is null)
            {
                return Results.NotFound();
            }
            db.TodoItems.Remove(item);
            await db.SaveChangesAsync();
            return Results.NoContent();

        });
    }
}
