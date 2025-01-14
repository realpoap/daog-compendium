type Props = {
	number: number;
};
const TitleCount = ({ number }: Props) => {
	return (
		<span className='font-cabin absolute top-10 ml-2 text-sm font-medium'>
			{number}
		</span>
	);
};

export default TitleCount;
