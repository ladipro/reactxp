"use strict";
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform TextInput abstraction.
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
var PropTypes = require("prop-types");
var AccessibilityUtil_1 = require("./AccessibilityUtil");
var AutoFocusHelper_1 = require("../common/utils/AutoFocusHelper");
var EventHelpers_1 = require("../native-common/utils/EventHelpers");
var Styles_1 = require("../native-common/Styles");
var _styles = {
    defaultTextInput: Styles_1.default.createTextInputStyle({
        borderWidth: 0,
        padding: 0
    })
};
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._selectionStart = 0;
        _this._selectionEnd = 0;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onPaste = function (e) {
            if (_this.props.onPaste) {
                _this.props.onPaste(e);
            }
        };
        _this._onFocus = function (e) {
            _this.setState({ isFocused: true });
            if (_this.props.onFocus) {
                _this.props.onFocus(e);
            }
        };
        _this._onBlur = function (e) {
            _this.setState({ isFocused: false });
            if (_this.props.onBlur) {
                _this.props.onBlur(e);
            }
        };
        _this._onChangeText = function (newText) {
            _this.setState({ inputValue: newText });
            if (_this.props.onChangeText) {
                _this.props.onChangeText(newText);
            }
        };
        _this._onSelectionChange = function (e) {
            var selection = e.nativeEvent.selection;
            /**
             * On iOS/macOS this callback is called BEFORE the _onChangeText, which means the inputValue hasn't had time to get updated yet
             * and cursor would always be one character behind. Fix this problem on Android only.
             */
            _this._selectionStart = selection.start;
            _this._selectionEnd = selection.end;
            if (_this.props.onSelectionChange) {
                _this.props.onSelectionChange(_this._selectionStart, _this._selectionEnd);
            }
            _this.forceUpdate();
        };
        _this._onKeyPress = function (e) {
            if (_this.props.onKeyPress) {
                _this.props.onKeyPress(EventHelpers_1.default.toKeyboardEvent(e));
            }
        };
        _this._onScroll = function (e) {
            if (_this.props.onScroll) {
                var contentOffset = e.nativeEvent.contentOffset;
                _this.props.onScroll(contentOffset.x, contentOffset.y);
            }
        };
        _this.state = {
            inputValue: props.value || '',
            isFocused: false
        };
        return _this;
    }
    TextInput.prototype.componentDidMount = function () {
        if (this.props.autoFocus) {
            this.requestFocus();
        }
    };
    TextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value !== this.state.inputValue) {
            this.setState({
                inputValue: nextProps.value || ''
            });
        }
    };
    TextInput.prototype.render = function () {
        var editable = this.props.editable !== false;
        var blurOnSubmit = this.props.blurOnSubmit || !this.props.multiline;
        var extendedProps = {
            onPaste: this._onPaste,
            maxContentSizeMultiplier: this.props.maxContentSizeMultiplier
        };
        return (React.createElement(RN.TextInput, __assign({ ref: this._onMount, multiline: this.props.multiline, style: Styles_1.default.combine([_styles.defaultTextInput, this.props.style]), value: this.state.inputValue, autoCorrect: this.props.autoCorrect, spellCheck: this.props.spellCheck, autoCapitalize: this.props.autoCapitalize, keyboardType: this.props.keyboardType, editable: editable, selectionColor: this.props.selectionColor, maxLength: this.props.maxLength, placeholder: this.props.placeholder, defaultValue: this.props.value, placeholderTextColor: this.props.placeholderTextColor, onSubmitEditing: this.props.onSubmitEditing, onKeyPress: this._onKeyPress, onChangeText: this._onChangeText, onSelectionChange: this._onSelectionChange, onFocus: this._onFocus, onBlur: this._onBlur, onScroll: this._onScroll, selection: { start: this._selectionStart, end: this._selectionEnd }, secureTextEntry: this.props.secureTextEntry, keyboardAppearance: this.props.keyboardAppearance, returnKeyType: this.props.returnKeyType, disableFullscreenUI: this.props.disableFullscreenUI, blurOnSubmit: blurOnSubmit, textBreakStrategy: 'simple', accessibilityLabel: this.props.accessibilityLabel, allowFontScaling: this.props.allowFontScaling, underlineColorAndroid: 'transparent', testID: this.props.testId }, extendedProps)));
    };
    TextInput.prototype.blur = function () {
        if (this._mountedComponent) {
            this._mountedComponent.blur();
        }
    };
    TextInput.prototype.requestFocus = function () {
        var _this = this;
        AutoFocusHelper_1.FocusArbitratorProvider.requestFocus(this, function () { return _this.focus(); }, function () { return !!_this._mountedComponent; });
    };
    TextInput.prototype.focus = function () {
        if (this._mountedComponent) {
            this._mountedComponent.focus();
        }
    };
    TextInput.prototype.setAccessibilityFocus = function () {
        if (this._mountedComponent) {
            AccessibilityUtil_1.default.setAccessibilityFocus(this);
        }
    };
    TextInput.prototype.isFocused = function () {
        return this.state.isFocused;
    };
    TextInput.prototype.selectAll = function () {
        // to make selection visible we have to implement it in native
        // http://stackoverflow.com/questions/1689911/programatically-select-all-text-in-uitextfield
    };
    TextInput.prototype.selectRange = function (start, end) {
        var constrainedStart = Math.min(start, this.state.inputValue.length);
        var constrainedEnd = Math.min(end, this.state.inputValue.length);
        this._selectionStart = constrainedStart;
        this._selectionEnd = constrainedEnd;
        this.forceUpdate();
    };
    TextInput.prototype.getSelectionRange = function () {
        var range = {
            start: this._selectionStart,
            end: this._selectionEnd
        };
        return range;
    };
    TextInput.prototype.setValue = function (value) {
        this._onChangeText(value);
    };
    TextInput.contextTypes = {
        focusArbitrator: PropTypes.object
    };
    return TextInput;
}(React.Component));
exports.TextInput = TextInput;
exports.default = TextInput;
