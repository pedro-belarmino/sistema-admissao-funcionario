import Background from "../components/shared/Background";
import LoginForm from "../components/pages/Login/LoginForm";
import '../index.css'

const Home: React.FC = () => {
    return (
        <div className="loginContainer">
            <Background>
                <LoginForm />

                <p className='text-xs'>v0.4.2-EM</p>
            </Background>
        </div>
    )
}
export default Home;
