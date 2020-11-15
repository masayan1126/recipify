import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    signOutAction,
    signInAction,
    fetchUserProfileImageAction,
} from "./actions";
import {push, goBack} from 'connected-react-router'
import { vegs, meats, fishes, cereals, potatoes_starches_beans_mushrooms } from "../../ingredients";

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged( user => {
            if(user) {
                const userId = user.uid;
                db.collection('users').doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    dispatch(signInAction({
                        // customer_id: (data.customer_id) ? data.customer_id : "",
                        // email: data.email,
                        isSignedIn: true,
                        // role: data.role,
                        // payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        uid: userId,
                        // username: data.username,
                    }))
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if(username === "" || email === "" || password === "" || confirmPassword === "") {
            alert('必須項目が未入力です。');
            return false
        }

        if(password !== confirmPassword) {
            alert('パスワードが一致しませんもう一度お試しください')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                // dispatch(showLoadingAction("Sign up..."))
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        // customer_id: "",
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        // payment_method_id: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: username,
                        userProfileImage: [],
                    };

                    const list = [
                        { category: "野菜類", value: vegs, id: 1, image: "https://firebasestorage.googleapis.com/v0/b/recipify-e1b95.appspot.com/o/images%2FvXwz9A1AG8uyCdJt?alt=media&token=065d0bce-c8bc-4555-b2d7-c0dc2716ff66" },
                        { category: "肉類", value: meats, id: 2 , image: "https://firebasestorage.googleapis.com/v0/b/recipify-e1b95.appspot.com/o/images%2Ft4DHqCqucb3NtySB?alt=media&token=ff9ccacf-1f35-4fd3-86a4-b75c986e7b48" },
                        { category:"魚類", value: fishes, id: 3 , image: "https://firebasestorage.googleapis.com/v0/b/recipify-e1b95.appspot.com/o/images%2Ft4DHqCqucb3NtySB?alt=media&token=ff9ccacf-1f35-4fd3-86a4-b75c986e7b48" },
                        { category:"穀類", value: cereals, id: 4, image: "https://firebasestorage.googleapis.com/v0/b/recipify-e1b95.appspot.com/o/images%2Ft4DHqCqucb3NtySB?alt=media&token=ff9ccacf-1f35-4fd3-86a4-b75c986e7b48" },
                        { category:"その他", value: potatoes_starches_beans_mushrooms, id: 5, image: "" },
                    ] 

                    db.collection('users').doc(uid).set(userInitialData).then(async () => {
                        for (let i = 0; i < list.length; i += 1) {
                            const data = {
                                ingredientsCategory: list[i].category,
                                ingredientsList: [
                                    { id: list[i].id, category: list[i].category, value: list[i].value },
                                ],
                                created_at: timestamp,
                                userId: uid,
                                images: [
                                    { path: list[i].image, id: list[i].id }
                                ],
                            }
                           const ingredientsRef = db.collection('users').doc(uid).collection('ingredients');
                           const ref = ingredientsRef.doc()
                           const id = ref.id
                           data.id = id;
                           ingredientsRef.doc(id).set(data, {merge: true});
                          
                       }
                    
                        dispatch(push('/'))

                        // dispatch(hideLoadingAction())
                    })

                }
            }).catch((error) => {
                // dispatch(hideLoadingAction())
                alert('アカウント登録に失敗しました。もう1度お試しください。')
                throw new Error(error)
            })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        // dispatch(showLoadingAction("Sign in..."));
        if (email === "" || password === "") {
            // dispatch(hideLoadingAction());
            alert('メールアドレスかパスワードが未入力です。')
            return false
        }
        
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const userId = user.uid;
                    db.collection('users').doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    dispatch(signInAction({
                        // customer_id: (data.customer_id) ? data.customer_id : "",
                        // email: data.email,
                        isSignedIn: true,
                        // role: data.role,
                        // payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        uid: userId,
                        // username: data.username,
                    }));
                    dispatch(push('/'))
                })
                }
                    // dispatch(hideLoadingAction());
            }).catch(() => {
                // dispatch(hideLoadingAction());
            });
    }
};

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === "") {
            alert('必須項目が未入力です。');
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスにパスワードリセット用のメールを送りました')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('パスワードリセットに失敗しました。時間を置いて再度試してください');
                })
        }
    }
}

export const fetchUserProfileImage = (uid) => {
    return async (dispatch) => {
        db.collection('users').doc(uid).get().then(snapshot => {
            const data = snapshot.data();
            const userImage = data.userProfileImage;
            console.log(userImage);
            if (userImage.length < 1) {
                return false
            }
            dispatch(fetchUserProfileImageAction(userImage[0].path))
        })
    }
}