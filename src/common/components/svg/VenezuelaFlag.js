import * as React from "react";
import Svg, { Path, Defs, G, Use } from "react-native-svg";

const VenezuelaFlag = (props) => (
    <Svg id="flag-icons-ve" viewBox="0 0 640 480">
    <Defs>
      <G id="d" transform="translate(0 -36)">
        <G id="c">
          <G id="b">
            <Path id="a" fill="#fff" d="M0-5-1.5-.2l2.8.9z"/>
            <Use xlinkHref="#a" width="180" height="120" transform="scale(-1 1)"/>
          </G>
          <Use xlinkHref="#b" width="180" height="120" transform="rotate(72)"/>
        </G>
        <Use xlinkHref="#b" width="180" height="120" transform="rotate(-72)"/>
        <Use xlinkHref="#c" width="180" height="120" transform="rotate(144)"/>
      </G>
    </Defs>
    <Path fill="#cf142b" d="M0 0h640v480H0z"/>
    <Path fill="#00247d" d="M0 0h640v320H0z"/>
    <Path fill="#fc0" d="M0 0h640v160H0z"/>
    <G id="f" transform="matrix(4 0 0 4 320 336)">
      <G id="e">
        <Use xlinkHref="#d" width="180" height="120" transform="rotate(10)"/>
        <Use xlinkHref="#d" width="180" height="120" transform="rotate(30)"/>
      </G>
      <Use xlinkHref="#e" width="180" height="120" transform="rotate(40)"/>
    </G>
    <Use xlinkHref="#f" width="180" height="120" transform="rotate(-80 320 336)"/>
  </Svg>
  
);

export default VenezuelaFlag;
