import { cn } from '@/utils/classNames';
import { useDebounce } from '@uidotdev/usehooks';
import { createRef, useEffect, useRef, useState } from 'react';
import { GiBrain, GiDrop } from "rocketicons/gi";
import { default as spells } from '../../../public/data/spells.json';

export function SpellList () {

  const [items, setItems] = useState(spells);
  const [search, setSearch] = useState('')

	const searchCriteria = useDebounce(search,500)

  const itemsRefs = useRef(items.map(() => createRef()));

  useEffect(()=> {
    const observer = new IntersectionObserver( entries => {
      entries.map(entry => {
        if (entry.isIntersecting) {
          // entry.target.classList.add('opacity-100');
          // entry.target.classList.remove('opacity-0');
        } else {
          // entry.target.classList.remove('opacity-100');
          // entry.target.classList.add('opacity-0');
        }
      })
    }, {threshold:0.5})

    itemsRefs.current.map((ref) => {
      if(ref.current) {
        observer.observe(ref.current);
      }
    })

    return () => {
      itemsRefs.current.map(ref => {
      if(ref.current) {
        observer.unobserve(ref.current);
      }
    })
    }
  }, [items])

  return (
    <div className='mt-sm p-2 flex flex-col items-center'>
      <div className='container flex flex-col items-center sticky top-8 bg-gradient-to-b from-stone-100 dark:from-stone-800 from-80% pb-8 z-10'>
      <h1 className='text-purple-900 dark:text-purple-400 font-grenze text-6xl text-center font-bold my-4 mx-auto sticky z-10 md:mt-8 tracking-wide'>Spells</h1>
      <input
      onChange={(e) => setSearch(e.target.value)}
      placeholder='some strange wizardry...'
      className={cn('rounded-lg w-60 mb-4 pl-2 p-1 border b-stone-500 dark:bg-stone-700 text-lg text-purple-900 dark:text-purple-400 focus:outline-none focus:ring-purple-900 dark:focus:ring-purple-400 focus:border-purple-900 dark:focus:border-purple-400 focus:ring-1 caret-purple-900 shadow-sm placeholder:italic text-center font-grenze')}
      type='search'/>
      </div>
      <div className='container max-w-screen overflow-hidden flex flex-col justify-evenly gap-8 text-center items-center snap-mandatory snap-y z-0'>
      {items.filter((e) => {
        return search.toLowerCase() === '' ? e : e.titleCommon.toLowerCase().includes(search)
      }).map((d, index)=>(
        <div className='items-center text-center flex flex-col snap-center transition-all duration-1000 ease-out opacity-100 translate-y-8' 
        key={d.number} 
        ref={itemsRefs.current[index]}>
            <span className='text-stone-500 text-sm mr-2'>
              ~ {d.number} ~
            </span>
          <p className={cn('font-bold text-purple-900 dark:text-purple-400 font-noto tracking-wider')}>
            {d.titleCommon}
          </p>
          <div className='flex flex-row font-noto items-baseline align-baseline justify-center w-48 dark:text-stone-200'>
            <span className='text-sm font-semibold align-baseline mr-1'>{d.type}</span>
            <span className='text-sm font-semibold mx-2 align-baseline'>|</span>
            <span className='text-sm font-semibold font-noto align-baseline'><GiDrop className='icon-stone-900 dark:icon-stone-100 icon-sm'/>{d.level} - <GiBrain className='icon-stone-900 dark:icon-stone-100 icon-sm mr-1'/>{d.difficulty}</span>
          </div>
          <div className={cn('line-clamp-2 text-stone-700 dark:text-stone-400 mt-1 italic max-w-72 text-sm md:max-w-xl md:text-ellipsis md:line-clamp-none font-noto')}>{d.description}</div>
        </div>
      ))}
      </div>
    </div>
  )
}