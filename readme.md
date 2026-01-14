# Solid-todo

## Förutsättningar

- Visa en lista på saker att göra (texter) (KLAR)
- Man ska kunna lägga till nya uppgifter i listan (KLAR)
- Man ska kunna "checka av" en rad så man ser att den är klar
- Man ska kunna ta bort en rad som är felaktig KLAR


Repo innehåller:
- `frontend/` (SolidStart)
- `backend/` (ASP.NET Minimal API + EF Core + LocalDB)

## First time on a new computer

### 1) Clone
```bash
git clone <REPO_URL>
cd solid-todo


## Backend
cd backend/TodoApi
dotnet restore
dotnet ef database update
dotnet run