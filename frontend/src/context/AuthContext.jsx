// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // { uid, email }
  const [token, setToken] = useState(null); // Firebase ID token
  const [loading, setLoading] = useState(true);

  // Load from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("hrms_user");
    const storedToken = localStorage.getItem("hrms_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Keep in sync with Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const minimalUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          // role will come later from backend
          role: null,
        };

        setUser(minimalUser);
        setToken(idToken);
        localStorage.setItem("hrms_user", JSON.stringify(minimalUser));
        localStorage.setItem("hrms_token", idToken);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("hrms_user");
        localStorage.removeItem("hrms_token");
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await cred.user.getIdToken();

    const minimalUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      role: null,
    };

    setUser(minimalUser);
    setToken(idToken);
    localStorage.setItem("hrms_user", JSON.stringify(minimalUser));
    localStorage.setItem("hrms_token", idToken);

    return minimalUser;
  };

  // For now we allow self-register (for dev).
  const register = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await cred.user.getIdToken();

    const minimalUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      role: null,
    };

    setUser(minimalUser);
    setToken(idToken);
    localStorage.setItem("hrms_user", JSON.stringify(minimalUser));
    localStorage.setItem("hrms_token", idToken);

    return minimalUser;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    localStorage.removeItem("hrms_user");
    localStorage.removeItem("hrms_token");
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
