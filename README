DOCKER ENGINE TOGGLE - GNOME EXTENSION (GNOME 42 / Pop!_OS)
=========================================================

Este proyecto permite iniciar, detener y mostrar el estado del
servicio Docker Engine desde el panel superior de GNOME Shell.

Compatibilidad:
- GNOME Shell 42.x
- Pop!_OS (X11)
- systemd
- polkit


---------------------------------------------------------
ARCHIVOS DEL PROYECTO
---------------------------------------------------------

1) extension.js
2) metadata.json
3) docker-toggle.sh
4) 90-docker-toggle.rules


---------------------------------------------------------
UBICACIÓN DE CADA ARCHIVO
---------------------------------------------------------

1) EXTENSIÓN GNOME

Ruta:
~/.local/share/gnome-shell/extensions/docker-engine-toggle@sergioflores/

Archivos que van en esta carpeta:
- extension.js
- metadata.json

Ejemplo:
~/.local/share/gnome-shell/extensions/docker-engine-toggle@sergioflores/extension.js
~/.local/share/gnome-shell/extensions/docker-engine-toggle@sergioflores/metadata.json


---------------------------------------------------------
2) SCRIPT DE CONTROL DE DOCKER

Ruta:
 /usr/local/bin/docker-toggle.sh

Archivo:
- docker-toggle.sh

Permisos requeridos:
- Ejecutable

Comando para aplicar permisos:
sudo chmod +x /usr/local/bin/docker-toggle.sh


---------------------------------------------------------
3) REGLA POLKIT

Ruta:
 /etc/polkit-1/rules.d/

Archivo:
- 90-docker-toggle.rules

Si la carpeta no existe, debe crearse con:
sudo mkdir -p /etc/polkit-1/rules.d


---------------------------------------------------------
REQUISITOS DEL SISTEMA
---------------------------------------------------------

- Docker instalado
- systemd activo
- polkit instalado
- Usuario agregado al grupo docker

Comando para agregar usuario al grupo docker:
sudo usermod -aG docker sergioflores

Requiere cerrar sesión y volver a entrar.


---------------------------------------------------------
ACTIVACIÓN DE LA EXTENSIÓN
---------------------------------------------------------

1) Recargar GNOME Shell (X11):
Alt + F2 -> r -> Enter

2) Habilitar la extensión:
gnome-extensions enable docker-engine-toggle@sergioflores


---------------------------------------------------------
VERIFICACIÓN
---------------------------------------------------------

Comprobar estado de Docker:
systemctl status docker

Probar script manualmente:
docker-toggle.sh on
docker-toggle.sh off
docker-toggle.sh status


---------------------------------------------------------
DESCRIPCIÓN FUNCIONAL
---------------------------------------------------------

- El icono del panel cambia según el estado de Docker
- El estado se detecta usando:
  systemctl is-active docker
- El icono se actualiza automáticamente después de iniciar o detener Docker
- No se usa sudo dentro de la extensión
- El control de privilegios se maneja mediante polkit


---------------------------------------------------------
NOTAS
---------------------------------------------------------

- Esta extensión está diseñada específicamente para GNOME 42
- No es compatible con sintaxis ESM (import/export)
- No es compatible con GNOME 45+ sin modificaciones
- Funciona únicamente en X11 sin reiniciar sesión

FIN DEL ARCHIVO
