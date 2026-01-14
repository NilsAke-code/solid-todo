# Solid-todo

## Förutsättningar

- Visa en lista på saker att göra (texter) (KLAR)
- Man ska kunna lägga till nya uppgifter i listan (KLAR)
- Man ska kunna "checka av" en rad så man ser att den är klar
- Man ska kunna ta bort en rad som är felaktig KLAR

Repo innehåller:
- `frontend/` (SolidStart)
- `backend/` (ASP.NET Minimal API + EF Core + LocalDB)

## Steg 1: Hämta koden
## Klona repot:

```bash
git clone <REPO_URL>
cd solid-todo



## Steg 2: ASP.NET Minimal API + EF Core + LocalDB
## Backend

cd backend/TodoApi
dotnet restore               ## restore packages
dotnet ef database update    ## skapa/uppdatera databas
dotnet run                   ## starta backend

## Frontend

cd frontend
npm install
skapa env fil                ## kopiera frontend/.env.example -> frontend/.env , uppdatera VITE_API_URL (exempel) VITE_API_URL=http://localhost:5299, 1. högerklicka .env.example -> Copy. 2. högerklicka samma mapp -> Paste. 3. döp till .env och skriv rätt URL
starta frontend              ## npm run dev





## NOTERING: backend måste vara igång för att använda frontend. LocalDB alltså per dator (varje dator skapar sin egna DB via migrations)