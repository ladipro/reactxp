"use strict";
/**
 * WebView.tsx
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * A control that allows the display of an independent web page.
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
var React = require("react");
var RN = require("react-native");
var Types = require("../common/Types");
var Styles_1 = require("./Styles");
var _styles = {
    webViewDefault: Styles_1.default.createWebViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    })
};
var WebView = /** @class */ (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mountedComponent = null;
        _this._onMount = function (component) {
            _this._mountedComponent = component;
        };
        _this._onMessage = function (e) {
            if (_this.props.onMessage) {
                var event_1 = {
                    defaultPrevented: e.defaultPrevented,
                    nativeEvent: e.nativeEvent,
                    cancelable: e.cancelable,
                    timeStamp: e.timeStamp,
                    bubbles: e.bubbles,
                    origin: '*',
                    data: e.nativeEvent.data,
                    stopPropagation: function () { return e.stopPropagation(); },
                    preventDefault: function () { return e.preventDefault(); },
                };
                _this.props.onMessage(event_1);
            }
        };
        return _this;
    }
    WebView.prototype.render = function () {
        var styles = [_styles.webViewDefault, this.props.style];
        var source = this._buildSource();
        return (React.createElement(RN.WebView, { ref: this._onMount, style: styles, source: source, startInLoadingState: this.props.startInLoadingState, javaScriptEnabled: this.props.javaScriptEnabled, injectedJavaScript: this.props.injectedJavaScript, domStorageEnabled: this.props.domStorageEnabled, scalesPageToFit: this.props.scalesPageToFit, onNavigationStateChange: this.props.onNavigationStateChange, onShouldStartLoadWithRequest: this.props.onShouldStartLoadWithRequest, onLoadStart: this.props.onLoadStart, onLoad: this.props.onLoad, onError: this.props.onError, onMessage: this.props.onMessage ? this._onMessage : undefined, testID: this.props.testId, mixedContentMode: this._sandboxToMixedContentMode(this.props.sandbox) }));
    };
    WebView.prototype._sandboxToMixedContentMode = function (sandbox) {
        if (!!sandbox) {
            if (sandbox & Types.WebViewSandboxMode.AllowMixedContentAlways) {
                return 'always';
            }
            if (sandbox & Types.WebViewSandboxMode.AllowMixedContentCompatibilityMode) {
                return 'compatibility';
            }
        }
        return 'never';
    };
    WebView.prototype._buildSource = function () {
        var _a = this.props, headers = _a.headers, source = _a.source, url = _a.url;
        if (url) {
            return { headers: headers, uri: url };
        }
        if (source) {
            return source;
        }
        return undefined;
    };
    WebView.prototype.postMessage = function (message, targetOrigin) {
        if (targetOrigin === void 0) { targetOrigin = '*'; }
        if (this._mountedComponent) {
            this._mountedComponent.postMessage(message);
        }
    };
    WebView.prototype.reload = function () {
        if (this._mountedComponent) {
            this._mountedComponent.reload();
        }
    };
    WebView.prototype.goBack = function () {
        if (this._mountedComponent) {
            this._mountedComponent.goBack();
        }
    };
    WebView.prototype.goForward = function () {
        if (this._mountedComponent) {
            this._mountedComponent.goForward();
        }
    };
    return WebView;
}(React.Component));
exports.WebView = WebView;
exports.default = WebView;
