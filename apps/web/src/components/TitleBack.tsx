import { BackButton } from './Buttons';
import TitleSticky from './TitleSticky';

const TitleBack = ({ title }: { title: string }) => {
	return (
		<>
			<BackButton onClick={() => history.go(-1)} />
			<TitleSticky title={title} />
		</>
	);
};

export default TitleBack;
