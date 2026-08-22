export interface Topic {
  id: number
  name: string
  slug: string
  tagline: string
}

/** ID khớp site gốc: 1 Tình cảm, 2 Công việc, 3 Sức khỏe, 4 Tài chính */
export const TOPICS: Topic[] = [
  { id: 1, name: 'Tình cảm', slug: 'tinh-cam', tagline: 'Lắng nghe trái tim bạn đang muốn nói gì.' },
  { id: 2, name: 'Công việc', slug: 'cong-viec', tagline: 'Đọc dấu hiệu nghề nghiệp sắp tới.' },
  { id: 3, name: 'Sức khỏe', slug: 'suc-khoe', tagline: 'Cân bằng năng lượng thể chất và tinh thần.' },
  { id: 4, name: 'Tài chính', slug: 'tai-chinh', tagline: 'Nhìn rõ dòng chảy tiền bạc của bạn.' },
]

export function topicById(id: number): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}
