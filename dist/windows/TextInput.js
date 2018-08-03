"use strict";
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Windows-specific implementation of the cross-platform TextInput abstraction.
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var RN = require("react-native");
var Types = require("../common/Types");
var AccessibilityUtil_1 = require("../native-common/AccessibilityUtil");
var FocusManager_1 = require("../native-desktop/utils/FocusManager");
var TextInput_1 = require("../native-common/TextInput");
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onFocusEx = function (e) {
            if (e.currentTarget === e.target) {
                _this.onFocus();
            }
            if (_this._onFocusHandler) {
                _this._onFocusHandler(e);
            }
        };
        _this._onBlurEx = function (e) {
            _this.onBlur();
            if (_this._onBlurHandler) {
                _this._onBlurHandler(e);
            }
        };
        return _this;
    }
    TextInput.prototype._render = function (props, onMount) {
        this._onFocusHandler = props.onFocus;
        this._onBlurHandler = props.onBlur;
        var extendedProps = {
            tabIndex: this.getTabIndex()
        };
        return (React.createElement(RN.TextInput, __assign({}, props, extendedProps, { ref: onMount, importantForAccessibility: this.getImportantForAccessibility(), onFocus: this._onFocusEx, onBlur: this._onBlurEx })));
    };
    // From FocusManagerFocusableComponent interface
    //
    TextInput.prototype.onFocus = function () {
        // Focus Manager hook
    };
    TextInput.prototype.onBlur = function () {
        // Focus Manager hook
    };
    TextInput.prototype.getTabIndex = function () {
        // Focus Manager may override this
        return this.props.tabIndex || 0;
    };
    TextInput.prototype.getImportantForAccessibility = function () {
        // Focus Manager may override this
        // Note: currently native-common flavor doesn't pass any accessibility properties to RN.TextInput.
        // This should ideally be fixed.
        // We force a default of Auto if no property is provided
        return AccessibilityUtil_1.default.importantForAccessibilityToString(this.props.importantForAccessibility, Types.ImportantForAccessibility.Auto);
    };
    TextInput.prototype.updateNativeAccessibilityProps = function () {
        if (this._mountedComponent) {
            var tabIndex = this.getTabIndex();
            var importantForAccessibility = this.getImportantForAccessibility();
            this._mountedComponent.setNativeProps({
                tabIndex: tabIndex,
                value: this.state.inputValue,
                isTabStop: this.props.editable && tabIndex >= 0,
                importantForAccessibility: importantForAccessibility
            });
        }
    };
    return TextInput;
}(TextInput_1.TextInput));
exports.TextInput = TextInput;
FocusManager_1.applyFocusableComponentMixin(TextInput);
exports.default = TextInput;
