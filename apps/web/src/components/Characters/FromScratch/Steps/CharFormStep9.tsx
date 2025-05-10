import { Field, Select } from '@/components/RHFComponents';
import { useCharacterForm } from '@/store/characterContext';
import { cn } from '@/utils/classNames';
import { StatProfil } from '@api/lib/ZodCreature';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
type TreeStat = {
	name: string;
	value: number;
};

const CharFormStep9 = () => {
	const { methods, formData } = useCharacterForm();
	const tree = useWatch({ name: 'path.tree' });
	const profile = useWatch({ name: 'profile.statsStarting' });

	const [selectedTree, setSelectedTree] = useState<TreeStat[]>();
	const [selectedStat, setSelectedStat] = useState<string | null>();
	const [originalProfile, setOriginalProfile] = useState<StatProfil | null>(
		formData.profile?.statsStarting ?? null,
	);

	useEffect(() => {
		if (formData.profile?.statsStarting) {
			setOriginalProfile(formData.profile?.statsStarting);
		}
	}, []);

	useEffect(() => {
		if (!tree || !profile) return;

		const statKeysMap: Record<string, (keyof StatProfil)[]> = {
			Adroitness: ['CEL', 'AGI', 'DEX'],
			Constitution: ['STR', 'END', 'VIT'],
			Perception: ['WIL', 'INS', 'SEN'],
			Shroudness: ['CHA', 'SOC', 'ERU'],
		};

		const statKeys = statKeysMap[tree];
		if (statKeys) {
			const treeStats: TreeStat[] = statKeys.map(stat => ({
				name: stat,
				value: profile[stat],
			}));
			const hasChanged =
				JSON.stringify(treeStats) !== JSON.stringify(selectedTree);
			if (hasChanged) {
				setSelectedTree(treeStats);
			}
		}
	}, [tree, profile, selectedTree]);

	useEffect(() => {
		if (!selectedTree?.find(stats => stats.name === selectedStat)) {
			setSelectedStat(null);
		}
	}, [tree]);

	const handleStatSelect = (stat: keyof StatProfil) => {
		setSelectedStat(stat);
		if (!originalProfile) return;
		const updateProfile = {
			...originalProfile,
			[stat]: (originalProfile[stat] ?? 0) + 1,
		};
		methods.setValue('profile.statsStarting', updateProfile);
	};

	return (
		<div>
			<fieldset className='flex flex-col items-center gap-2'>
				<Field
					name='path.tree'
					label='Talent tree'
				>
					<Select
						name='path.tree'
						options={['Adroitness', 'Constitution', 'Perception', 'Shroudness']}
						defaultValue=''
					/>
				</Field>
				<div className='flex flex-row gap-4'>
					{selectedTree &&
						selectedTree.map(stat => (
							<div
								key={stat.name}
								className='flex flex-col items-center justify-start gap-1'
							>
								{originalProfile && (
									<span className='text-content bg-neutral border-1 rounded-sm px-2 text-sm'>
										{originalProfile[stat.name as keyof StatProfil]}
										{selectedStat && selectedStat === stat.name && (
											<span className='text-accent text-sm'> +1</span>
										)}
									</span>
								)}
								<span
									className={cn('btn btn-xs', {
										'bg-primary text-background': selectedStat === stat.name,
									})}
									onClick={() =>
										handleStatSelect(stat.name as keyof StatProfil)
									}
								>
									{stat.name}
								</span>
							</div>
						))}
				</div>
			</fieldset>
		</div>
	);
};

export default CharFormStep9;
