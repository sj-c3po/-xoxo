export interface IGameContext {
    hardness?: string // ["easy", "hard"] это потом
    rival?: string, // ["bot", "player"]
    mode?: string // ["local", "sockets"] это тоже потом
    
    currentPlayer?: string // ["X", "O"]
    isPlayerX?: () => boolean
    
    startGame?: (rival: string) => void
    game?: boolean 
}