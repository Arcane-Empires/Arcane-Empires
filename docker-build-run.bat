@echo off
REM Remove the existing containers
docker-compose -f docker-compose.Development.yml down

REM Build and run the services using docker-compose
docker-compose -f docker-compose.Development.yml up --build -d

pause
