import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { post } from "../common/functions/http";
import { useFormik } from "formik";
import * as Yup from "yup";

const MyCarsContext = createContext({});

const MyCarsProvider = ({ children }) => {

    const formikMyCars = useFormik({
        initialValues: {
          description: "",
          hour: "", 
        },
        validationSchema: Yup.object({}),
        onSubmit: (data) => {
          data.id = uuidv4();
          data.coordenates = selectedLocation
          addressWithMapsArray.push(data)
          setAddressWithMapsArray(addressWithMapsArray);
          formikMyCars.resetForm();
        },
      });

    return (
        <MyCarsContext.Provider
            value={{

            }}
        >
            {children}
        </MyCarsContext.Provider>
    );
};

export default MyCarsProvider;

export const useMyCarsContext = () => useContext(MyCarsContext);