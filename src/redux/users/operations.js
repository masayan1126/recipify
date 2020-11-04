import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    signOutAction,
    signInAction,
    fetchUserProfileImageAction,
} from "./actions";
import {push, goBack} from 'connected-react-router'

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

                    db.collection('users').doc(uid).set(userInitialData).then(async () => {
                        // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        // await sendThankYouMail({
                        //     email: email,
                        //     userId: uid,
                        //     username: username,
                        // });
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
            if (userImage) {
                dispatch(fetchUserProfileImageAction(userImage[0].path))

            }
        })
    }
}