import TR from 'gui/GuiTR';
import Enums from 'misc/Enums';
import Tools from 'editing/tools/Tools';
import getOptionsURL from 'misc/getOptionsURL';
import GuiSculptingTools from 'gui/GuiSculptingTools';

var GuiTools = GuiSculptingTools.tools;

var TOOL_ICONS = {};
TOOL_ICONS[Enums.Tools.BRUSH] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/></svg>';
TOOL_ICONS[Enums.Tools.INFLATE] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/></svg>';
TOOL_ICONS[Enums.Tools.TWIST] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm-6.3 1.2L4.24 6.66A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8z"/></svg>';
TOOL_ICONS[Enums.Tools.SMOOTH] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-4-8a4 4 0 1 0 4-4 4 4 0 0 0-4 4z"/></svg>';
TOOL_ICONS[Enums.Tools.FLATTEN] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17h18v2H3zm0-7h18v2H3zm0-7h18v2H3z"/></svg>';
TOOL_ICONS[Enums.Tools.PINCH] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19h16v2H4z"/></svg>';
TOOL_ICONS[Enums.Tools.CREASE] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
TOOL_ICONS[Enums.Tools.DRAG] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 1.07V4h2l-3 3-3-3h2V1.07C6.32 1.54 2 5.77 2 11c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.23-4.32-9.46-9-9.93zM12 19c-4.41 0-8-3.59-8-8 0-3.87 2.76-7.1 6.44-7.82L10 5.5 12 7.5l2-2-.44-2.32C17.24 3.9 20 7.13 20 11c0 4.41-3.59 8-8 8z"/></svg>';
TOOL_ICONS[Enums.Tools.PAINT] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61.43.53 1.03.89 1.7 1.01.62.11 1.25-.01 1.77-.35l1.09-.72c.67-.44 1.51-.55 2.27-.29.76.26 1.34.88 1.55 1.65l.38 1.41c.21.78.85 1.38 1.64 1.55.79.17 1.61-.12 2.12-.76C19.72 19.68 21 16.03 21 12c0-4.97-4.03-9-9-9zm-5 8c-.83 0-1.5-.67-1.5-1.5S6.17 8 7 8s1.5.67 1.5 1.5S7.83 11 7 11zm4-3c-.83 0-1.5-.67-1.5-1.5S10.17 5 11 5s1.5.67 1.5 1.5S11.83 8 11 8zm4 3c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5S15.83 11 15 11z"/></svg>';
TOOL_ICONS[Enums.Tools.MOVE] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/></svg>';
TOOL_ICONS[Enums.Tools.MASKING] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z"/></svg>';
TOOL_ICONS[Enums.Tools.LOCALSCALE] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h2V6H4v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/></svg>';
TOOL_ICONS[Enums.Tools.TRANSFORM] = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>';

class GuiSculpting {

  constructor(guiParent, ctrlGui) {
    this._main = ctrlGui._main; // main application
    this._ctrlGui = ctrlGui; // main gui
    this._sculptManager = ctrlGui._main.getSculptManager(); // sculpting management
    this._toolOnRelease = -1; // tool to apply when the mouse or the key is released
    this._invertSign = false; // invert sign of tool (add/sub)

    this._modalBrushRadius = false; // modal brush radius change
    this._modalBrushIntensity = false; // modal brush intensity change

    // modal stuffs (not canvas based, because no 3D picking involved)
    this._lastPageX = 0;
    this._lastPageY = 0;
    // for modal radius
    this._refX = 0;
    this._refY = 0;

    this._menu = null;
    this._ctrlSculpt = null;
    this._ctrlSymmetry = null;
    this._ctrlContinuous = null;
    this._ctrlTitleCommon = null;

    this._toolbarContainer = null;
    this._toolButtons = [];

    this.init(guiParent);
  }

  init(guiParent) {
    var menu = this._menu = guiParent.addMenu(TR('sculptTitle'));
    menu.open();

    menu.addTitle(TR('sculptTool'));

    // sculpt tool
    var optTools = [];
    for (var i = 0, nbTools = Tools.length; i < nbTools; ++i) {
      if (Tools[i]) optTools[i] = TR(Tools[i].uiName);
    }
    this._ctrlSculpt = menu.addCombobox(TR('sculptTool'), this._sculptManager.getToolIndex(), this.onChangeTool.bind(this), optTools);

    GuiSculptingTools.initGuiTools(this._sculptManager, this._menu, this._main);

    this._ctrlTitleCommon = menu.addTitle(TR('sculptCommon'));
    // symmetry
    this._ctrlSymmetry = menu.addCheckbox(TR('sculptSymmetry'), this._sculptManager._symmetry, this.onSymmetryChange.bind(this));
    // continuous
    this._ctrlContinuous = menu.addCheckbox(TR('sculptContinuous'), this._sculptManager, '_continuous');

    GuiSculptingTools.show(this._sculptManager.getToolIndex());

    this.initLeftToolbar();

    this.addEvents();
    this.onChangeTool(this._sculptManager.getToolIndex());
  }

  initLeftToolbar() {
    if (this._toolbarContainer) return;
    var isNative = window.IS_NATIVE_APP || window.location.search.indexOf('native=1') !== -1;
    if (isNative) return;

    var container = document.createElement('div');
    container.className = 'gui-left-toolbar';
    document.body.appendChild(container);
    this._toolbarContainer = container;

    var self = this;
    for (var i = 0, nbTools = Tools.length; i < nbTools; ++i) {
      if (!Tools[i]) continue;

      (function (toolIndex) {
        var btn = document.createElement('button');
        btn.className = 'gui-tool-btn';
        btn.title = TR(Tools[toolIndex].uiName);
        btn.setAttribute('aria-label', TR(Tools[toolIndex].uiName));
        btn.setAttribute('aria-pressed', 'false');
        var iconSvg = TOOL_ICONS[toolIndex] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>';
        btn.innerHTML = iconSvg;

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          self._ctrlSculpt.setValue(toolIndex);
        });

        container.appendChild(btn);
        self._toolButtons[toolIndex] = btn;
      })(i);
    }
  }

  onSymmetryChange(value) {
    this._sculptManager._symmetry = value;
    this._main.render();
  }

  addEvents() {
    var cbLoadAlpha = this.loadAlpha.bind(this);
    document.getElementById('alphaopen').addEventListener('change', cbLoadAlpha, false);
    this.removeCallback = function () {
      document.getElementById('alphaopen').removeEventListener('change', cbLoadAlpha, false);
    };
  }

  removeEvents() {
    if (this.removeCallback) this.removeCallback();
    if (this._toolbarContainer && this._toolbarContainer.parentNode) {
      this._toolbarContainer.parentNode.removeChild(this._toolbarContainer);
    }
  }

  getSelectedTool() {
    return this._ctrlSculpt.getValue();
  }

  releaseInvertSign() {
    if (!this._invertSign)
      return;
    this._invertSign = false;
    var tool = GuiTools[this.getSelectedTool()];
    if (tool.toggleNegative)
      tool.toggleNegative();
  }

  onChangeTool(newValue) {
    GuiSculptingTools.hide(this._sculptManager.getToolIndex());
    this._sculptManager.setToolIndex(newValue);
    GuiSculptingTools.show(newValue);

    var showContinuous = this._sculptManager.canBeContinuous() === true;
    this._ctrlContinuous.setVisibility(showContinuous);

    var showSym = newValue !== Enums.Tools.TRANSFORM;
    this._ctrlSymmetry.setVisibility(showSym);

    this._ctrlTitleCommon.setVisibility(showContinuous || showSym);

    // Update left toolbar active state
    for (var i = 0, nb = this._toolButtons.length; i < nb; ++i) {
      var btn = this._toolButtons[i];
      if (!btn) continue;
      if (i === newValue) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    this._main.getPicking().updateLocalAndWorldRadius2();
  }

  loadAlpha(event) {
    if (event.target.files.length === 0)
      return;

    var file = event.target.files[0];
    if (!file.type.match('image.*'))
      return;

    var reader = new FileReader();
    var main = this._main;
    var tool = GuiTools[this._sculptManager.getToolIndex()];

    reader.onload = function (evt) {
      var img = new Image();
      img.src = evt.target.result;
      img.onload = main.onLoadAlphaImage.bind(main, img, file.name || 'new alpha', tool);
    };

    document.getElementById('alphaopen').value = '';
    reader.readAsDataURL(file);
  }

  addAlphaOptions(opts) {
    for (var i = 0, nbTools = GuiTools.length; i < nbTools; ++i) {
      var gTool = GuiTools[i];
      if (gTool && gTool._ctrlAlpha) gTool._ctrlAlpha.addOptions(opts);
    }
  }

  updateMesh() {
    this._menu.setVisibility(!!this._main.getMesh());
    if (this._toolbarContainer) {
      this._toolbarContainer.style.display = this._main.getMesh() ? 'flex' : 'none';
    }
  }

  _startModalBrushRadius(x, y) {
    this._refX = x;
    this._refY = y;
    var cur = GuiTools[this.getSelectedTool()];
    if (cur._ctrlRadius) {
      var rad = cur._ctrlRadius.getValue();
      this._refX -= rad;
      this._main.getSculptManager().getSelection().setOffsetX(-rad * this._main.getPixelRatio());
      this._main.renderSelectOverRtt();
    }
  }

  _checkModifierKey(event) {
    var selectedTool = this.getSelectedTool();

    if (this._main._action === Enums.Action.NOTHING) {
      if (event.shiftKey && !event.altKey && !event.ctrlKey) {
        // smoothing on shift key
        if (selectedTool !== Enums.Tools.SMOOTH) {
          this._toolOnRelease = selectedTool;
          this._ctrlSculpt.setValue(Enums.Tools.SMOOTH);
        }
      }
      if (event.ctrlKey && !event.shiftKey && !event.altKey) {
        // masking on ctrl key
        if (selectedTool !== Enums.Tools.MASKING) {
          this._toolOnRelease = selectedTool;
          this._ctrlSculpt.setValue(Enums.Tools.MASKING);
        }
      }
    }
    if (event.altKey) {
      // invert sign on alt key
      if (this._invertSign || event.shiftKey) return true;
      this._invertSign = true;
      var curTool = GuiTools[selectedTool];
      if (curTool.toggleNegative)
        curTool.toggleNegative();
      return true;
    }
    return false;
  }

  ////////////////
  // KEY EVENTS
  //////////////// 
  onKeyDown(event) {
    if (event.handled === true)
      return;

    var main = this._main;
    var shk = getOptionsURL.getShortKey(event.which);
    event.stopPropagation();

    if (!main._focusGui || shk === Enums.KeyAction.RADIUS || shk === Enums.KeyAction.INTENSITY)
      event.preventDefault();

    event.handled = true;
    if (this._checkModifierKey(event))
      return;

    if (main._action !== Enums.Action.NOTHING)
      return;

    if (shk !== undefined && Tools[shk])
      return this._ctrlSculpt.setValue(shk);

    var cur = GuiTools[this.getSelectedTool()];

    switch (shk) {
    case Enums.KeyAction.DELETE:
      main.deleteCurrentSelection();
      break;
    case Enums.KeyAction.INTENSITY:
      this._modalBrushIntensity = main._focusGui = true;
      break;
    case Enums.KeyAction.RADIUS:
      if (!this._modalBrushRadius) this._startModalBrushRadius(this._lastPageX, this._lastPageY);
      this._modalBrushRadius = main._focusGui = true;
      break;
    case Enums.KeyAction.NEGATIVE:
      if (cur.toggleNegative) cur.toggleNegative();
      break;
    case Enums.KeyAction.PICKER:
      var ctrlPicker = cur._ctrlPicker;
      if (ctrlPicker && !ctrlPicker.getValue()) ctrlPicker.setValue(true);
      break;
    default:
      event.handled = false;
    }
  }

  onKeyUp(event) {
    var releaseTool = this._main._action === Enums.Action.NOTHING && this._toolOnRelease !== -1 && !event.ctrlKey && !event.shiftKey;
    if (!event.altKey || releaseTool)
      this.releaseInvertSign();

    if (releaseTool) {
      this._ctrlSculpt.setValue(this._toolOnRelease);
      this._toolOnRelease = -1;
    }

    var main = this._main;
    switch (getOptionsURL.getShortKey(event.which)) {
    case Enums.KeyAction.RADIUS:
      this._modalBrushRadius = main._focusGui = false;
      var selRadius = this._main.getSculptManager().getSelection();
      selRadius.setOffsetX(0.0);
      event.pageX = this._lastPageX;
      event.pageY = this._lastPageY;
      main.setMousePosition(event);
      main.getPicking().intersectionMouseMeshes();
      main.renderSelectOverRtt();
      break;
    case Enums.KeyAction.PICKER:
      var cur = GuiTools[this.getSelectedTool()];
      var ctrlPicker = cur._ctrlPicker;
      if (ctrlPicker && ctrlPicker.getValue()) ctrlPicker.setValue(false);
      break;
    case Enums.KeyAction.INTENSITY:
      this._modalBrushIntensity = main._focusGui = false;
      break;
    }
  }

  ////////////////
  // POINTER & MOUSE EVENTS
  ////////////////
  onPointerUp(event) {
    this.onMouseUp(event);
  }

  onPointerMove(event) {
    this.onMouseMove(event);
  }

  onPointerOver(event) {
    this.onMouseOver(event);
  }

  onPointerOut(event) {
    this.onMouseOut(event);
  }

  onMouseDown(event) {
  }

  onMouseUp(event) {
    if (this._toolOnRelease !== -1 && !event.ctrlKey && !event.shiftKey) {
      this.releaseInvertSign();
      this._ctrlSculpt.setValue(this._toolOnRelease);
      this._toolOnRelease = -1;
    }
  }

  onMouseMove(event) {
    var wid = GuiTools[this.getSelectedTool()];

    if (this._modalBrushRadius && wid._ctrlRadius) {
      var dx = event.pageX - this._refX;
      var dy = event.pageY - this._refY;
      wid._ctrlRadius.setValue(Math.sqrt(dx * dx + dy * dy));
      this._main.renderSelectOverRtt();
    }

    if (this._modalBrushIntensity && wid._ctrlIntensity) {
      wid._ctrlIntensity.setValue(wid._ctrlIntensity.getValue() + event.pageX - this._lastPageX);
    }

    this._lastPageX = event.pageX;
    this._lastPageY = event.pageY;
  }

  onMouseOver(event) {
    if (this._modalBrushRadius)
      this._startModalBrushRadius(event.pageX, event.pageY);
  }

  onMouseOut(event) {
  }
}

export default GuiSculpting;
