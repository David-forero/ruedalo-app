const onboarding = [
    {
        id: "1",
        title: "Busca tus repuestos más rápido",
        description:
            "Podrás conseguir repuestos más facil sin necesidad de salir de casa",
        image: require("../../assets/images/onboarding/01.png"),
    },
    {
        id: "2",
        title: "Servicios para tu vehículo",
        description:
            "Con nuestra app podrás conseguir servicios cercanos para tu vehículo",
        image: require("../../assets/images/onboarding/02.png"),
    },
    {
        id: "3",
        title: "Reparaciones rápidas y eficientes en tu hogar",
        description:
            "Nuestro equipo de profesionales realizará las reparaciones necesarias en la comodidad de tu hogar",
        image: require("../../assets/images/onboarding/03.png"),
    },
];

const tabs = [
    {
        id: "1",
        screen: "Home",
        icon: require("../../assets/icons/store.png"),
        title: 'Tiendas'
    },
    {
        id: "2",
        screen: "AutoServices",
        icon: require("../../assets/icons/car-services.png"),
        title: 'Servicios'
    },
    {
        id: "3",
        screen: "MyCars",
        icon: require("../../assets/icons/car-status.png"),
        title: 'Vehículos'
    },
    {
        id: "4",
        screen: "Profile",
        icon: require("../../assets/icons/user.png"),
        title: 'Perfil'
    },
];

const category = [
    {
        id: "1",
        name: "Cauchos",
        image: require("../../assets/icons/categories/llanta.png"),
    },
    {
        id: "2",
        name: "Motor",
        image: require("../../assets/icons/categories/motor.png"),
    },
    {
        id: "3",
        name: "Frenos",
        image: require("../../assets/icons/categories/disco-frenos.png"),
    },
    {
        id: "4",
        name: "Aceites",
        image: require("../../assets/icons/categories/aceite-de-motor.png"),
    },
    {
        id: "5",
        name: "Carroceria",
        image: require("../../assets/icons/categories/cerradura-de-la-puerta.png"),
    },
    {
        id: "6",
        name: "Kits",
        image: require("../../assets/icons/categories/caja-de-herramientas.png"),
    },
];

const history = [
    {
        id: "1",
        name: "Filada Family bar",
        image: require("../../assets/images/restaurant.png"),
        date: "24 Jun, 12:30",
        quantity: "3",
        price: "15.30",
        cancel: true,
        upcoming: true,
        completed: true,
    },
    {
        id: "2",
        name: "National rest",
        image: require("../../assets/images/restaurant.png"),
        date: "24 Jun, 12:30",
        quantity: "3",
        price: "29.30",
        cancel: true,
        upcoming: true,
        completed: false,
    },
    {
        id: "3",
        name: "Rolls & rolls",
        image: require("../../assets/images/restaurant.png"),
        date: "24 Jun, 12:30",
        quantity: "3",
        price: "45.30",
        cancel: true,
        upcoming: false,
        completed: false,
    },
    {
        id: "4",
        name: "Chiken taste",
        image: require("../../assets/images/restaurant.png"),
        date: "24 Jun, 12:30",
        quantity: "3",
        price: "18.30",
        cancel: true,
        upcoming: false,
        completed: true,
    },
    {
        id: "5",
        name: "Croissant cafe",
        image: require("../../assets/images/restaurant.png"),
        date: "24 Jun, 12:30",
        quantity: "3",
        price: "22.30",
        cancel: true,
        upcoming: false,
        completed: false,
    },
];

const favorite = [
    {
        id: "1",
        name: "Toyota Tundra 2015",
        description:
            "Add the remaining ingredients and toss to coat. Serve. Notes. Note: Kani Salad is best served fresh. Due to the water content from cucumbers",
        image: require("../../assets/icons/mycar.png"),
        rating: 4.9,
        caja: 'Automatico',
        typeAceite: "Mineral",
        combustible: "Gasolina",
    },
    {
        id: "2",
        name: "Spark 2008",
        description:
            "Add the remaining typeAceite and toss to coat. Serve. Notes. Note: Kani Salad is best served fresh. Due to the water content from cucumbers",
        image: require("../../assets/icons/mycar.png"),
        rating: 4.9,
        caja: 'Sincrónico',
        typeAceite: "Sintetico",
        combustible: "Gas",
    },
];

const promocodes = [
    {
        id: "1",
        image: require("../../assets/images/promocodes/promocode-01.png"),
        name: "Mcdonalds",
        discount: "50% off",
        validDate: "Valid until June 30, 2021",
    },
    {
        id: "2",
        image: require("../../assets/images/promocodes/promocode-02.png"),
        name: "Burger King",
        discount: "30% off",
        validDate: "Valid until June 30, 2021",
    },
    {
        id: "3",
        image: require("../../assets/images/promocodes/promocode-03.png"),
        name: "Domino’s Pizza",
        discount: "50% off",
        validDate: "Valid until June 30, 2021",
    },
    {
        id: "4",
        image: require("../../assets/images/promocodes/promocode-04.png"),
        name: "KFC",
        discount: "25% off",
        validDate: "Valid until June 30, 2019",
    },
];

export { onboarding, tabs, category, history, favorite, promocodes };
