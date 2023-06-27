export const validationFormForMyCar = (form) => { 
    console.log(form);
    let validation = {
        error: false,
        message: 'Vehículo agregado'
    };
    if (!form.year) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el año del vehículo'
        }
    }

    if (!form.odometro) {
        return validation = {
            error: true,
            message: 'No ha colocado el klm del vehículo'
        }
    }

    if (!form.oil_date) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el último cambio de aceite del vehículo'
        }
    }

    if (!form.tire_date) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el último cambio de llanta del vehículo'
        }
    }


    if (!form.battery_date) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el último cambio de batería del vehículo'
        }
    }

    if (!form.id_make || !form.make) {
        return validation = {
            error: true,
            message: 'No ha seleccionado la marca del vehículo'
        }
    }

    if (!form.id_model || !form.model) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el modelo del vehículo'
        }
    }

    if (!form.id_oil) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el tipo de aceite del vehículo'
        }
    }

    if (!form.id_fuel) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el tipo de combustible del vehículo'
        }
    }

    if (!form.id_box) {
        return validation = {
            error: true,
            message: 'No ha seleccionado el tipo de caja del vehículo'
        }
    }

    return validation;
   
 }