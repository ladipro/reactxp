"use strict";
/**
* FocusManager.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Manages focusable elements for better keyboard navigation (RN desktop version)
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var subscribableevent_1 = require("subscribableevent");
var FocusManager_1 = require("../../common/utils/FocusManager");
var AutoFocusHelper_1 = require("../../common/utils/AutoFocusHelper");
var AppConfig_1 = require("../../common/AppConfig");
var Platform_1 = require("../../native-common/Platform");
var Timers_1 = require("../../common/utils/Timers");
var UserInterface_1 = require("../../native-common/UserInterface");
var isNativeWindows = Platform_1.default.getType() === 'windows';
var OverrideType;
(function (OverrideType) {
    // No overriding is active (the falsy value)
    OverrideType[OverrideType["None"] = 0] = "None";
    // tabIndex overriding is active
    OverrideType[OverrideType["Accessible"] = 1] = "Accessible";
    // Both tabIndex and importantForAccessibility are overriden
    OverrideType[OverrideType["Limited"] = 2] = "Limited";
})(OverrideType = exports.OverrideType || (exports.OverrideType = {}));
var FocusManager = /** @class */ (function (_super) {
    __extends(FocusManager, _super);
    function FocusManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusManager.prototype.addFocusListenerOnComponent = function (component, onFocus) {
        // We intercept the "onFocus" all the focusable elements have to have
        component.onFocusSink = onFocus;
    };
    FocusManager.prototype.removeFocusListenerFromComponent = function (component, onFocus) {
        delete component.onFocusSink;
    };
    FocusManager.prototype.focusComponent = function (component) {
        if (component && component.focus) {
            FocusManager.setLastFocusedProgrammatically(component);
            component.focus();
            return true;
        }
        return false;
    };
    FocusManager.prototype.resetFocus = function (focusFirstWhenNavigatingWithKeyboard, callback) {
        if (FocusManager._runAfterArbitrationId) {
            AutoFocusHelper_1.cancelRunAfterArbitration(FocusManager._runAfterArbitrationId);
            FocusManager._runAfterArbitrationId = undefined;
        }
        if (UserInterface_1.default.isNavigatingWithKeyboard() && focusFirstWhenNavigatingWithKeyboard) {
            // When we're in the keyboard navigation mode, we want to have the
            // first focusable component to be focused straight away, without the
            // necessity to press Tab.
            FocusManager._requestFocusFirst();
            if (callback) {
                FocusManager._runAfterArbitrationId = AutoFocusHelper_1.runAfterArbitration(function () {
                    // Making sure to run after all autoFocus logic is done.
                    FocusManager._runAfterArbitrationId = undefined;
                    callback();
                });
            }
        }
    };
    FocusManager.prototype._updateComponentFocusRestriction = function (storedComponent) {
        if (storedComponent.runAfterArbitrationId) {
            AutoFocusHelper_1.cancelRunAfterArbitration(storedComponent.runAfterArbitrationId);
            storedComponent.runAfterArbitrationId = undefined;
        }
        var newOverrideType = OverrideType.None;
        if (storedComponent.restricted || (storedComponent.limitedCount > 0)) {
            newOverrideType = OverrideType.Limited;
        }
        else if (storedComponent.limitedCountAccessible > 0) {
            newOverrideType = OverrideType.Accessible;
        }
        var curOverrideType = storedComponent.curOverrideType || OverrideType.None;
        if (newOverrideType !== curOverrideType) {
            FocusManager._updateComponentTabIndexAndIFAOverrides(storedComponent.component, newOverrideType !== OverrideType.None, newOverrideType === OverrideType.Limited);
            if (newOverrideType !== OverrideType.None) {
                storedComponent.curOverrideType = newOverrideType;
                FocusManager._callFocusableComponentStateChangeCallbacks(storedComponent, true);
            }
            else {
                delete storedComponent.curOverrideType;
                FocusManager._callFocusableComponentStateChangeCallbacks(storedComponent, false);
            }
        }
    };
    FocusManager._updateComponentTabIndexAndIFAOverrides = function (component, tabIndexOverride, accessibleOverride) {
        if (tabIndexOverride) {
            component.tabIndexOverride = -1;
        }
        else {
            delete component.tabIndexOverride;
        }
        if (accessibleOverride) {
            component.importantForAccessibilityOverride = 'no-hide-descendants';
        }
        else {
            delete component.importantForAccessibilityOverride;
        }
        // Refresh the native view
        updateNativeAccessibilityProps(component);
    };
    FocusManager.setLastFocusedProgrammatically = function (component) {
        this._lastFocusedProgrammatically = component;
    };
    FocusManager.getLastFocusedProgrammatically = function (reset) {
        var ret = FocusManager._lastFocusedProgrammatically;
        if (ret && reset) {
            FocusManager._lastFocusedProgrammatically = undefined;
        }
        return ret;
    };
    FocusManager.getFocusableComponentWrapped = function (component) {
        var storedComponent = component.focusableComponentId
            ? FocusManager._allFocusableComponents[component.focusableComponentId]
            : undefined;
        if (storedComponent) {
            return {
                component: component,
                isAvailable: function () { return !storedComponent.removed && !storedComponent.restricted; }
            };
        }
        return undefined;
    };
    FocusManager.onComponentFocus = new subscribableevent_1.default();
    FocusManager.onComponentBlur = new subscribableevent_1.default();
    return FocusManager;
}(FocusManager_1.FocusManager));
exports.FocusManager = FocusManager;
function updateNativeAccessibilityProps(component) {
    // Call special method on component avoiding state changes/re-renderings
    if (component.updateNativeAccessibilityProps) {
        component.updateNativeAccessibilityProps();
    }
    else {
        if (AppConfig_1.default.isDevelopmentMode()) {
            console.error('FocusableComponentMixin: updateNativeAccessibilityProps doesn\'t exist!');
        }
    }
}
function applyFocusableComponentMixin(Component, isConditionallyFocusable, accessibleOnly) {
    if (accessibleOnly === void 0) { accessibleOnly = false; }
    // Call base
    // This adds the basic "monitor focusable components" functionality.
    FocusManager_1.applyFocusableComponentMixin(Component, isConditionallyFocusable, accessibleOnly);
    // Hook 'getImportantForAccessibility'
    inheritMethod('getImportantForAccessibility', function (origCallback) {
        // Check local override first, then focus manager one
        if (this.importantForAccessibilityOverride !== undefined) {
            // Local override available, use this one
            return this.importantForAccessibilityOverride;
        }
        else {
            // Override not available, defer to original handler to return the prop
            return origCallback.call(this);
        }
    });
    if (!accessibleOnly) {
        // Hook 'onFocus'
        inheritMethod('onFocus', function (origCallback) {
            var wrapped = FocusManager.getFocusableComponentWrapped(this);
            if (wrapped) {
                FocusManager.onComponentFocus.fire(wrapped);
            }
            if (this.onFocusSink) {
                this.onFocusSink();
            }
            else {
                if (AppConfig_1.default.isDevelopmentMode()) {
                    console.error('FocusableComponentMixin: onFocusSink doesn\'t exist!');
                }
            }
            origCallback.call(this);
        });
        // Hook 'onBlur'
        inheritMethod('onBlur', function (origCallback) {
            var wrapped = FocusManager.getFocusableComponentWrapped(this);
            if (wrapped) {
                FocusManager.onComponentBlur.fire(wrapped);
            }
            origCallback.call(this);
        });
        // Hook 'getTabIndex'
        inheritMethod('getTabIndex', function (origCallback) {
            // Check local override first, then focus manager one
            if (this.tabIndexLocalOverride !== undefined) {
                // Local override available, use this one
                return this.tabIndexLocalOverride;
            }
            else if (this.tabIndexOverride !== undefined) {
                // Override available, use this one
                return this.tabIndexOverride;
            }
            else {
                // Override not available, defer to original handler to return the prop
                return origCallback.call(this);
            }
        });
        if (isNativeWindows) {
            // UWP platform (at least) is slightly stricter with regard to tabIndex combinations.
            // The "component focusable but not in tab order" case (usually encoded with tabIndex<0 for browsers) is not supported.
            // A negative tabIndex disables focusing/keyboard input completely instead (though a component already having keyboard focus
            // doesn't lose it right away).
            // We try to simulate the right behavior through a trick.
            inheritMethod('focus', function (origCallback) {
                var _this = this;
                FocusManager.setLastFocusedProgrammatically(this);
                var tabIndex = this.getTabIndex();
                // Check effective tabIndex
                if (tabIndex !== undefined && tabIndex < 0) {
                    // A negative tabIndex maps to non focusable in UWP.
                    // We temporary apply a local override of "tabIndex=0", and then forward the focus command.
                    // A timer makes sure the tabIndex returns back to "non-overriden" state.
                    // - If the component is not under FocusManager control (a View with tabIndex===-1, for ex.), the only action
                    // available for user is to tab out.
                    // - If the component is under FocusManager control, the "tabIndex===-1" is usually due to a limit imposed on
                    // the component, and that limit is usually removed when component acquires focus. If not, the user has again
                    // one only choice left: to tab out.
                    // A more accurate solution would require tracking onBlur and other state.
                    this.tabIndexLocalOverride = 0;
                    // Refresh the native view
                    updateNativeAccessibilityProps(this);
                    this.tabIndexLocalOverrideTimer = Timers_1.default.setTimeout(function () {
                        if (_this.tabIndexLocalOverrideTimer !== undefined) {
                            _this.tabIndexLocalOverrideTimer = undefined;
                            // Remove override
                            delete _this.tabIndexLocalOverride;
                            // Refresh the native view
                            updateNativeAccessibilityProps(_this);
                        }
                    }, 500);
                }
                // To original
                return origCallback.call(this);
            });
            inheritMethod('componentWillUnmount', function (origCallback) {
                // Reset any pending local override timer
                delete this.tabIndexLocalOverrideTimer;
                // To original (base mixin already has an implementation)
                return origCallback.call(this);
            });
        }
    }
    function inheritMethod(methodName, action) {
        var origCallback = Component.prototype[methodName];
        if (origCallback) {
            Component.prototype[methodName] = function () {
                return action.call(this, origCallback, arguments);
            };
        }
        else {
            if (AppConfig_1.default.isDevelopmentMode()) {
                console.error('FocusableComponentMixin: ' + methodName + ' is expected to exist and it doesn\'t!');
            }
        }
    }
}
exports.applyFocusableComponentMixin = applyFocusableComponentMixin;
exports.default = FocusManager;
