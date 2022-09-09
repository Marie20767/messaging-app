import { v4 as uuid } from 'uuid';
import Dog from '../images/dog-avatar.png';
import Cat from '../images/cat-avatar.png';
import Bear from '../images/bear-avatar.png';
import Fish from '../images/fish-avatar.png';
import Fox from '../images/fox-avatar.png';
import Giraffe from '../images/giraffe-avatar.png';
import Panda from '../images/panda-avatar.png';
import Rabbit from '../images/rabbit-avatar.png';

const avatars = [
  {
    animal: Dog,
    id: uuid(),
  },
  {
    animal: Cat,
    id: uuid(),
  },
  {
    animal: Bear,
    id: uuid(),
  },
  {
    animal: Fish,
    id: uuid(),
  },
  {
    animal: Fox,
    id: uuid(),
  },
  {
    animal: Giraffe,
    id: uuid(),
  },
  {
    animal: Panda,
    id: uuid(),
  },
  {
    animal: Rabbit,
    id: uuid(),
  },
];

export { avatars };
