"use strict";
/**
* PopupContainerViewBase.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Common parent of all components rendered into a popup. Calls onShow and onHide
* callbacks when the popup is hidden (i.e. "closed" but still rendered as hidden)
* and re-shown. Abstract class to be overriden per platform.
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
var PropTypes = require("prop-types");
var PopupContainerViewBase = /** @class */ (function (_super) {
    __extends(PopupContainerViewBase, _super);
    function PopupContainerViewBase(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._popupComponentStack = [];
        return _this;
    }
    PopupContainerViewBase.prototype.getChildContext = function () {
        return {
            focusManager: this.context.focusManager,
            popupContainer: this
        };
    };
    PopupContainerViewBase.prototype.registerPopupComponent = function (onShow, onHide) {
        var component = {
            onShow: onShow,
            onHide: onHide
        };
        this._popupComponentStack.push(component);
        return component;
    };
    PopupContainerViewBase.prototype.unregisterPopupComponent = function (component) {
        this._popupComponentStack = this._popupComponentStack.filter(function (c) { return c !== component; });
    };
    PopupContainerViewBase.prototype.isHidden = function () {
        return !!this.props.hidden;
    };
    PopupContainerViewBase.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.hidden && !this.props.hidden) {
            // call onShow on all registered components (iterate front to back)
            for (var i = 0; i < this._popupComponentStack.length; i++) {
                this._popupComponentStack[i].onShow();
            }
        }
        if (!prevProps.hidden && this.props.hidden) {
            // call onHide on all registered components (iterate back to front)
            for (var i = this._popupComponentStack.length - 1; i >= 0; i--) {
                this._popupComponentStack[i].onHide();
            }
        }
    };
    PopupContainerViewBase.contextTypes = {
        focusManager: PropTypes.object
    };
    PopupContainerViewBase.childContextTypes = {
        focusManager: PropTypes.object,
        popupContainer: PropTypes.object
    };
    return PopupContainerViewBase;
}(React.Component));
exports.PopupContainerViewBase = PopupContainerViewBase;
exports.default = PopupContainerViewBase;
