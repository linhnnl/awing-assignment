# awing-assignment

## 📘 Description
A project full-stack application using C# (ASP.NET Core) for the backend and React for the frontend that solves a mathematical problem to find the minimum fuel required to reach the treasure.

## ⚙️ Installation
### Backend (C# with .NET)
Install the required NuGet packages:
<pre>
  dotnet add package Microsoft.AspNetCore.NodeServices --version 3.1.32 
  dotnet add package Microsoft.EntityFrameworkCore --version 8.0.13 
  dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.13 
  dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 8.0.10 
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.10 
  dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.10 
  dotnet add package MySql.Data --version 9.3.0 
  dotnet add package Newtonsoft.Json --version 13.0.3 
  dotnet add package Node.js --version 5.3.0 
  dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.3 
  dotnet add package Swashbuckle.AspNetCore --version 6.6.2 
</pre>

### Frontend
<pre> 
  npm install @emotion/react
  npm install @emotion/styled
  npm install @mui/icons-material
  npm install @mui/material
  npm install @testing-library/dom
  npm install @testing-library/jest-dom
  npm install @testing-library/react
  npm install @testing-library/user-event
  npm install react
  npm install react-dom
  npm install react-scripts
  npm install web-vitals
</pre>

## 🚀 Usage
1. Use find_chest_backup.sql to restore database
2. Update connection string in appsettings.js
3. Run the backend server **FindChest** by entering `dotnet run` in terminal
4. Start the frontend **ui** by entering `npm start` in terminal
5. Open http://localhost:3000 in your browser
6. Enter the map and submit to calculate minimum fuel.
