Status
======

I don't maintain Sculptgl anymore (except small/minor fixes).

SculptGL - WebGL sculpting
==========================

You can try it [**here**](http://stephaneginier.com/sculptgl).

Additional information can be found on the [website](http://stephaneginier.com/).

Tools
=====

Nodejs needs to be installed [nodejs](http://nodejs.org/).

Then for the browser build :
```
yarn # npm install
yarn dev # npm run dev (npm run release for final build, npm run website should not be used)
// visit app/index.html
```

For standalone Electron:
```
yarn add electron
yarn add electron-packager
yarn standalone
```

For standalone GNOME (Libadwaita / WebKitGTK):
Prerequisites: `gir1.2-adw-1`, `gir1.2-gtk-4.0`, `gir1.2-webkit-6.0`, `python3-gi`.

Build release assets and launch native GNOME application:
```
yarn gnome
# or directly:
./sculptgl-gnome
```

Credits
=======

#### Environments

The raw environments are from https://hdrihaven.com/hdris
