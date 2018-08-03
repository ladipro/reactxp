/**
* GestureView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform GestureView component.
* It provides support for the scroll wheel, clicks and double clicks.
*/
import React = require('react');
import Types = require('../common/Types');
export declare class GestureView extends React.Component<Types.GestureViewProps, Types.Stateless> {
    private _id;
    private _container;
    private _doubleTapTimer;
    private _lastTapEvent;
    private _responder;
    private _pendingGestureType;
    private _gestureTypeLocked;
    private _skipNextTap;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _createMouseResponder;
    private _disposeMouseResponder;
    private _setContainerRef;
    private _getStyles;
    private _onClick;
    private _sendContextMenuEvent;
    private _detectGestureType;
    private _getPanPixelThreshold;
    private _shouldRespondToPan;
    private _shouldRespondToPanVertical;
    private _shouldRespondToPanHorizontal;
    private _onWheel;
    private _calcDistance;
    private _isDoubleTap;
    private _startDoubleTapTimer;
    private _cancelDoubleTapTimer;
    private _reportDelayedTap;
    private _sendTapEvent;
    private _sendDoubleTapEvent;
    private _sendPanEvent;
    private _getGestureViewClientRect;
}
export default GestureView;
