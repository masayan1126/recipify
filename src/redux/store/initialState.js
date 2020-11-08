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
        list: [],
        selectedIngredients: [],
        searchRecipeList: []
    },
    results: {
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
        username: "",
        userProfileImage: "",
    }
};

export default initialState