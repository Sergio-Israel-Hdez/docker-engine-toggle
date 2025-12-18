#!/bin/bash
# /usr/local/bin/docker-toggle.sh
ACTION="$1"

case "$ACTION" in
  on)
    systemctl start docker containerd
    ;;
  off)
    systemctl stop docker containerd
    ;;
  status)
    systemctl is-active docker containerd
    ;;
  *)
    echo "Uso: docker-toggle.sh {on|off|status}"
    exit 1
    ;;
esac
