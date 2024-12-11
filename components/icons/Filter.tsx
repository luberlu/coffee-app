import Svg, { Path, Mask, G } from "react-native-svg";

type IconlyIconProps = {
  size?: number;
  color?: string;
};

export const FilterIcon = ({
  size = 24,
  color = "#000000",
}: IconlyIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0801 18.5928H3.7791C3.3651 18.5928 3.0291 18.2568 3.0291 17.8428C3.0291 17.4288 3.3651 17.0928 3.7791 17.0928H10.0801C10.4941 17.0928 10.8301 17.4288 10.8301 17.8428C10.8301 18.2568 10.4941 18.5928 10.0801 18.5928Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.1909 8.90045H12.8909C12.4769 8.90045 12.1409 8.56445 12.1409 8.15045C12.1409 7.73645 12.4769 7.40045 12.8909 7.40045H19.1909C19.6049 7.40045 19.9409 7.73645 19.9409 8.15045C19.9409 8.56445 19.6049 8.90045 19.1909 8.90045Z"
        fill={color}
      />
      <Mask
        id="mask0_418_847"
        maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="3"
        y="5"
        width="7"
        height="7"
      >
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 5.00043H9.2258V11.192H3V5.00043Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_418_847)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.1128 6.5C5.2238 6.5 4.4998 7.216 4.4998 8.097C4.4998 8.977 5.2238 9.692 6.1128 9.692C7.0028 9.692 7.7258 8.977 7.7258 8.097C7.7258 7.216 7.0028 6.5 6.1128 6.5ZM6.1128 11.192C4.3968 11.192 2.9998 9.804 2.9998 8.097C2.9998 6.39 4.3968 5 6.1128 5C7.8298 5 9.2258 6.39 9.2258 8.097C9.2258 9.804 7.8298 11.192 6.1128 11.192Z"
          fill={color}
        />
      </G>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.3877 16.208C16.4977 16.208 15.7737 16.924 15.7737 17.804C15.7737 18.685 16.4977 19.4 17.3877 19.4C18.2767 19.4 18.9997 18.685 18.9997 17.804C18.9997 16.924 18.2767 16.208 17.3877 16.208ZM17.3877 20.9C15.6707 20.9 14.2737 19.511 14.2737 17.804C14.2737 16.097 15.6707 14.708 17.3877 14.708C19.1037 14.708 20.4997 16.097 20.4997 17.804C20.4997 19.511 19.1037 20.9 17.3877 20.9Z"
        fill={color}
      />
    </Svg>
  );
};
