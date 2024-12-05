import { cn } from '@/utils/classNames';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { GiBrain, GiDrop } from "rocketicons/gi";
import { useDebounce } from 'use-debounce';
import { default as spells } from '../../data/spells.json';

type SpellEntry = {
  number: number;
  titleCommon: string;
  titleGlaise: string;
  level: number;
  type: string;
  cost: string | number;
  difficulty: string | number;
  components: string;
  description: string;
  effects: string;
  damages: string | number;
  heal: string | number;
  duration: string | number;
  range: string | number;
}

const SpellSearch = () => {

  const [items, setItems] = useState<SpellEntry[]>(spells);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search,500);
  const [prunedItems, setPrunedItems] = useState<SpellEntry[]>([]);

  const keys = ['titleCommon', 'titleGlaise', 'type', 'description', 'component', 'effects'];

  useEffect(()=> {
    const filteredItems = items.filter((item) => 
      keys.some((key) => 
        item[key as keyof SpellEntry]?.toString().toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
    setPrunedItems(filteredItems);    
  }, [debouncedSearch, items])
  
  return (
    <div 
      className='mt-sm p-2 flex flex-col items-center'>
      <div 
        className='container flex flex-col items-center sticky top-8 bg-gradient-to-b from-stone-100 dark:from-stone-800 from-80% pb-8 z-10'>
      <h1 
        className='text-purple-900 dark:text-purple-400 font-grenze text-6xl text-center font-bold my-4 mx-auto sticky z-10 md:mt-8 tracking-wide'>Spells</h1>
      <input
        onChange={e=>setSearch(e.target.value)}
        placeholder='some strange wizardry...'
        className={cn('rounded-lg w-60 mb-4 pl-2 p-1 border b-stone-500 dark:bg-stone-700 text-lg text-purple-900 dark:text-purple-400 focus:outline-none focus:ring-purple-900 dark:focus:ring-purple-400 focus:border-purple-900 dark:focus:border-purple-400 focus:ring-1 caret-purple-900 dark:caret-purple-400 shadow-sm placeholder:italic text-center font-grenze')}
        type='search'
      />

      </div>
      <div className='container max-w-screen overflow-hidden flex flex-col justify-evenly gap-8 text-center items-center snap-mandatory snap-y z-0'>
      {prunedItems.map((d)=>(
        <Link 
        className='w-full'
          key={d.number} 
          to={`/spells/$id`}
          params={{id: `${d.number}`}}
        >
          
        <div className='items-center text-center flex flex-col snap-center transition-all duration-1000 ease-out opacity-100 translate-y-8 hover:bg-stone-700 rounded-md p-1 pb-2 w-full' 
        
        >
            <span className='text-stone-500 text-sm mr-2'>
              ~ {d.number} ~
            </span>
          <p className={cn('font-bold text-purple-900 dark:text-purple-400 font-noto tracking-wider')}>
            {d.titleCommon}
          </p>
          <div className='flex flex-row font-noto items-baseline align-baseline justify-center w-48 dark:text-stone-200'>
            <span className='text-sm font-semibold align-baseline mr-1'>{d.type}</span>
            <span className='text-sm font-semibold mx-2 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'>
              <GiDrop className='icon-stone-900 dark:icon-stone-100 icon-sm'/>{d.level}</span>
            <span className='text-sm font-semibold mx-2 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'><GiBrain className='icon-stone-900 dark:icon-stone-100 icon-sm mr-1'/>{d.difficulty}</span>
          </div>
          <div className={cn('line-clamp-2 text-stone-700 dark:text-stone-400 mt-1 italic max-w-72 text-sm md:max-w-xl md:text-ellipsis md:line-clamp-none font-noto')}>{d.description}</div>
        </div>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default SpellSearch;