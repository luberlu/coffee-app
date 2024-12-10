import { SharedValue } from "react-native-reanimated";
import {
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

type AnimationValues = { [key: string]: SharedValue<number> };

export const animations = {
  image: {
    in: (values: AnimationValues) => {
      values.opacity.value = withDelay(
        0,
        withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.sin),
        })
      );
      values.scale.value = withDelay(
        0,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.sin),
        })
      );
    },
    out: (values: AnimationValues) => {
      values.opacity.value = withDelay(
        0,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
      values.scale.value = withDelay(
        0,
        withTiming(0, {
          duration: 300,
          easing: Easing.ease,
        })
      );
    },
  },

  title: {
    in: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        600,
        withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        })
      );
      values.opacity.value = withDelay(
        600,
        withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        })
      );
    },
    out: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        100,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
      values.opacity.value = withDelay(
        100,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
    },
  },

  text: {
    in: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        700,
        withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        })
      );
      values.opacity.value = withDelay(
        700,
        withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        })
      );
    },
    out: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        200,
        withTiming(0, {
          duration: 300,
          easing: Easing.ease,
        })
      );
      values.opacity.value = withDelay(
        200,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
    },
  },

  button: {
    in: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        900,
        withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        })
      );
      values.opacity.value = withDelay(
        900,
        withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        })
      );
    },
    out: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        200,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
      values.opacity.value = withDelay(
        200,
        withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        })
      );
    },
  },

  view: {
    out: (values: AnimationValues) => {
      values.translateY.value = withDelay(
        0,
        withTiming(1, {
          duration: 600,
          easing: Easing.bezier(0.12, 0, 0.39, 0),
        })
      );
      values.translateX.value = withDelay(
        0,
        withTiming(1, {
          duration: 600,
          easing: Easing.bezier(0.12, 0, 0.39, 0),
        })
      );
    },
  },
};
