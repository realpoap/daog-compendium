import { SkillData, skillsData } from '@/data/skillsData';
import { CharacterSkill } from '@api/lib/ZodCharacter';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
	FiCheck,
	FiMinusCircle,
	FiPlusCircle,
	FiUserMinus,
	FiUserPlus,
} from 'rocketicons/fi';

// type Props = {
// 	selected: SpecieDataForm | undefined;
// };

type GroupedSkills = {
	[letter: string]: SkillData[];
};
const CharFormStep6 = () => {
	const { setValue } = useFormContext();
	const [activeLetterIndex, setActiveLetterIndex] = useState<number>(0);
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [selectedSkills, setSelectedSkills] = useState<CharacterSkill[]>([]);
	const [playerSkillPoints, setPlayerSkillPoints] = useState(5);

	// Sort skills alphabetically by name
	const sortedSkills = [...skillsData].sort((a, b) =>
		a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
	);

	// Group skills by first letter of name
	const groupedSkills = sortedSkills.reduce<GroupedSkills>((acc, skill) => {
		const firstLetter = skill.name.charAt(0).toUpperCase();
		if (!acc[firstLetter]) {
			acc[firstLetter] = [];
		}
		acc[firstLetter].push(skill);
		return acc;
	}, {});

	// Get sorted letters (only include letters with skills)
	const letters = Object.keys(groupedSkills).sort();

	// Scroll to section when clicking on letter
	const scrollToSection = (letterIndex: number) => {
		const letter = letters[letterIndex];
		if (sectionRefs.current[letter]) {
			sectionRefs.current[letter]?.scrollIntoView({ behavior: 'smooth' });
			setActiveLetterIndex(letterIndex);
		}
	};

	useEffect(() => {
		setValue('path.skills', selectedSkills);
	}, [selectedSkills]);

	// Set up intersection observer to track active section
	useEffect(() => {
		// Clean up previous observer if it exists
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		// Create new observer
		observerRef.current = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const letter = entry.target.getAttribute('data-letter');
						if (letter) {
							// Update active letter
							const letterIndex = letters.indexOf(letter);
							if (letterIndex >= 0) {
								setActiveLetterIndex(letterIndex);
							}
						}
					}
				});
			},
			{
				threshold: 0.5,
				root: scrollContainerRef.current,
			},
		);

		// Wait for next frame to observe elements
		setTimeout(() => {
			letters.forEach(letter => {
				if (sectionRefs.current[letter]) {
					observerRef.current?.observe(sectionRefs.current[letter]!);
				}
			});
		}, 0);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [letters.join(',')]);

	// Handle ref setting
	const setSectionRef = (letter: string, element: HTMLDivElement | null) => {
		if (element) {
			sectionRefs.current[letter] = element;
			if (observerRef.current) {
				observerRef.current.observe(element);
			}
		}
	};

	// Handle skill selection
	const handleSkillSelect = (skill: SkillData) => {
		if (playerSkillPoints === 0) {
			toast.error('No more skill points available');
			return;
		}
		const existingSkill = selectedSkills?.find(s => s.id === skill.id);
		if (existingSkill) {
			handleSkillRemove(existingSkill);
			toast.success('Skill removed, skill points updated');
			return;
		}
		const object = { ...skill, playerPoints: 0, playerLevel: 1 };
		setPlayerSkillPoints(prev => prev - 1);
		setSelectedSkills(prev => [...prev, object]);
	};

	const handleSkillRemove = (skill: CharacterSkill) => {
		let points = skill.playerPoints || 0;
		switch (skill.playerLevel) {
			case 1:
				points += 1;
				break;
			case 2:
				points += 3;
				break;
			case 3:
				points += 6;
				break;
			case 4:
				points += 10;
				break;
			case 5:
				points += 15;
				break;
			default:
				break;
		}
		setPlayerSkillPoints(prev => prev + points);
		const prunedSkillList = selectedSkills.filter(s => s.id !== skill.id);
		setSelectedSkills(prunedSkillList);
	};

	// Handle Points change
	const handlePointsChange = (skill: CharacterSkill, number: number) => {
		const newRemainingPoints = playerSkillPoints - number;
		if (newRemainingPoints < 0) {
			toast.error('No more skill points available');
			return;
		} // prevent going below zero

		setPlayerSkillPoints(newRemainingPoints);

		const currentLevel = skill.playerLevel ?? 1;
		const currentPoints = skill.playerPoints ?? 0;

		let updatedLevel = currentLevel;
		let updatedPoints = currentPoints + number;

		if (updatedPoints >= currentLevel + 1) {
			updatedLevel += 1;
			updatedPoints = 0;
		} else if (updatedPoints < 0) {
			if (updatedLevel > 1) {
				updatedLevel -= 1;
				updatedPoints = updatedLevel; // optional: reset to max points of previous level
			} else {
				updatedPoints = 0; // can't go below level 1
			}
		}

		const updatedSkill: CharacterSkill = {
			...skill,
			playerLevel: updatedLevel,
			playerPoints: updatedPoints,
		};

		const updatedSkills = selectedSkills.map(s =>
			s.id === skill.id ? updatedSkill : s,
		);
		setSelectedSkills(updatedSkills);
	};

	return (
		<div className='bg-card w-full'>
			<span>{playerSkillPoints} skill points available</span>
			{/* Horizontal letter navigation */}
			<div className='bg-base-200 border-base-300 sticky top-0 z-20 flex justify-center gap-1 border-b p-2'>
				{letters.map((letter, index) => (
					<span
						key={letter}
						className={`text-neutral-content flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${
							index === activeLetterIndex
								? 'bg-primary text-primary-content font-bold'
								: 'bg-tile hover:bg-neutral'
						}`}
						onClick={() => scrollToSection(index)}
					>
						{letter}
					</span>
				))}
			</div>

			{/* Main content area */}
			<div className='w-full p-0'>
				<div
					ref={scrollContainerRef}
					className='h-42 flex flex-col overflow-y-auto'
					data-testid='skills-list-container'
				>
					{letters.length === 0 ? (
						<div className='text-content p-4'>No skills available</div>
					) : (
						letters.map((letter, index) => (
							<div
								key={letter}
								ref={el => setSectionRef(letter, el)}
								data-letter={letter}
								className={`border-neutral transition-all duration-200 ${
									index === activeLetterIndex ? 'bg-card' : ''
								}`}
								data-testid={`letter-section-${letter}`}
							>
								<div
									className={`font-grenze z-10 p-2 text-2xl font-bold transition-colors duration-300 ${
										index === activeLetterIndex
											? 'text-content'
											: 'text-neutral'
									}`}
								>
									{letter}
								</div>
								<div className='border-neutral border-t'>
									{groupedSkills[letter]?.map(skill => (
										<div
											className='group collapse'
											key={skill.id}
											tabIndex={0}
										>
											{/* <input
												type='radio'
												name='skill-radio'
												className='h-0 p-0'
											/> */}
											<div className='collapse-title text-neutral-content group-hover:text-content pointer-events-none flex min-h-0 items-center justify-start gap-2 py-0 font-medium'>
												<div className=''>{skill.name}</div>
												{selectedSkills.find(s => s.id === skill.id) && (
													<>
														<span>
															<FiCheck className='icon-accent icon-sm' />
														</span>
														<div className='rating'>
															{[1, 2, 3, 4, 5].map(value => (
																<input
																	key={`${skill.id}-rating-${value}`}
																	type='radio'
																	name={`rating-${skill.id}`} // Use unique name for per-skill rating group
																	value={value}
																	readOnly
																	className='mask mask-star bg-primary size-4'
																	aria-label={`${value} star`}
																	checked={
																		selectedSkills.find(s => s.id === skill.id)
																			?.playerLevel === value
																	}
																/>
															))}
														</div>
													</>
												)}
											</div>
											<div className='collapse-content flex flex-row gap-2'>
												<span
													className='cursor-pointer'
													onClick={e => {
														e.stopPropagation();
														handleSkillSelect(skill);
													}}
												>
													{!selectedSkills.find(s => s.id === skill.id) && (
														<FiUserPlus className='icon-neutral-content hover:icon-accent icon-sm' />
													)}
													{selectedSkills.find(s => s.id === skill.id) && (
														<FiUserMinus className='icon-neutral-content hover:icon-error icon-sm' />
													)}
												</span>

												<p className='text-base-content border-primary border-l-2 pl-2 text-sm opacity-70'>
													{skill.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
				<div className='shadow-inset-xs bg-tile mt-2 rounded-lg p-4'>
					<h3 className='font-grenze text-xl'>Skills :</h3>
					{selectedSkills
						.sort((a, b) =>
							a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
						)
						.map(skill => (
							<div key={`selected-${skill.id}`}>
								<div className='flex flex-row items-center gap-2'>
									<span>{skill.name}</span>

									<div className='rating'>
										{[1, 2, 3, 4, 5].map(value => (
											<input
												key={`${skill.id}-rating-selected-${value}`}
												type='radio'
												name={`rating-selected-${skill.id}`} // Use unique name for per-skill rating group
												value={value}
												readOnly
												className='mask mask-star bg-primary size-4'
												aria-label={`${value} star`}
												checked={
													skill.playerLevel
														? skill.playerLevel === value
														: false
												}
											/>
										))}
									</div>

									<span
										className='cursor-pointer'
										onClick={() => handlePointsChange(skill, -1)}
									>
										<FiMinusCircle className='icon-sm icon-neutral-content' />
									</span>
									<span className='font-cabin text-neutral-content text-sm'>
										{skill.playerPoints} /{' '}
										{skill.playerLevel && skill?.playerLevel + 1}
									</span>
									<span
										className='cursor-pointer'
										onClick={() => handlePointsChange(skill, 1)}
									>
										<FiPlusCircle className='icon-sm icon-neutral-content' />
									</span>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CharFormStep6;
