import { ActionFormData } from 'mojang-minecraft-ui';
import { Character } from "./story/Character.js";
import { log } from "../utils/logger.js";
//实现逻辑的地方
function show(story, player) {
    let form = new ActionFormData();
    let storyItem = story.texts[0];
    form.body(storyItem.text);
    if (storyItem.speaker instanceof String) {
        form.title(storyItem.speaker);
    }
    else if (storyItem.speaker instanceof Character) {
        form.title(storyItem.speaker.name);
    }
    //有用户定义按钮,则发送用户定义的按钮
    if (storyItem.buttons != null || storyItem.buttons.length > 0) {
        storyItem.buttons.forEach(button => {
            form.button(button.text);
        });
    }
    else {
        //否则就发下一步按钮
        form.button("");
    }
    let p = form.show(player);
    p.then(v => {
        log(v.selection);
        log(v.isCanceled);
    }, v => {
        log("拒绝");
        log(v.selection);
        log(v.isCanceled);
    }).catch(v => {
        log("catch");
        log(v.selection);
        log(v.isCanceled);
    });
}
export { show };
