import { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	deleteUser,
} from "firebase/auth";
import axios from "../lib/axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [signupKey, setSignupKey] = useState(0);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const updateUser = (userInfo) => {
		setLoading(true);
		axios
			.patch(`/users/${user._id}`, userInfo)
			.then((res) => {
				setUser({
					...user,
					photoURL: res.data?.user?.photoURL,
					phoneNumber: res.data?.user?.phoneNumber,
					displayName: res.data?.user?.displayName,
					role: res.data?.user?.role,
				});
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setLoading(false);
			});
		return updateProfile(auth.currentUser, userInfo);
	};

	const logOut = () => {
		setLoading(true);
		signOut(auth).finally(() => setLoading(false));
	};

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				axios.get(`/users/current/${currentUser.email}`).then((res) => {
					setUser({
						...currentUser,
						displayName: res.data?.user?.displayName,
						phoneNumber: res.data?.user?.phoneNumber,
						photoURL: res.data?.user?.photoURL,
						_id: res.data?.user?._id,
						role: res.data?.user?.role,
					});
					setLoading(false);
				});
			} else {
				setLoading(false);
				setUser();
			}
		});
		return () => {
			unsubscribe();
		};
	}, [signupKey]);

	const authInfo = {
		createUser,
		signIn,
		updateUser,
		logOut,
		setSignupKey,
		deleteUser,
		user,
		loading,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
