import { Player, world } from "mojang-minecraft";
import { Parser } from "./GalAPI/parser/parser.js";
import { storyManager } from "./GalAPI/StoryManager.js";
import { Story } from "./GalAPI/types/story/Story.js";
import { log } from './GalAPI/utils/logger.js'
let a: Story =
{
    "stories": [
        //storyLine
        {
            "id": "xxx",
            "texts": [
                //StoryTextItem
                {
                    "text": "xxx",
                    "speaker": {
                        "name": "xxx"
                    },
                    "buttons": [
                        {
                            "text": "循环测试",
                            "jump": "xxx",
                            "commands": ["say hi"]
                        }
                    ]
                }
            ]
        }
    ]
}
storyManager.putStory(Parser.parse(a))

world.events.beforeChat.subscribe(e => {
    for (let p of world.getPlayers()) {
        storyManager.callStory("xxx", <Player>p)
    }
})
world.events.blockBreak.subscribe(e => {
    storyManager.callStory("xxx", e.player)
})


