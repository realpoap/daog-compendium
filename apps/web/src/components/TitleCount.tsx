type Props = {
	number: number;
};
const TitleCount = ({ number }: Props) => {
	return (
		<span className='font-cabin absolute top-10 ml-2 text-xs font-medium tracking-normal'>
			{number}
		</span>
	);
};

export default TitleCount;
