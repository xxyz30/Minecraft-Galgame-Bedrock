import { StoryTextItem } from "./StoryTextItem.js";

//一条故事线
//对象名即ID
export class StoryLine {
    //id
    public id: string
    //故事线的文本
    public texts: StoryTextItem[]
}