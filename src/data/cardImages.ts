const MAJOR_DIR = '22 lá Ẩn chính Smith Waite'
const MINOR_DIR_PREFIX = '14 lá bài thuộc bộ Ẩn'

const MAJOR_FILES = [
  '0. The Fool.png',
  'I. The Magician.png',
  'II. The High Priestess.png',
  'III. The Empress.png',
  'IV. The Emperor.png',
  'V. The Hierophant.png',
  'VI. The Lovers.png',
  'VII. The Chariot.png',
  'VII. Strength.png',
  'IX. The Hermit.png',
  'X. The Wheel.png',
  'XI. Justice.png',
  'XII. The Hanged Man.png',
  'XIII. Death.png',
  'XIV. Temperance.png',
  'XV. The Devil.png',
  'XVI. The Tower.png',
  'XVII. The Star.png',
  'XVIII. The Moon.png',
  'XIX. The Sun.png',
  'XX. Judgement.png',
  'XXI. The World.png',
]

const MINOR_RANKS = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Page',
  'Knight',
  'Queen',
  'King',
]

const MINOR_SUIT_DIRS = ['Wands', 'Cups', 'Swords', 'Pentacles']

const MINOR_OVERRIDES: Record<number, string> = {
  65: `/AssetsTarot78/${MINOR_DIR_PREFIX} Pentacles/Age of Pentacles.png`,
}

const images: string[] = (() => {
  const list = MAJOR_FILES.map((file) => `/AssetsTarot78/${MAJOR_DIR}/${file}`)
  for (const suit of MINOR_SUIT_DIRS) {
    for (const rank of MINOR_RANKS) {
      list.push(`/AssetsTarot78/${MINOR_DIR_PREFIX} ${suit}/${rank} of ${suit}.png`)
    }
  }
  return list
})()

for (const [id, path] of Object.entries(MINOR_OVERRIDES)) {
  images[Number(id) - 1] = path
}

export function cardImage(id: number): string {
  if (!Number.isInteger(id) || id < 1 || id > images.length) return ''
  return encodeURI(images[id - 1])
}
