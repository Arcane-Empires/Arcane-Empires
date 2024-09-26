@echo
docker build -t arcane-empires .
docker run -p 3001:3001 arcane-empires
pause