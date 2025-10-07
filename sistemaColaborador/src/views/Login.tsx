
import LoginForm from "../components/pages/Login/LoginForm";
import '../index.css'

const Home: React.FC = () => {
    return (
        <div className="loginContainer">
            <LoginForm />
            <p className='text-xs'>v0.3.1-EM</p>
        </div>
    )
}


export default Home;