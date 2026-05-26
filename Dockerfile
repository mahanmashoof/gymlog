# Stage 1 — Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY GymLog.API/ GymLog.API/

RUN dotnet restore GymLog.API/GymLog.API.csproj
RUN dotnet publish GymLog.API/GymLog.API.csproj -c Release -o /app/publish

# Stage 2 — Run
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "GymLog.API.dll"]