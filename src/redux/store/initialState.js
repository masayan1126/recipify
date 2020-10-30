const initialState = {
    loading: {
        state: false,
        text: ""
    },
    ingredients: {
        list: []
    },
    calendar: {
        list: []
    },
    recipes: {
        list: []
    },
    favoriteRecipes: {
        list: []
    },
    users: {
        cart: [],
        customer_id: "",
        email: "",
        isSignedIn: false,
        role :"",
        orders: [],
        payment_method_id: "",
        role: "",
        uid: "",
        username: ""
    }
};

export default initialState