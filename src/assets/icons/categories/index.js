// Importar todas las imágenes
import CarPollution from "./icons8-car-pollution-96.png";
import Motor from "./motor.png";
import Frenos from "./frenos.png";
import AireAcondicionado from "./aire-acondicionado.png";
import AceiteDeMotor from "./aceite-de-motor.png";
import Bateria from "./batería.png";
import Carroceria from "./carroceria.png";
import Llanta from "./llanta.png";
import Kit from './kit.png'
import NotImage from './notImage.png'
//... importar las demás imágenes

// Crear un objeto que mapee los nombres de los iconos a las imágenes importadas
const category = {
  "icons8-car-pollution-96.png": CarPollution,
  "motor.png": Motor,
  "frenos.png": Frenos,
  "aire-acondicionado.png": AireAcondicionado,
  "aceite-de-motor.png": AceiteDeMotor,
  "batería.png": Bateria,
  "carroceria.png": Carroceria,
  "llanta.png": Llanta,
  'kit.png': Kit,
  "notImage": NotImage
};

export default category;
