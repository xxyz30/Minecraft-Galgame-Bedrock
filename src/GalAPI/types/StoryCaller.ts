import { StoryLine } from "./story/StoryLine.js";
import { ActionFormData, ActionFormResponse } from 'mojang-minecraft-ui'
import { Character } from "./story/Character.js";
import { Player } from "mojang-minecraft";
import { log } from "../utils/logger.js";

//实现逻辑的地方
function show(story: StoryLine, player: Player, index = 0) {
    if (index >= story.texts.length) return

    let storyItem = story.texts[index]
    let form: ActionFormData = new ActionFormData()
    form.body(storyItem.text)
    if (storyItem.speaker instanceof String) {
        form.title(storyItem.speaker)
    } else if (storyItem.speaker instanceof Character) {
        form.title(storyItem.speaker.name)
    }
    //有用户定义按钮,则发送用户定义的按钮
    let isCustomButton = storyItem.buttons != null || storyItem.buttons.length > 0
    if (isCustomButton) {
        storyItem.buttons.forEach(button => {
            form.button(button.text)
        })
    } else {
        //否则就发下一步按钮
        form.button("")
    }
    //30秒后客户端没打开UI的响应，则代表了拒绝，此时重试
    let retry = function () {
        let p: Promise<ActionFormResponse> = form.show(player)
        p.then(
            //若玩家做出了响应
            v => {
                if (v.isCanceled) {
                    retry()
                } else {
                    //如果是自定义按钮，则检测
                    if (isCustomButton) {
                        let button = storyItem.buttons[v.selection]
                        if (button.commands != null) {
                            button.commands.forEach(command => {
                                player.dimension.runCommand(command)
                            })
                        }
                        //如果jumpTo不为空，则跳转到另一个分支
                        if (button.jumpTo != null) {
                            show(button.jumpTo, player)
                        }
                    } else {
                        show(story, player, index + 1)
                    }
                }
            },
            retry
        )
    }
    retry()
}
// function handelButton(button)
export { show, CallerCallback }

class CallerCallback {
    public beforeJump: () => void
}