/**
* RootView.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* The top-most view that's used for proper layering or modals and popups.
*/
import React = require('react');
import RN = require('react-native');
import { RootView as RootViewBase, RootViewUsingProps as RootViewUsingPropsBase, BaseRootViewProps, RootViewPropsWithMainViewType, RootViewState, BaseRootView } from '../native-common/RootView';
import FocusManager from './utils/FocusManager';
declare const RootViewUsingStore: {
    new (...args: any[]): {
        _focusManager: FocusManager;
        _keyboardHandlerInstalled: boolean;
        _isNavigatingWithKeyboardUpateTimer: number | undefined;
        _onTouchStartCapture: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyDownCapture: (e: RN.NativeSyntheticEvent<any>) => void;
        _updateKeyboardNavigationState(isNavigatingWithKeyboard: boolean): void;
        _onKeyDown: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyPress: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyUp: (e: RN.NativeSyntheticEvent<any>) => void;
        getChildContext(): {
            focusManager: FocusManager;
        };
        renderTopView(content: JSX.Element): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        render(): React.ReactNode;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    childContextTypes: React.ValidationMap<any>;
} & typeof RootViewBase;
declare const RootViewUsingProps: {
    new (...args: any[]): {
        _focusManager: FocusManager;
        _keyboardHandlerInstalled: boolean;
        _isNavigatingWithKeyboardUpateTimer: number | undefined;
        _onTouchStartCapture: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyDownCapture: (e: RN.NativeSyntheticEvent<any>) => void;
        _updateKeyboardNavigationState(isNavigatingWithKeyboard: boolean): void;
        _onKeyDown: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyPress: (e: RN.NativeSyntheticEvent<any>) => void;
        _onKeyUp: (e: RN.NativeSyntheticEvent<any>) => void;
        getChildContext(): {
            focusManager: FocusManager;
        };
        renderTopView(content: JSX.Element): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: {}) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        render(): React.ReactNode;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    childContextTypes: React.ValidationMap<any>;
} & typeof RootViewUsingPropsBase;
export { BaseRootViewProps, RootViewPropsWithMainViewType, RootViewState, BaseRootView, RootViewUsingStore as RootView, RootViewUsingProps };
export default RootViewUsingStore;
