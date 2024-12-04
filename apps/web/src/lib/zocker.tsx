import { zocker } from 'zocker';
import { type Spell, SpellSchema } from "./types";

const times=10;
let spellData = [];
for(let i=0; i< times ;i++) {
	spellData.push(zocker(SpellSchema).generate())
}

export default spellData<Spell[]>;