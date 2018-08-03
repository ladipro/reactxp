/**
* Animated.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN-specific implementation of the cross-platform Animation abstraction.
*/
import RN = require('react-native');
import Types = require('../common/Types');
import RX = require('../common/Interfaces');
export interface AnimatedClasses {
    Image: typeof RN.ReactNativeBaseComponent;
    Text: typeof RN.ReactNativeBaseComponent;
    TextInput: typeof RN.ReactNativeBaseComponent;
    View: typeof RN.ReactNativeBaseComponent;
}
export declare const CommonAnimatedClasses: AnimatedClasses;
export declare function makeAnimated(nativeAnimatedClasses: AnimatedClasses, useFocusRestrictedView?: boolean): RX.Animated;
export declare let AnimatedCommon: {
    Easing: Types.Animated.Easing;
    timing: (value: Types.AnimatedValue, config: Types.Animated.TimingAnimationConfig) => Types.Animated.CompositeAnimation;
    delay: typeof RN.Animated.delay;
    parallel: typeof RN.Animated.parallel;
    sequence: typeof RN.Animated.sequence;
    Value: typeof RN.Animated.Value;
    createValue: (initialValue: number) => RN.Animated.Value;
    interpolate: (animatedValue: Types.AnimatedValue, inputRange: number[], outputRange: string[]) => Types.InterpolatedValue;
};
export default AnimatedCommon;
