


using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Endpoints;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<TodoDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("TodoDb")));


builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();


app.UseCors("frontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapTodoEndpoints();

app.Run();
