export type PlayersParam = {
  group: string
}

export type RootParam = {
  groups: string
  new: string
  players: PlayersParam
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined
      new: undefined
      players: {
        group: string
      }
    }
  }
}