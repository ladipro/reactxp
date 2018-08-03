"use strict";
/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the functions which allow to handle the selection of a proper component
* to focus from the multiple candidates with autoFocus=true.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Timers_1 = require("./Timers");
var _arbitrateTimeout = 100;
var _sortAndFilter;
var _autoFocusTimer;
var _lastFocusArbitratorProviderId = 0;
var _rootFocusArbitratorProvider;
var _requestFocusQueue = [];
var _runAfterArbitrationTimer;
var _runAfterArbitrationCallbacks = [];
var _runAfterArbitrationLastId = 0;
var FocusCandidateType;
(function (FocusCandidateType) {
    FocusCandidateType[FocusCandidateType["Focus"] = 1] = "Focus";
    FocusCandidateType[FocusCandidateType["FocusFirst"] = 2] = "FocusFirst";
})(FocusCandidateType = exports.FocusCandidateType || (exports.FocusCandidateType = {}));
function setSortAndFilterFunc(sortAndFilter) {
    _sortAndFilter = sortAndFilter;
}
exports.setSortAndFilterFunc = setSortAndFilterFunc;
function _runAfterArbitration() {
    if (_runAfterArbitrationTimer) {
        Timers_1.default.clearTimeout(_runAfterArbitrationTimer);
        _runAfterArbitrationTimer = undefined;
    }
    if (!_autoFocusTimer) {
        _runAfterArbitrationTimer = Timers_1.default.setTimeout(function () {
            _runAfterArbitrationTimer = undefined;
            if (_runAfterArbitrationCallbacks.length) {
                _runAfterArbitrationCallbacks.forEach(function (item) { return item.callback(); });
                _runAfterArbitrationCallbacks = [];
            }
        }, _arbitrateTimeout);
    }
}
function runAfterArbitration(callback) {
    _runAfterArbitrationCallbacks.push({
        id: ++_runAfterArbitrationLastId,
        callback: callback
    });
    _runAfterArbitration();
    return _runAfterArbitrationLastId;
}
exports.runAfterArbitration = runAfterArbitration;
function cancelRunAfterArbitration(id) {
    _runAfterArbitrationCallbacks = _runAfterArbitrationCallbacks.filter(function (item) { return item.id !== id; });
}
exports.cancelRunAfterArbitration = cancelRunAfterArbitration;
var FocusArbitratorProvider = /** @class */ (function () {
    function FocusArbitratorProvider(view, arbitrator) {
        this._candidates = [];
        this._pendingChildren = {};
        this._id = ++_lastFocusArbitratorProviderId;
        this._parentArbitratorProvider = view
            ? ((view.context && view.context.focusArbitrator) || _rootFocusArbitratorProvider)
            : undefined;
        this._arbitratorCallback = arbitrator;
    }
    FocusArbitratorProvider.prototype._notifyParent = function () {
        if (this._parentArbitratorProvider) {
            this._parentArbitratorProvider._pendingChildren['fa-' + this._id] = this;
            this._parentArbitratorProvider._notifyParent();
        }
    };
    FocusArbitratorProvider.prototype._arbitrate = function () {
        var _this = this;
        var candidates = this._candidates;
        Object.keys(this._pendingChildren).forEach(function (key) {
            var candidate = _this._pendingChildren[key]._arbitrate();
            if (candidate) {
                candidates.push(candidate);
            }
        });
        this._candidates = [];
        this._pendingChildren = {};
        return FocusArbitratorProvider._arbitrate(candidates, this._arbitratorCallback);
    };
    FocusArbitratorProvider.prototype._requestFocus = function (component, focus, isAvailable, type) {
        var accessibilityId = component.props && component.props.accessibilityId;
        this._candidates.push({
            component: component,
            focus: focus,
            isAvailable: isAvailable,
            type: type,
            accessibilityId: accessibilityId
        });
        this._notifyParent();
    };
    FocusArbitratorProvider._arbitrate = function (candidates, arbitrator) {
        // Filtering out everything which is already unmounted.
        candidates = candidates.filter(function (item) { return item.isAvailable(); });
        if (_sortAndFilter) {
            candidates = _sortAndFilter(candidates);
        }
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i].type === FocusCandidateType.FocusFirst) {
                return candidates[i];
            }
        }
        if (arbitrator) {
            // There is an application specified focus arbitrator.
            var toArbitrate_1 = [];
            candidates.forEach(function (candidate) {
                var component = candidate.component;
                // Make sure to pass FocusableComponents only.
                if (component.focus && component.blur && component.requestFocus) {
                    component.__focusCandidateInternal = candidate;
                    toArbitrate_1.push({
                        component: component,
                        accessibilityId: candidate.accessibilityId
                    });
                }
            });
            if (toArbitrate_1.length) {
                var candidate = arbitrator(toArbitrate_1);
                var ret = void 0;
                if (candidate && candidate.component && candidate.component.__focusCandidateInternal) {
                    ret = candidate.component.__focusCandidateInternal;
                }
                toArbitrate_1.forEach(function (candidate) {
                    delete candidate.component.__focusCandidateInternal;
                });
                return ret;
            }
        }
        return candidates[candidates.length - 1];
    };
    FocusArbitratorProvider.prototype.setCallback = function (arbitrator) {
        this._arbitratorCallback = arbitrator;
    };
    FocusArbitratorProvider.requestFocus = function (component, focus, isAvailable, type) {
        if (_autoFocusTimer) {
            Timers_1.default.clearTimeout(_autoFocusTimer);
        }
        if (_runAfterArbitrationTimer) {
            Timers_1.default.clearTimeout(_runAfterArbitrationTimer);
            _runAfterArbitrationTimer = undefined;
        }
        _requestFocusQueue.push(function () {
            var c = typeof component === 'function' ? component() : component;
            if (c) {
                var focusArbitratorProvider = ((c._focusArbitratorProvider instanceof FocusArbitratorProvider) &&
                    c._focusArbitratorProvider) ||
                    (c.context && c.context.focusArbitrator) ||
                    _rootFocusArbitratorProvider;
                focusArbitratorProvider._requestFocus(c, focus, isAvailable, type || FocusCandidateType.Focus);
            }
        });
        _autoFocusTimer = Timers_1.default.setTimeout(function () {
            _autoFocusTimer = undefined;
            for (var i = 0; i < _requestFocusQueue.length; i++) {
                _requestFocusQueue[i]();
            }
            _requestFocusQueue = [];
            var candidate = _rootFocusArbitratorProvider._arbitrate();
            if (candidate) {
                candidate.focus();
            }
            _runAfterArbitration();
        }, _arbitrateTimeout);
    };
    return FocusArbitratorProvider;
}());
exports.FocusArbitratorProvider = FocusArbitratorProvider;
_rootFocusArbitratorProvider = new FocusArbitratorProvider();
