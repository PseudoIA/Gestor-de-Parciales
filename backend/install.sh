#!/bin/bash

# Actualizar los paquetes
apt-get update

# Instalar unixodbc y el controlador ODBC
apt-get install -y unixodbc-dev msodbcsql17