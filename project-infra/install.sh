#!/bin/bash

red="\e[0;91m"
blue="\e[0;94m"
expand_bg="\e[K"
blue_bg="\e[0;104m${expand_bg}"
red_bg="\e[0;101m${expand_bg}"
green_bg="\e[0;102m${expand_bg}"
green="\e[0;92m"
white="\e[0;97m"
bold="\e[1m"
uline="\e[4m"
reset="\e[0m"


echo -e "${green}${uline}${bold}STARTING DOCKER...${reset}"
docker-compose up -d --build
echo -e "\n"

echo -e "${green}${uline}${bold}MAKING MIGRATIONS...${reset}"
docker-compose exec web python manage.py makemigrations # add apps
echo -e "\n"

echo -e "${green}${uline}${bold}MIGRATING...${reset}"
docker-compose exec web python manage.py migrate
echo -e "\n"

echo -e "${green}${uline}${bold}COLLECTING STATIC FILES...${reset}"
docker-compose exec web python manage.py collectstatic
echo -e "\n"

echo -e "${green_bg}${bold}FINISH${reset}"