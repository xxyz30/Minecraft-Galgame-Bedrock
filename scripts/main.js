import { world } from "mojang-minecraft";
import { Parser } from "./GalAPI/parser/parser.js";
import { storyManager } from "./GalAPI/StoryManager.js";
let a = {
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
                            "text": "button_text",
                            "jump": "lineId",
                            "commands": ["say hi"]
                        }
                    ]
                }
            ],
            "next": {
                "buttons": [
                    {
                        "text": "button_text",
                        "jump": "lineId"
                    }
                ]
            }
        }
    ]
};
storyManager.putStory(Parser.parse(a));
world.events.beforeChat.subscribe(e => {
    storyManager.callStory("xxx", e.sender);
});
world.events.blockBreak.subscribe(e => {
    for (let p of world.getPlayers()) {
        storyManager.callStory("xxx", p);
    }
});
