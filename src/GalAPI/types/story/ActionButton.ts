import { StoryLine } from "./StoryLine.js"

export class ActionButton {
    public text: string
    //跳转到的ID
    public jump?: string
    public jumpTo?: StoryLine = null
    public commands?: string[]
}