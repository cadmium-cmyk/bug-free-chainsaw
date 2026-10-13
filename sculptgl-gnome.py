#!/usr/bin/env python3
import sys
import os
import base64
import json
import gi

gi.require_version('Gtk', '4.0')
gi.require_version('Adw', '1')
gi.require_version('WebKit', '6.0')
from gi.repository import Gtk, Adw, WebKit, GLib, Gio

class SculptGLApplication(Adw.Application):
    def __init__(self):
        super().__init__(application_id="com.stephomi.sculptgl", flags=Gio.ApplicationFlags.FLAGS_NONE)

    def do_activate(self):
        win = self.props.active_window
        if not win:
            win = SculptGLWindow(application=self)
        win.present()

class SculptGLWindow(Adw.ApplicationWindow):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.set_default_size(1024, 768)
        self.set_title("SculptGL")

        self.pending_save_data = None

        # Main box layout
        box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
        self.set_content(box)

        # HeaderBar
        header_bar = Adw.HeaderBar()
        box.append(header_bar)

        # Open button
        open_btn = Gtk.Button(label="Open")
        open_btn.set_icon_name("document-open-symbolic")
        open_btn.set_tooltip_text("Open/Import File")
        open_btn.connect("clicked", self._on_open_clicked)
        header_bar.pack_start(open_btn)

        # Save Menu / Button
        save_btn = Gtk.MenuButton(label="Save")
        save_btn.set_icon_name("document-save-symbolic")
        save_btn.set_tooltip_text("Save/Export File")

        save_menu = Gio.Menu()
        save_menu.append("Save as SGL", "win.save_sgl")
        save_menu.append("Export OBJ", "win.save_obj")
        save_menu.append("Export PLY", "win.save_ply")
        save_menu.append("Export STL", "win.save_stl")
        save_btn.set_menu_model(save_menu)
        header_bar.pack_start(save_btn)

        # Actions for save menu
        self._add_action("save_sgl", lambda *_: self._export_format("sgl"))
        self._add_action("save_obj", lambda *_: self._export_format("obj"))
        self._add_action("save_ply", lambda *_: self._export_format("ply"))
        self._add_action("save_stl", lambda *_: self._export_format("stl"))
        self._add_action("open_file", lambda *_: self._on_open_clicked(None))

        # Keyboard shortcuts
        app = kwargs.get("application")
        if app:
            app.set_accels_for_action("win.open_file", ["<Control>o"])
            app.set_accels_for_action("win.save_sgl", ["<Control>s"])

        # WebView setup
        self.webview = WebKit.WebView()
        box.append(self.webview)
        self.webview.set_hexpand(True)
        self.webview.set_vexpand(True)

        ucm = self.webview.get_user_content_manager()
        ucm.register_script_message_handler("sculptgl")
        ucm.connect("script-message-received::sculptgl", self._on_script_message)

        # Load app/index.html
        base_dir = os.path.dirname(os.path.realpath(__file__))
        index_path = os.path.join(base_dir, "app", "index.html")
        file_uri = Gio.File.new_for_path(index_path).get_uri()
        self.webview.load_uri(file_uri)

    def _add_action(self, name, callback):
        action = Gio.SimpleAction.new(name, None)
        action.connect("activate", callback)
        self.add_action(action)

    def _export_format(self, fmt):
        script = f"if (window.SculptGLAPI && window.SculptGLAPI.exportFile) {{ window.SculptGLAPI.exportFile('{fmt}'); }}"
        self.webview.evaluate_javascript(script, -1, None, None, None, None, None)

    def _on_open_clicked(self, button):
        dialog = Gtk.FileDialog()
        dialog.set_title("Open 3D File")

        filters = Gio.ListStore.new(Gtk.FileFilter)
        all_filter = Gtk.FileFilter()
        all_filter.set_name("All Supported Files (.sgl, .obj, .ply, .stl)")
        for pattern in ["*.sgl", "*.obj", "*.ply", "*.stl", "*.SGL", "*.OBJ", "*.PLY", "*.STL"]:
            all_filter.add_pattern(pattern)
        filters.append(all_filter)

        dialog.set_filters(filters)
        dialog.open(self, None, self._on_open_dialog_finish)

    def _on_open_dialog_finish(self, dialog, result):
        try:
            file = dialog.open_finish(result)
            if file:
                filename = file.get_basename()
                path = file.get_path()
                with open(path, "rb") as f:
                    data = f.read()
                b64_data = base64.b64encode(data).decode('ascii')
                script = f"if (window.SculptGLAPI && window.SculptGLAPI.importFileData) {{ window.SculptGLAPI.importFileData({json.dumps(filename)}, {json.dumps(b64_data)}); }}"
                self.webview.evaluate_javascript(script, -1, None, None, None, None, None)
        except Exception as e:
            print("Open file canceled or error:", e)

    def _on_script_message(self, ucm, js_result):
        try:
            val = js_result.get_js_value()
            if val.is_string():
                data = json.loads(val.to_string())
            else:
                data = json.loads(val.to_json(0))

            msg_type = data.get("type")
            if msg_type == "saveFile":
                filename = data.get("filename", "yourMesh.sgl")
                b64_data = data.get("data", "")
                self._prompt_save_file(filename, b64_data)
        except Exception as e:
            print("Error parsing script message:", e)

    def _prompt_save_file(self, default_name, b64_data):
        self.pending_save_data = base64.b64decode(b64_data) if b64_data else b""
        dialog = Gtk.FileDialog()
        dialog.set_title("Save File")
        dialog.set_initial_name(default_name)
        dialog.save(self, None, self._on_save_dialog_finish)

    def _on_save_dialog_finish(self, dialog, result):
        try:
            file = dialog.save_finish(result)
            if file and self.pending_save_data is not None:
                path = file.get_path()
                with open(path, "wb") as f:
                    f.write(self.pending_save_data)
                print("Successfully saved file to:", path)
        except Exception as e:
            print("Save file canceled or error:", e)
        finally:
            self.pending_save_data = None

def main():
    app = SculptGLApplication()
    return app.run(sys.argv)

if __name__ == "__main__":
    sys.exit(main())
