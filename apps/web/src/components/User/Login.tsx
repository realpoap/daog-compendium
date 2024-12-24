import TitleBack from '../TitleBack';
import LoginForm from './LoginForm';

const Login = () => {
	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={'Log In'} />
			<LoginForm />
		</div>
	);
};

export default Login;
