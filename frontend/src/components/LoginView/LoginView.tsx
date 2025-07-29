import { SplitScreen } from "./SplitScreen/SplitScreen";
import { Banner } from "./Banner/Banner";
import { LoginForm } from "./LoginForm/LoginForm";

const LoginView = () => {

    return (
        <SplitScreen>
            <Banner />
            <LoginForm />
        </SplitScreen>
    );
}

export default LoginView;