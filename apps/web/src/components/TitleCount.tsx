type Props = {
	number: number;
};
const TitleCount = ({ number }: Props) => {
	return (
		<span className='font-cabin absolute top-9 ml-2 text-base font-medium'>
			{number}
		</span>
	);
};

export default TitleCount;
