import Dog from '../images/dog-avatar.png';
import Cat from '../images/cat-avatar.png';
import Bear from '../images/bear-avatar.png';
import Fish from '../images/fish-avatar.png';
import Fox from '../images/fox-avatar.png';
import Giraffe from '../images/giraffe-avatar.png';
import Panda from '../images/panda-avatar.png';
import Rabbit from '../images/rabbit-avatar.png';
import Weasel from '../images/weasel-avatar.png';
import Seal from '../images/seal-avatar.png';
import Deer2 from '../images/deer2-avatar.png';
import Rabbit2 from '../images/rabbit2-avatar.png';
import Meerkat from '../images/meerkat-avatar.png';
import Koala from '../images/koala-avatar.png';
import Fox2 from '../images/fox2-avatar.png';
import Deer from '../images/deer-avatar.png';
import Chicken from '../images/chicken-avatar.png';
import Snake from '../images/snake-avatar.png';

const avatars = [
  {
    animal: Dog,
    id: 'dog-id',
  },
  {
    animal: Cat,
    id: 'cat-id',
  },
  {
    animal: Bear,
    id: 'bear-id',
  },
  {
    animal: Fish,
    id: 'fish-id',
  },
  {
    animal: Fox,
    id: 'fox-id',
  },
  {
    animal: Giraffe,
    id: 'giraffe-id',
  },
  {
    animal: Panda,
    id: 'panda-id',
  },
  {
    animal: Rabbit,
    id: 'rabbit-id',
  },
];

const demoUsersAvatars = [
  {
    animal: Weasel,
    id: 'weasel-id',
  },
  {
    animal: Seal,
    id: 'seal-id',
  },
  {
    animal: Deer2,
    id: 'deer2-id',
  },
  {
    animal: Koala,
    id: 'koala-id',
  },
  {
    animal: Rabbit2,
    id: 'rabbit2-id',
  },
  {
    animal: Meerkat,
    id: 'meerkat-id',
  },
  {
    animal: Fox2,
    id: 'fox2-id',
  },
  {
    animal: Deer,
    id: 'deer-id',
  },
  {
    animal: Snake,
    id: 'snake-id',
  },
  {
    animal: Chicken,
    id: 'chicken-id',
  },
];

const allAvatars = [
  ...avatars,
  ...demoUsersAvatars,
];

const APIDomain = 'https://www.word-monkey-api.xyz/messageoh';
// const APIDomain = 'http://192.168.1.42:3001';

export { avatars, demoUsersAvatars, allAvatars, APIDomain };
