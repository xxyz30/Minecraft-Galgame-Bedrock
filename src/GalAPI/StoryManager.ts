import { Player } from "mojang-minecraft";
import { StoryLine } from "./types/story/StoryLine.js";
import * as storyCaller from './types/StoryCaller.js'
import { log } from "./utils/logger.js";

//故事线管理类
class StoryManager {
    private stories: Map<string, StoryLine> = new Map()
    /**
     * putStory
     * 放置剧情
     */
    public putStory(story: Map<string, StoryLine>) {
        story.forEach((v, k) => {
            this.stories.set(k, v)
        })
    }
    /**
     * call a Story,will show the dialog form
     * @param id the id of the storyLine
     */
    public callStory(id: string, player: Player) {
        if (this.stories.has(id)) {
            storyCaller.show(this.stories.get(id), player)
        }
    }
}
let storyManager: StoryManager = new StoryManager
export { storyManager }