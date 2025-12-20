const { St, GLib, Gio, Clutter } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

class Extension {
    constructor() {
        this._indicator = null;
        this._statusIcon = null;
        this._dockerLabel = null;
    }

    enable() {
        this._indicator = new PanelMenu.Button(0.0, 'Docker Toggle');

        // 1. Creamos un contenedor horizontal para agrupar los elementos
        let box = new St.BoxLayout({
            style_class: 'panel-status-menu-box'
        });

        // 2. La Ballena (Usamos un Label con emoji para asegurar que aparezca siempre)
        this._dockerLabel = new St.Label({
            text: '🐳',
            y_align: Clutter.ActorAlign.CENTER,
            style_class: 'docker-whale-icon'
        });

        // 3. El icono de estado (Play/Stop)
        this._statusIcon = new St.Icon({
            icon_name: 'media-playback-stop-symbolic',
            style_class: 'system-status-icon docker-icon',
        });

        // 4. La cantidad de contenedores corriendo
        this._containerCountLabel = new St.Label({
            text: '0',
            y_align: Clutter.ActorAlign.CENTER,
        });

        // 5. Metemos ambos en el Box y el Box en el indicador
        box.add_child(this._dockerLabel);
        box.add_child(this._statusIcon);
        box.add_child(this._containerCountLabel);
        this._indicator.add_child(box);

        // Menú
        const onItem = new PopupMenu.PopupMenuItem('Iniciar Docker');
        const offItem = new PopupMenu.PopupMenuItem('Detener Docker');
        onItem.connect('activate', () => this._runAndRefresh('on'));
        offItem.connect('activate', () => this._runAndRefresh('off'));
        this._indicator.menu.addMenuItem(onItem);
        this._indicator.menu.addMenuItem(offItem);

        Main.panel.addToStatusArea('docker-toggle', this._indicator);

        this._updateIcon();
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
            this._statusIcon = null;
            this._dockerLabel = null;
            this._containerCountLabel = null;
        }
    }

    _runAndRefresh(action) {
        let proc = new Gio.Subprocess({
            argv: ['/usr/local/bin/docker-toggle.sh', action],
            flags: Gio.SubprocessFlags.NONE,
        });
        proc.init(null);
        proc.wait_async(null, () => {
            this._waitForDockerState();
        });
    }

    _waitForDockerState() {
        let attempts = 0;
        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
            attempts++;
            if (this._updateIcon() || attempts >= 10) {
                return GLib.SOURCE_REMOVE;
            }
            return GLib.SOURCE_CONTINUE;
        });
    }

    _updateIcon() {
        try {
            let [ok, stdout] = GLib.spawn_command_line_sync('systemctl is-active docker');
            let active = ok && stdout.toString().trim() === 'active';

            this._statusIcon.icon_name = active
                ? 'media-playback-start-symbolic'
                : 'media-playback-stop-symbolic';

            if (active) {
                this._statusIcon.remove_style_class_name('docker-stopped');
                this._statusIcon.add_style_class_name('docker-running');
                //si esta activo, actualizamos el contador de contenedores
                let count = this._getRunningContainers();
                this._containerCountLabel.text = `${count}`;
            } else {
                this._statusIcon.remove_style_class_name('docker-running');
                this._statusIcon.add_style_class_name('docker-stopped');
            }

            return true;
        } catch (e) {
            return false;
        }
    }
    _getRunningContainers() {
        try {
            let [ok, stdout] = GLib.spawn_command_line_sync(
                'docker ps -q'
            );

            if (!ok)
                return 0;

            let lines = stdout
                .toString()
                .trim()
                .split('\n')
                .filter(l => l.length > 0);

            return lines.length;
        } catch (e) {
            return 0;
        }
    }


}

function init() {
    return new Extension();
}