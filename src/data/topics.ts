export interface Topic {
  id: number
  name: string
  nameEn: string
  slug: string
  tagline: string
  taglineEn: string
}

/** ID khớp site gốc: 1 Tình cảm, 2 Công việc, 3 Sức khỏe, 4 Tài chính */
export const TOPICS: Topic[] = [
  { id: 1, name: 'Tình cảm', nameEn: 'Love', slug: 'tinh-cam', tagline: 'Lắng nghe trái tim bạn đang muốn nói gì.', taglineEn: 'Listen to what your heart is trying to tell you.' },
  { id: 2, name: 'Công việc', nameEn: 'Career', slug: 'cong-viec', tagline: 'Đọc dấu hiệu nghề nghiệp sắp tới.', taglineEn: 'Read the upcoming career signals.' },
  { id: 3, name: 'Sức khỏe', nameEn: 'Health', slug: 'suc-khoe', tagline: 'Cân bằng năng lượng thể chất và tinh thần.', taglineEn: 'Balance physical and mental energy.' },
  { id: 4, name: 'Tài chính', nameEn: 'Finance', slug: 'tai-chinh', tagline: 'Nhìn rõ dòng chảy tiền bạc của bạn.', taglineEn: 'See the flow of your money clearly.' },
]

export function topicById(id: number): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}
