/**
 * WebView.tsx
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * A control that allows the display of an independent web page.
 */
import * as React from 'react';
import * as RN from 'react-native';
import * as RX from '../common/Interfaces';
export declare class WebView extends React.Component<RX.Types.WebViewProps, RX.Types.Stateless> implements RX.WebView {
    private _mountedComponent;
    render(): JSX.Element;
    private _sandboxToMixedContentMode;
    protected _onMount: (component: RN.WebView) => void;
    protected _onMessage: (e: RN.NativeSyntheticEvent<RN.WebViewMessageEventData>) => void;
    private _buildSource;
    postMessage(message: string, targetOrigin?: string): void;
    reload(): void;
    goBack(): void;
    goForward(): void;
}
export default WebView;
