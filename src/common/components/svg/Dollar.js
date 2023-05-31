import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const Dollar = (props) => (
    <Svg
        width={40}
        height={41}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect
            opacity={0.1}
            y={0.982}
            width={40}
            height={39.646}
            rx={19.823}
            fill="#1DBF73"
        />
        <Path
            d="M21.326 23.749c.32-.228.491-.61.45-1 0-.442-.3-.705-.943-.978v2.2c.175-.048.341-.123.493-.222Z"
            fill="#1DBF73"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 20.805c.03 5.496 4.504 9.93 10 9.912 5.496.018 9.97-4.416 10-9.912 0-5.523-4.477-10-10-10s-10 4.477-10 10Zm5.6 4.045.566-1.556.784.286a9.18 9.18 0 0 0 2.216.5v-2.9c-1.381-.492-2.793-1.242-2.793-3.075a2.416 2.416 0 0 1 1.227-2.164 4.017 4.017 0 0 1 1.566-.475v-1.272h1.665v1.284a7.11 7.11 0 0 1 2.38.654l.731.4-.8 1.448-.73-.4a4.96 4.96 0 0 0-1.579-.443v2.861c1.356.475 2.61 1.137 2.61 2.75a2.718 2.718 0 0 1-1.159 2.354c-.438.289-.933.48-1.451.56v1.75h-1.667V25.73c-.95-.078-1.885-.28-2.783-.6l-.783-.28Z"
            fill="#1DBF73"
        />
        <Path
            d="M18.451 17.364a.768.768 0 0 0-.411.742c0 .625.357.966 1.127 1.3v-2.27c-.25.033-.493.11-.716.228Z"
            fill="#1DBF73"
        />
    </Svg>
);

export default Dollar;
