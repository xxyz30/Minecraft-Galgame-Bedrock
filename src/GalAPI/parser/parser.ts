import { Story } from "../types/story/Story.js";
import { StoryLine } from "../types/story/StoryLine.js";
import { StoryNode } from "../types/story/StoryNode.js";

//用户JSON解析器
export class Parser {
    static parse(storyObj: Story): Map<string, StoryLine> {
        let map: Map<string, StoryLine> = new Map()
        //创建好所有的StoryLine，找到next的引用，顺便put到map里
        storyObj.stories.forEach(e => {
            map.set(e.id, e)
        })
        storyObj.stories.forEach(e => {
            e.texts.forEach(textItem => {
                //选项不为null
                if (textItem.buttons != null) {
                    textItem.buttons.forEach(button => {
                        if (button.jump != null) {
                            //当非null时，则代表有引用
                            if (map.has(button.jump)) {
                                button.jumpTo = map.get(button.jump)
                            }
                        }
                    })
                }
            })
            if (e.next != null) {
                if (e.next.buttons != null) {
                    e.next.buttons.forEach(button => {
                        if (button.jump != null) {
                            //当非null时，则代表有引用
                            if (map.has(button.jump)) {
                                button.jumpTo = map.get(button.jump)
                            }
                        }
                    })
                }
            }
        })


        return map
    }
}