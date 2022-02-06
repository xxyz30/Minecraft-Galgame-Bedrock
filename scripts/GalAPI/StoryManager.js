import * as storyCaller from './types/StoryCaller.js';
//故事线管理类
class StoryManager {
    constructor() {
        this.stories = new Map();
    }
    /**
     * putStory
     * 放置剧情
     */
    putStory(story) {
        story.forEach((v, k) => {
            this.stories.set(k, v);
        });
    }
    /**
     * call a Story,will show the dialog form
     * @param id the id of the storyLine
     */
    callStory(id, player) {
        if (this.stories.has(id)) {
            storyCaller.show(this.stories.get(id), player);
        }
    }
}
let storyManager = new StoryManager;
export { storyManager };
