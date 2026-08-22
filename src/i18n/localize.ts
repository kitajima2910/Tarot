import type { TarotCard, Suit } from '../data/cards'
import { SUIT_LABEL, SUIT_LABEL_EN } from '../data/cards'
import type { Topic } from '../data/topics'
import type { Locale } from './messages'

export function cardName(card: TarotCard, locale: Locale): string {
  return locale === 'en' ? card.nameEn : card.name
}

export function cardKeywordsUpright(card: TarotCard, locale: Locale): string {
  return locale === 'en' ? card.keywordsUprightEn : card.keywordsUpright
}

export function cardKeywordsReversed(card: TarotCard, locale: Locale): string {
  return locale === 'en' ? card.keywordsReversedEn : card.keywordsReversed
}

export function cardKeywords(card: TarotCard, orientation: 'upright' | 'reversed', locale: Locale): string {
  return orientation === 'upright' ? cardKeywordsUpright(card, locale) : cardKeywordsReversed(card, locale)
}

export function suitLabel(suit: Suit, locale: Locale): string {
  return locale === 'en' ? SUIT_LABEL_EN[suit] : SUIT_LABEL[suit]
}

export function topicName(topic: Topic | undefined | null, locale: Locale): string {
  return locale === 'en' ? topic?.nameEn ?? '' : topic?.name ?? ''
}

export function topicTagline(topic: Topic, locale: Locale): string {
  return locale === 'en' ? topic.taglineEn : topic.tagline
}
