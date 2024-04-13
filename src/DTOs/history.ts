export interface HistoryDTO {
  id: string
  user_id: string
  exercise_id: string
  name: string
  group: string
  created_at: string
}

export interface HistoryListDTO {
  title: string
  data: HistoryDTO[]
}
