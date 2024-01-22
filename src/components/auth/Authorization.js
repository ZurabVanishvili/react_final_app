import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import axios from "axios";

const Authorization = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/linkpage";
    const {setAuth } = useAuth();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [, setError] = useState("");

    const API = axios.create({
        baseURL: "http://localhost:5000",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/Login-marketer", {
                name,
                password,
            }).then((res) => {
                if (res?.data.name) {
                    const role = res?.data.role;
                    setAuth({ role: `${role}`, name: `${name}` });
                    setName("");
                    setPassword("");
                    navigate(from, { replace: true });
                } else {
                    console.log("incorrect submission");
                    setError(res.message);
                }
            });
        } catch (err) {
            if (!err?.response) {
                setError("no server response");
            } else {
                setError("registeration failed");
            }
        }
    };

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>{/*code for signin form*/}</form>
        </div>
    );
};

export default Authorization;