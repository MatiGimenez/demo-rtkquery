export const TYPE_BADGE_COLORS = {
  ['Normal']: {
    bg: '',
    text: ''
  },
  ['Agua']: {
    bg: 'bg-blue-500',
    text: ''
  },
  ['Fuego']: {
    bg: 'bg-orange-500',
    text: ''
  },
  ['Planta']: {
    bg: 'bg-green-500',
    text: ''
  },
}

export const getTypeBadgeColor = type => TYPE_BADGE_COLORS[type]