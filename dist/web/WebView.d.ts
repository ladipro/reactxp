/**
* WebView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* A control that allows the display of an independent web page.
*/
import React = require('react');
import RX = require('../common/Interfaces');
import Types = require('../common/Types');
export interface WebViewState {
    postComplete?: boolean;
    webFormIdentifier?: string;
    webFrameIdentifier?: string;
}
export declare class WebView extends React.Component<Types.WebViewProps, WebViewState> implements RX.WebView {
    private static _webFrameNumber;
    private static _onMessageReceived;
    private static _messageListenerInstalled;
    private _mountedComponent;
    private _onMessageReceivedToken;
    constructor(props: Types.WebViewProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Types.WebViewProps, prevState: WebViewState): void;
    componentWillUnmount(): void;
    private _getCustomHtml;
    private _setContents;
    private _installMessageListener;
    private _postRender;
    render(): JSX.Element;
    protected _onMount: (component: HTMLIFrameElement | null) => void;
    private _onLoad;
    private _sandboxToStringValue;
    postMessage(message: string, targetOrigin?: string): void;
    reload(): void;
    goBack(): void;
    goForward(): void;
}
export default WebView;
