import { cn } from "@/utils/classNames";
import { useParams, useRouter } from "@tanstack/react-router";
import { FcPrevious } from "rocketicons/fc";
import { GiBrain, GiDrop, GiFlame, GiGoat, GiHealingShield, GiSwordWound } from "rocketicons/gi";

import { default as spells } from '../../data/spells.json';

const options = [
  {label: 'Mouflette', value:'mouflette', icon:<GiGoat className='icon-stone-900 dark:icon-stone-100'/>},
  {label: 'Eau', value:'water', icon:<GiGoat/>},
  {label: 'Feu', value:'fire',icon:<GiFlame className='icon-stone-900 dark:icon-stone-100 icon-sm'/>},
  {label: 'Terre', value:'earth',icon:<GiGoat/>},
  {label: 'Air', value:'air',icon:<GiGoat/>},
  {label: 'Sang', value:'blood',icon:<GiGoat/>},
  {label: 'Bête', value:'beast',icon:<GiGoat/>},
  {label: 'Nature', value:'nature',icon:<GiGoat/>},
  {label: 'Vie', value:'life',icon:<GiGoat/>},
  {label: 'Mort', value:'death',icon:<GiGoat/>},
  {label: 'Fléau', value:'scourge',icon:<GiGoat/>},
  {label: 'Esprit', value:'spirit',icon:<GiGoat/>},
]

const SpellDetails = () => {
	const { history } = useRouter();
	const {id} = useParams({strict: false});
	const spell = spells.find(s => s.number.toString() === id)
	const icon = options.find(o => o.label === spell?.type.toLowerCase() || o.value === spell?.type.toLowerCase())
	console.log(icon?.icon);
	
  return (
    <div className="flex flex-col justify-center">
			<button
			className="text-lg mt-8 text-stone-100"
			onClick={() => history.go(-1)}>
				<FcPrevious 
				className={cn("icon-stone-900 dark:icon-stone-100  icon-lg")}/>Back
			</button>
      
			<div className='items-center text-center flex flex-col snap-center transition-all duration-1000 ease-out opacity-100 translate-y-8' 
        
        >
					<span className="[&>*]:icon-4xl mb-2">{icon?.icon}</span>
            <span className='text-stone-500 text-md mr-2'>
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
					<div className="font-noto align-baseline text-wider font-medium flex flex-col gap-1 my-4">
						<p>Effects : {spell?.effects}</p>
						<p>Duration : {spell?.duration}</p>
						<p>Range : {spell?.range}</p>
					</div>
					<div>
					<span className='text-sm font-semibold align-baseline'>
						<GiSwordWound className='icon-stone-900 dark:icon-stone-100 icon-sm'/>
						{spell?.damages || '~'}</span>
            <span className='text-sm font-semibold mx-4 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'>
              <GiHealingShield className='icon-stone-900 dark:icon-stone-100 icon-sm'/>{spell?.heal || '~'}</span>
					</div>
        </div>
    </div>
  )
}

export default SpellDetails