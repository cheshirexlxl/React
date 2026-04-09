import { Cat, Dog, Bird, Fish, Rabbit, Squirrel, Turtle, Bug } from 'lucide-react'

export const ICONS = [
    { key: 'cat', component: Cat },
    { key: 'dog', component: Dog },
    { key: 'bird', component: Bird },
    { key: 'fish', component: Fish },
    { key: 'rabbit', component: Rabbit },
    { key: 'squirrel', component: Squirrel },
    { key: 'turtle', component: Turtle },
    { key: 'bug', component: Bug },
]

export const ICON_MAP = Object.fromEntries(ICONS.map(({ key, component }) => [key, component]))
