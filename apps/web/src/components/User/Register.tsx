import TitleBack from '../TitleBack';
import RegisterForm from './RegisterForm';

const Register = () => {
	return (
		<div className='mt-sm flex flex-col items-center justify-center p-2 px-2'>
			<TitleBack title={'Sign In'} />
			<RegisterForm />
		</div>
	);
};

export default Register;
