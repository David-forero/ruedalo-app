import { useContext, createContext, useState, useCallback } from "react";
import { post, get } from "../common/functions/http";
import { validationFormForMyCar } from "../common/functions/customValidation";
import dayjs from "dayjs";
import { showMessage } from "react-native-flash-message";

const MyCarsContext = createContext({});

const MyCarsProvider = ({ children }) => {
  const [oils, setOils] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [fuels, setFuels] = useState(null);

  const [years, setYears] = useState(null);
  const [models, setModels] = useState(null);
  const [makes, setMakes] = useState(null);
  const [trims, setTrims] = useState(null);

  const [listCars, setListCars] = useState(null);

  const [combustible, setCombustible] = useState("");
  const [selectCaja, setSelectCaja] = useState("");
  const [selectAceite, setSelectAceite] = useState(null);

  const getYearsFn = useCallback(async (token) => {
    const { data } = await get(
      "/get_years?sort=id&direction=asc&year=2020&page=3",
      token
    );

    const setNewDataArray = data.map((item, key) => {
      return {
        label: item,
        value: item,
      };
    });
    setYears(setNewDataArray);
  }, []);

  const getMakesFn = useCallback(async (item, token) => {
    const { data } = await get(
      `/get_makes?sort=id&direction=asc&year=${item.label}&page=1`,
      token
    );
    const setNewDataArray = data.data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setMakes(setNewDataArray);
  }, []);

  const getModelsFn = useCallback(async (item, token, year) => {
    const { data } = await get(
      `/get_models?sort=id&direction=asc&year=${year}&page=1&make_id=${item.value}`,
      token
    );
    const setNewDataArray = data.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setModels(setNewDataArray);
  }, []);

  const getTrimsFn = useCallback(async (year, item, make_id, token) => {
    const { data } = await get(
      `/get_trims?sort=id&direction=asc&year=${year}&page=1&model_id=${item.value}&make_id=${make_id}`,
      token
    );
    const setNewDataArray = data.data.map((item) => {
      return {
        label: item.description,
        value: item.id,
      };
    });
    setTrims(setNewDataArray);
  }, []);

  //🔽 Seccion de tipo de parametros del vehiculo 🔽

  const getFuelsFn = useCallback(async (token) => {
    const { data } = await get("/get_fuels", token);
    setFuels(data.body.data);
  }, []);

  const getOilsFn = useCallback(async (token) => {
    const { data } = await get("/get_oils", token);
    setOils(data.body.data);
  }, []);

  const getBoxesFn = useCallback(async (token) => {
    const { data } = await get("/get_boxes", token);
    setBoxes(data.body.data);
  }, []);

  const getListCarsFn = useCallback(async (token, setLoading) => {
    const { data } = await get("/list_cars", token);
    setLoading(false);
    setListCars(data.body.data.rows);
  }, []);

  const addVehicleFn = useCallback(
    async (fullData, otherData, navigation, token) => {
      const prepareData = {
        alias: "Mi vehiculo test",
        year: otherData?.myYear,
        odometro: fullData?.kilometraje,
        oil_date: dayjs(fullData?.aceite).format("YYYY-MM-DD"),
        tire_date: dayjs(fullData?.neumaticos).format("YYYY-MM-DD"),
        battery_date: dayjs(fullData?.bateria).format("YYYY-MM-DD"),
        id_make: otherData?.myMakes?.value,
        make: otherData?.myMakes?.label,
        id_model: otherData?.myModels?.value,
        model: otherData?.myModels?.label,
        id_trim: otherData?.myTrims?.value,
        trim: "a",
        trim_description: otherData?.myTrims?.label,
        id_oil: selectAceite,
        id_fuel: combustible,
        id_box: selectCaja,
      };

      let validation = validationFormForMyCar(prepareData)

     if (validation.error) {
      return showMessage({
        message: "Error al guardar vehículo",
        description: validation.message,
        type: "danger",
      });
     }

      const { data } = await post("/register_car", prepareData, token);
      if (data.status == 400) {
        return showMessage({
          message: "Error al guardar vehículo",
          description: data.data.message,
          type: "danger",
        });
      } else {
        const { data: newListCars } = await get("/list_cars", token);
        setListCars(newListCars.body.data.rows);
        setSelectAceite(null);
        setCombustible(null);
        setSelectCaja(null);
        navigation.navigate("CreateCardSuccess");
      }
    },
    [selectAceite, combustible, selectCaja]
  );

  const deleteCarFn = useCallback(
    async (id, token, setLoadingDelete, setShowModal) => {
      const { data } = await post("/delete_car", { id }, token);
      setShowModal(true);
      setLoadingDelete(false);

      if (data.status === 400) {
        showMessage({
          message: "Error al eliminar un vehículo",
          description: data.message,
          type: "danger",
        });
      }

      setShowModal(false);
      console.log(data);
      showMessage({
        message: "Vehículo eliminado",
        description: "Vehículo eliminado correctamente",
        type: "success",
      });
    },
    []
  );

  const updateCarFn = useCallback(
    async (id, token, setLoadingDelete, setShowModal) => {
      const { data } = await post("/delete_car", { id }, token);
      setShowModal(true);
      setLoadingDelete(false);

      if (data.status === 400) {
        showMessage({
          message: "Error al eliminar un vehículo",
          description: data.message,
          type: "danger",
        });
      }

      setShowModal(false);
      console.log(data);
      showMessage({
        message: "Vehículo eliminado",
        description: "Vehículo eliminado correctamente",
        type: "success",
      });
    },
    []
  );

  return (
    <MyCarsContext.Provider
      value={{
        oils,
        boxes,
        fuels,
        years,
        models,
        makes,
        trims,
        setCombustible,
        combustible,
        setSelectCaja,
        selectCaja,
        setSelectAceite,
        selectAceite,
        listCars,
        //Functions
        getFuelsFn,
        getOilsFn,
        getBoxesFn,
        getYearsFn,
        getModelsFn,
        getMakesFn,
        getTrimsFn,
        addVehicleFn,
        getListCarsFn,
        deleteCarFn,
      }}
    >
      {children}
    </MyCarsContext.Provider>
  );
};

export default MyCarsProvider;

export const useMyCarsContext = () => useContext(MyCarsContext);
