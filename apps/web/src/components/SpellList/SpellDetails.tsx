import { cn } from "@/utils/classNames";
import { useParams, useRouter } from "@tanstack/react-router";
import { GiBlood, GiBrain, GiBrainTentacle, GiBurningSkull, GiCarrion, GiDrop, GiEarthSpit, GiFlatPawPrint, GiGoat, GiHeartDrop, GiHeartPlus, GiSmallFire, GiSwordWound, GiTreeBranch, GiWaterfall, GiWhirlwind } from "rocketicons/gi";

import { default as spells } from '../../data/spells.json';

const options = [
  {label: 'Mouflette', value:'mouflette', icon:<GiGoat className='icon-stone-900 dark:icon-stone-100 icon-4xl '/>},
  {label: 'Eau', value:'water', icon:<GiWaterfall className='icon-stone-900 dark:icon-stone-100 icon-2xl'/>},
  {label: 'Feu', value:'fire',icon:<GiSmallFire className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Terre', value:'earth',icon:<GiEarthSpit className='icon-stone-900 dark:icon-stone-100 icon-5xl'/>},
  {label: 'Air', value:'air',icon:<GiWhirlwind className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Sang', value:'blood',icon:<GiBlood className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Bête', value:'beast',icon:<GiFlatPawPrint className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Nature', value:'nature',icon:<GiTreeBranch className='icon-stone-900 dark:icon-stone-100 icon-3xl'/>},
  {label: 'Vie', value:'life',icon:<GiHeartDrop className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Mort', value:'death',icon:<GiBurningSkull className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Fléau', value:'scourge',icon:<GiCarrion className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
  {label: 'Esprit', value:'spirit',icon:<GiBrainTentacle className='icon-stone-900 dark:icon-stone-100 icon-4xl'/>},
]

const SpellDetails = () => {
	const { history } = useRouter();
	const {id} = useParams({strict: false});
	const spell = spells.find(s => s.number.toString() === id);
  
	const icon = options.find(o => {
    if(o.label.toLowerCase() === spell?.type.toLowerCase() || o.value === spell?.type.toLowerCase()) {
      return o.icon
    }
  });
	console.log(spell?.type, icon);
	
  return (
    <div className="flex flex-col justify-center">
			<button
			className="text-stone-500 mt-1 font-grenze text-2xl align-middle"
			onClick={() => history.go(-1)}>
				<span className="text-2xl">&#8249;</span> Back
			</button>
      
			<div className='items-center text-center flex flex-col snap-center transition-all duration-1000 ease-out opacity-100 translate-y-8' 
        
        > <div className="overflow-clip rounded-full border-0 size-10 align-middle items-center">

					<span className="relative mb-2 inline-block">
            {icon?.icon}
            </span>
        </div>
            <span className='text-stone-500 text-md'>
              ~ {spell?.number} ~
            </span>
          <p className={cn('font-extrabold text-purple-900 dark:text-purple-400 font-noto text-2xl tracking-wider')}>
            {spell?.titleCommon}
          </p>
					<p className={cn('font-bold text-purple-900 dark:text-purple-400 font-noto text-md tracking-wider opacity-80')}>
            {spell?.titleGlaise}
          </p>
          <div className='flex flex-row font-noto items-baseline align-baseline justify-center w-full dark:text-stone-200 my-4'>
            <span className='text-md font-semibold align-baseline mr-1'>
							{spell?.type}</span>
            <span className='text-md font-semibold mx-2 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'>
              <GiDrop className='icon-stone-900 dark:icon-stone-100 icon-md'/>{spell?.level}</span>
            <span className='text-md font-semibold mx-2 align-baseline'>|</span>
            <span className='text-md font-semibold font-noto align-baseline'><GiBrain className='icon-stone-900 dark:icon-stone-100 icon-md mr-1'/>{spell?.difficulty}</span>
          </div>
          <div className={cn('text-stone-700 dark:text-stone-400 mt-1 italic max-w-72 text-sm md:max-w-xl md:line-clamp-none font-noto')}>{spell?.description}</div>
					<div className="font-noto align-baseline text-sm text-wider font-medium flex flex-col gap-1 my-4">
						<p>Effects : {spell?.effects}</p>
						<p>Duration : {spell?.duration}</p>
						<p>Range : {spell?.range}</p>
					</div>
					<div>
					<span className='text-sm font-semibold align-baseline'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-md mr-2'/>
						{spell?.damages || '~'}</span>
            <span className='text-sm font-semibold mx-4 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'>
              <GiHeartPlus className='icon-stone-900 dark:icon-stone-100 icon-md mr-2'/>{spell?.heal || '~'}</span>
					</div>
        </div>
    </div>
  )
}

export default SpellDetails