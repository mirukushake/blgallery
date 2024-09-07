export interface bookRoot {
  data: Book
}

export interface langKey {
  [key: string]: string
}

export interface Metadata {
  status: Status[]
  labels: Labels[]
  locations: Locations[]
  authors: Authors[]
  tone: Tone[]
  seme: Seme[]
  uke: Uke[]
  settei: Settei[]
  play: Play[]
  tags: Tags[]
}

export interface Book {
  added: string
  chil_url: string | null
  cover: string | null
  id: number
  label_id: number | null
  location_id: number | null
  type: boolean
  notes: string | null
  published: string
  rating: number | null
  series_id: number | null
  series_no: number | null
  status_id: number
  title: string
  status: Status | langKey | null
  label: Labels | null
  series: Series | null
  location: Locations | null
  read: ReadDates[] | null
  authors: Authors[] | null
  tone: Tone[] | null
  seme: Seme[] | null
  uke: Uke[] | null
  settei: Settei[] | null
  play: Play[] | null
  tags: Tags[] | null
}

export interface Authors {
  en: string | null
  id: number
  illustrator: boolean | null
  name: string
  reading: string
}

export interface Labels {
  en: string | null
  id: number
  ja: string
}

export interface Locations {
  en: string | null
  id: number
  ja: string
  url: string | null
}

export interface Play {
  en: string | null
  id: number
  ja: string
  order: number | null
  parent: number | null
}

export interface ReadDates {
  read_date: string
}

export interface Seme {
  en: string | null
  id: number
  ja: string
  order: number | null
  parent: number | null
}

export interface Series {
  author_id: number | null
  complete: boolean | null
  en: string | null
  id: number
  ja: string
  reading: string | null
}

export interface Settei {
  en: string | null
  id: number
  ja: string
  order: number | null
  parent: number | null
}

export interface Status {
  en: string | null
  id: number
  ja: string
  order: number | null
}

export interface Tags {
  en: string | null
  id: number
  ja: string
  order: number | null
  parent: number | null
}

export interface Tone {
  en: string | null
  id: number
  ja: string
  order: number | null
}

export interface Uke {
  en: string | null
  id: number
  ja: string
  order: number | null
  parent: number | null
}

export interface Dialog {
  data: Book
}

export interface Cover {
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
  thumbnails: Thumbnails
}

export interface Thumbnails {
  small: Small
  large: Large
  full: Full
}

export interface Small {
  url: string
  width: number
  height: number
}

export interface Large {
  url: string
  width: number
  height: number
}

export interface Full {
  url: string
  width: number
  height: number
}
