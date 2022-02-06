//故事线的一个文本对象
import { ActionButton } from './ActionButton.js'
import { Character } from './Character.js'
export class StoryTextItem {
    //说话者
    public speaker: string | Character
    //说话内容
    public text: string
    //附加的按钮，用于特殊跳转或者修改对话
    public buttons?: ActionButton[]

    //在剧本准备下一个之前触发
    //TODO
    // public beforeNextText(callback: (arg: ) => void) {

    // }
}