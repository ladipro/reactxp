/**
* GestureView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform GestureView component.
* It provides much of the standard work necessary to support combinations of
* pinch-and-zoom, panning, single tap and double tap gestures.
*/
import React = require('react');
import Types = require('../common/Types');
export declare abstract class GestureView extends React.Component<Types.GestureViewProps, Types.Stateless> {
    private _panResponder;
    private _doubleTapTimer;
    private _pendingGestureType;
    private _pendingGestureState;
    private _lastTapEvent;
    private _lastGestureStartEvent;
    constructor(props: Types.GestureViewProps);
    componentWillUnmount(): void;
    protected abstract _getPreferredPanRatio(): number;
    protected abstract _getEventTimestamp(e: Types.TouchEvent): number;
    private _onPanResponderEnd;
    private _setPendingGestureState;
    private _detectMoveGesture;
    private _isTap;
    private _isDoubleTap;
    private _startDoubleTapTimer;
    private _cancelDoubleTapTimer;
    private _reportDelayedTap;
    private _shouldRespondToPinchZoom;
    private _shouldRespondToRotate;
    private _shouldRespondToPan;
    private _shouldRespondToPanVertical;
    private _shouldRespondToPanHorizontal;
    private _calcDistance;
    private _calcAngle;
    private _radiansToDegrees;
    private _sendMultiTouchEvents;
    private _sendPanEvent;
    private _sendTapEvent;
    private _sendDoubleTapEvent;
    render(): JSX.Element;
}
export default GestureView;
