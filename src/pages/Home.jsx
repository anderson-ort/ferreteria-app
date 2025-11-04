import {  useNavigate } from "react-router";
import { useEffect } from "react";
import Navigator from "../components/Navigator";
import { useSessionStore } from "../store/sessionStore";

const Home = () => {
	const { user } = useSessionStore();
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate("/dashboard", { replace: true });
		}
	}, [user, navigate]);

	return (
		<div>
			<h1>
				Ferreteria: <strong>andru-hardstore</strong>{" "}
			</h1>
			<p>Tu ferretería de confianza, con todo para tu proyecto.</p>
			<Navigator/>
		</div>
	);
};

export default Home;
