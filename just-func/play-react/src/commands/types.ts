export interface Command {
  title: string,
  command: string
}

export interface KeyBinding {
  command: string,
  key: string,
  mac?: string,
  when?: string
}
