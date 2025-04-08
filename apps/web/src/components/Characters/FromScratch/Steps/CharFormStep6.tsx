import { SpecieDataForm } from '@/data/speciesProfile';

type Props = {
	selected: SpecieDataForm | undefined;
};
const CharFormStep6 = ({ selected }: Props) => {
	return <div>{selected?.specie}</div>;
};

export default CharFormStep6;
